 /******************************************************************************
Arduair project
Fabian Gutierrez @ Universidad Pontificia Bolivariana
https://github.com/fega/arduair

Arduair project source code.

# Wiring Scheme.
## Arduino
Pin   Feature
2       LED Red
3       LED Green
4       WiFiShield Reserved Pin
5       DHT Pin
7       WifiShield Pin Reserved Pin
8       Shinyei Pin 1
9       Shinyei Pin 2 //TODO: check what pin is
10      SD/SS Pin Reserved Pin
RX/TX1  Ze-Co  Sensor
RX/TX2  Ze-NO2 Sensor
RX/TX3  Ze-SO2 Sensor
SDA/SCL BMP180, RTC, Light Module

## Shinyei PPD42ns
1     Ground
2     P2 OutPut
3     Input 5v
4     P1 Output
******************************************************************************/
//libraries
#include "Wire.h"      //I2C communication
#include "DHT.h"       //DHT sensor
#include <SPI.h>       //Serial communication (with the SD card)
#include <SD.h>        //SD card Library
#include <SFE_BMP180.h>//Sparkfun BMP180 pressure Sensor Library
#include <SparkFunTSL2561.h>//light sensor library SparkFun TSL2561 Breakout
#include <WiFi.h>      //wifi shield Library

//Default configuration
#define RED_LED_PIN 2
#define GREEN_LED_PIN 3
#define DS1307_ADDRESS 0x68 //clock ADRESS
#define DHTPIN 20
#define DHTTYPE DHT11  //dht type
#define WIFIPIN 4
#define SDPIN 10
#define SHINYEI_P1 8
#define SHINYEI_P2 9
#define CO  1 //
#define NO2 2
#define SO2 3
unsigned int zeCounter;    // Ze counter of measures

//Constructors
File myFile;              //FIle constructor
WiFiClient client;        //WiFiClient Constructor
DHT dht(DHTPIN, DHTTYPE); //DHT constructor , m 
SFE_BMP180 bmp;           //bmp constructor
SFE_TSL2561 light;        //TSL2561 constructor

//Wifi and device config
char ssid[] = "FABIAN"; //  your network SSID (name)
char pass[] = "63856199";    // your network password (use for WPA, or use as key for WEP)
char server[] = "arduair.herokuapp.com/test/";
char device[] = "device1";
char password[] = "pass1";
int status = WL_IDLE_STATUS;

//Global variables for measuring
float pm10,pm25;
float p,h,t,l;
float co,o3,so2,no2;
unsigned int second, minute,hour,weekDay,monthDay,month,year;
/**
 * Arduair configuration initialization
 */
void setup() {
  digitalWrite(GREEN_LED_PIN,HIGH); // Setup Light On
  Serial.begin(9600);
  Serial1.begin(9600); //ZE CO-sensor
  Serial2.begin(9600); //ZE NO2-sensor
  Serial3.begin(9600); //ZE SO2-sensor
  Wire.begin();
  dht.begin();
  bmp.begin();
  light.begin();
  sdBegin();
  digitalWrite(WIFIPIN,HIGH); //active wifishield
  digitalWrite(SDPIN,LOW); //inactive SD
  wifiBegin();
  winsenBegin();
  arduairSetup();
  digitalWrite(GREEN_LED_PIN,LOW); // Setup Light Off
}
/**
* Arduair measuring cycle, it control all measuring cycle and ends writing the
* results in an SD card and sending a request to the server
* the measuring order is:
* 1) 30 s :   measuring PM10 and PM2.5.
* 2) 30 s :   measuring O3
* 3) 30 s :   measuring light, humidity, temperature and Pressure
* 4) 1 s :   Detach Winsen sensor interrupts (to avoid unexpected results during SD writing and HTTP request)
* 5) 1 m :   writing in the SD and sending the request
* 6) 1 s :   clear variables
* Also, asynchronously, Arduair handles the interrupt for the Winsen sensors,
* that comes every second per sensor.
 *
 */
void loop() {

  pmRead();          //1
  mq131Read();       //2
  meteorologyRead(); //3
  winsenRead(CO);    //4
  winsenRead(NO2);
  winsenRead(SO2);
  getDate(DS1307_ADDRESS);         //5
  tableWrite();
  request(h,t,p,l,co,so2,no2);
  //6
}
/**
 * Perform a request to the given server variable. in the form:
 * http://myserver.com/device/password/monthDay/month/year/hour/minute
 * ?h=humidity&t=temperature&p=pressure&l=luminosity&co=[co]&o3=[o3]&&
 * @param h   [description]
 * @param t   [description]
 * @param p   [description]
 * @param l   [description]
 * @param co  [description]
 * @param so2 [description]
 * @param no2 [description]
 */
void request(int h,int t,float p,float l,float co,float so2,float no2){
  // close any connection before send a new request.This will free the socket on the WiFi shield
  client.stop();

 // if there's a successful connection:
 if (client.connect(server, 80)) {
   Serial.println("connecting...");

   //String getRequest ="GET"+"hola"+" "
   // send the HTTP GET request:
   client.print("GET "); client.print("/"); client.print(device); client.print("/"); client.print(password);
   // HTTP time
   client.print(monthDay);client.print(month);client.print(year);client.print(hour);client.print(minute);
   //http GET end
   ; client.print(" HTTP/1.1");
   client.println("");
   // parameters:
   client.print("h="); client.print(h); client.print(",");
   client.print("t="); client.print(t); client.print(",");
   client.print("l="); client.print(l); client.print(",");
   client.print("co="); client.print(pm10); client.print(",");
   client.print("o3="); client.print(pm10); client.print(",");
   client.print("pm10="); client.print(pm10); client.print(",");
   client.print("pm25="); client.print(pm25); client.print(",");
   client.print("so2="); client.print(so2); client.print(",");
   client.print("no2="); client.print(no2); client.print(",");
   client.println("");
   //server
   client.print("Host: ");client.print(server);
   client.println("User-Agent: Arduair");
   client.println("Connection: close");
   client.println();
 }
 }
/**
 * Writes the data in the SD.
 * This function act in the following form: first, inactive the wifi-shield
 * and active the SD shield, next writes the data in the SD and inactive
 * the SD.
 */
void tableWrite(){
  //write data in SD
  digitalWrite(WIFIPIN,HIGH); //inactive wifi-shield
  digitalWrite(SDPIN,LOW); //active SD

  myFile = SD.open("DATA.txt", FILE_WRITE); //open SD data.txt file

  if (myFile){

    myFile.print(h);
    myFile.print(",");
    myFile.print(t);
    myFile.print(",");
    myFile.print(p);
    myFile.print(",");
    myFile.print(co);
    myFile.print(",");
    myFile.print(so2);
    myFile.print(",");
    myFile.print(no2);
    myFile.print(",");

    myFile.println(" ");
    myFile.close();
  }
  digitalWrite(WIFIPIN,LOW); //active wifishield
  digitalWrite(SDPIN,HIGH); //inactive SD

}
/**
 * Reads  MQ-131 O3 low concentration sensor
 * @return [description]
 */
float mq131Read(){
  int sensorValue = analogRead(0);       // read analog input pin 0
  Serial.println(sensorValue, DEC);  // prints the value read
  delay(100);// wait 100ms for next reading

  float finalValue =sensorValue;
  return finalValue;
}
/**
 * Reads pm10 and pm2.5 concentration from Shinyei PPD42,, this function is
 * based on the dustduino project
 */
void pmRead(){
  Serial.println("Started  PM read");


  unsigned long triggerOnP10, triggerOffP10, pulseLengthP10, durationP10;
  boolean P10 = HIGH, triggerP10 = false;
  unsigned long triggerOnP25, triggerOffP25, pulseLengthP25, durationP25;
  boolean P25 = HIGH, triggerP25 = false;
  float ratioP10 = 0, ratioP25 = 0;
  unsigned long sampletime_ms = 60000;
  float countP10, countP25;
  unsigned long starttime=millis();
  for( ;sampletime_ms > millis() - starttime; ){
    P10 = digitalRead(9);
    P25 = digitalRead(8);
    if(P10 == LOW && triggerP10 == false){
      triggerP10 = true;
      triggerOnP10 = micros();
    }
    if (P10 == HIGH && triggerP10 == true){
        triggerOffP10 = micros();
        pulseLengthP10 = triggerOffP10 - triggerOnP10;
        durationP10 = durationP10 + pulseLengthP10;
        triggerP10 = false;
    }
    if(P25 == LOW && triggerP25 == false){
      triggerP25 = true;
      triggerOnP25 = micros();
    }
    if (P25 == HIGH && triggerP25 == true){
      triggerOffP25 = micros();
      pulseLengthP25 = triggerOffP25 - triggerOnP25;
      durationP25 = durationP25 + pulseLengthP25;
      triggerP25 = false;
    }
  }
  ratioP10 = durationP10/(sampletime_ms*10.0);  // Integer percentage 0=>100
  ratioP25 = durationP25/(sampletime_ms*10.0);
  countP10 = 1.1*pow(ratioP10,3)-3.8*pow(ratioP10,2)+520*ratioP10+0.62;
  countP25 = 1.1*pow(ratioP25,3)-3.8*pow(ratioP25,2)+520*ratioP25+0.62;
  float PM10count = countP10; ////confirmmm!!!
  float PM25count = countP25 - countP10;

  // first, PM10 count to mass concentration conversion
  double r10 = 2.6*pow(10,-6);
  double pi = 3.14159;
  double vol10 = (4/3)*pi*pow(r10,3);
  double density = 1.65*pow(10,12);
  double mass10 = density*vol10;
  double K = 3531.5;
  float concLarge = (PM10count)*K*mass10;

  // next, PM2.5 count to mass concentration conversion
  double r25 = 0.44*pow(10,-6);
  double vol25 = (4/3)*pi*pow(r25,3);
  double mass25 = density*vol25;
  float concSmall = (PM25count)*K*mass25;

  pm10 = concLarge;
  pm25 = concSmall;

  Serial.println("Ended  PM read");
}
/**
 * Reads pressure from BMP pressure Sensor
 * @return pressure
 */
float pressureRead(){
 char state;
 double T,P,p0,a;
  // Loop here getting pressure readings every 10 seconds.
  state = bmp.startTemperature();
  if (state != 0)
  {
    delay(state);
    state = bmp.getTemperature(T);
    if (state != 0)
    {
      state = bmp.startPressure(3);
      if (state != 0)
      {
        delay(state);
        state = bmp.getPressure(P,T);
        if (state != 0)
        {
          // Print out the measurement:
          //Serial.print("absolute pressure: ");
          Serial.print(P*0.750061561303,2);
          //Serial.println(" mmHg");
          return P;
        }
        //else Serial.println("error retrieving pressure measurement\n");
      }
      //else Serial.println("error starting pressure measurement\n");
    }
    //else Serial.println("error retrieving temperature measurement\n");
  }
  //else Serial.println("error starting temperature measurement\n");
}
/**
 * Reads the Luminosity sensor TSL2561 and calculates the Lux units
 */
float lightRead(){
  boolean gain;     // Gain setting, 0 = X1, 1 = X16;
  unsigned int ms;  // Integration ("shutter") time in milliseconds
  unsigned char time = 2;
  light.setTiming(gain,time,ms);
  light.setPowerUp();
  delay(ms);
  unsigned int data0, data1;

  if (light.getData(data0,data1))
  {
    // getData() returned true, communication was successful

    Serial.print("data0: ");
    Serial.print(data0);
    Serial.print(" data1: ");
    Serial.print(data1);

    // To calculate lux, pass all your settings and readings
    // to the getLux() function.

    // The getLux() function will return 1 if the calculation
    // was successful, or 0 if one or both of the sensors was
    // saturated (too much light). If this happens, you can
    // reduce the integration time and/or gain.
    // For more information see the hookup guide at: https://learn.sparkfun.com/tutorials/getting-started-with-the-tsl2561-luminosity-sensor

    double lux;    // Resulting lux value
    boolean good;  // True if neither sensor is saturated

    // Perform lux calculation:

    good = light.getLux(gain,ms,data0,data1,lux);

    // Print out the results:

    Serial.print(" lux: ");
    Serial.print(lux);

    if (good) l=lux; else l=-99;
    return l;
  }
}
/**
 * Reads Temperature from DHT
 */
float temperatureRead(){
  return dht.readTemperature();
}
/**
 * Reads Temperature from DHT
 */
float humidityRead(){
  return dht.readHumidity();
}
/**
 * Convert binary coded decimal to normal decimal numbers
 * @param  val byte value to be converteted
 * @return     Resulting DEC Value
 */
byte bcdToDec(byte val)  {
  return ( (val/16*10) + (val%16) );
}
/**
 * This code Get the date from DS1307_ADDRESS,  RTC based on http://bildr.org/2011/03/ds1307-arduino/
 * @param {int} adress Adress of DS1307 real time clock
 */
void getDate(int adress){
  // Reset the register pointer
  Wire.beginTransmission(adress);
  byte zero = 0x00;
  Wire.write(zero);
  Wire.endTransmission();
  Wire.requestFrom(adress, 7);

  second = bcdToDec(Wire.read());
  minute = bcdToDec(Wire.read());
  hour = bcdToDec(Wire.read() & 0b111111); //24 hour time
  weekDay = bcdToDec(Wire.read()); //0-6 -> sunday - Saturday
  monthDay = bcdToDec(Wire.read());
  month = bcdToDec(Wire.read());
  year = bcdToDec(Wire.read());
}
/**
 * SD card begin function
 */
void sdBegin(){
  if (!SD.begin(4)) {
    Serial.println("SD failed!");
    return;
  }
  Serial.println("SD done.");
}
/**
 * Meteorology read function
 */
void meteorologyRead(){
  p = pressureRead();
  l = lightRead();
  h = humidityRead();  // 1* medir humedad
  t = temperatureRead();// 2* medir temperatura
}
/**
 * Setup all of the configuration from the SD to the arduair
 */
void arduairSetup(){
 //
}
/**
 * This function begins wifi connection
 */
void wifiBegin(){
    // check for the presence of the shield:
    if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv != "1.1.0") {
    Serial.println("Please upgrade the firmware");
  }
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);// Connect to WPA/WPA2 network. Change this line if using open or WEP network
    delay(10000);// wait 10 seconds for connection
  }
  Serial.println("Connected to wifi");
}
/**
 * Disables automatic concentration of ZE sensors to prevent unexpectects behaviors from interrupts
 */
void winsenBegin(){
  byte message[] = {0xFF,0x01, 0x78, 0x04, 0x00, 0x00, 0x00, 0x00, 0x83};//TODO: change bye array to "manual form"
  Serial1.write(message,sizeof(message));
  Serial2.write(message,sizeof(message));
  Serial3.write(message,sizeof(message));
}
/**
 * Reads the given contaminant from their respective Winsen Sensor
 * @param cont Contaminant to be read, could be CO, NO2 or SO2
 */
void winsenRead(int cont){
  byte message[] = {0xFF,0x01, 0x78, 0x03, 0x00, 0x00, 0x00, 0x00, 0x84};
  unsigned long sampletime_ms = 30000;
  unsigned long starttime=millis();
  switch (cont) {
    case 1:
      Serial1.write(message,sizeof(message));
      //for(;sampletime_ms > millis() - starttime;){
      if (Serial1.available() > 0) {
        byte measure[8];
        Serial1.readBytes(measure,9);
        float ppm = measure[2]*256+measure[3];
      }
      //}
      break;
    case 2:
      Serial2.write(message,sizeof(message));
      if (Serial2.available() > 0) {
        byte measure[8];
        Serial2.readBytes(measure,9);
        float ppm = (measure[2]*256+measure[3])*0.1;
      }
      break;
    case 3:
      Serial1.write(message,sizeof(message));
      if (Serial3.available() > 0) {
        byte measure[8];
        Serial3.readBytes(measure,9);
        float  ppm = (measure[2]*256+measure[3])*0.1;
      }
    break;
  }
  winsenBegin(); //disable sensors.
}
/**
 * Perform a simple reques
 * @param h   [description]
 * @param t   [description]
 * @param p   [description]
 * @param l   [description]
 * @param co  [description]
 * @param so2 [description]
 * @param no2 [description]
 */
void simple_request(int h,int t,float p,float l,float co,float so2,float no2){
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
   client.stop();
   String timezone;
  // if there's a successful connection:
  if (client.connect(server, 80)) {
    Serial.println("connecting...");

    //String getRequest ="GET"+"hola"+" "
    // send the HTTP GET request:
    client.print("GET "); client.print("/"); client.print(device); client.print("/"); client.print(password); client.print("/timezone"); client.print(" HTTP/1.1");
    client.println("");
    // parameters:
    client.print("?z="); client.print(timezone); client.print(",");
    client.print("h="); client.print(h); client.print(",");
    client.print("t="); client.print(t); client.print(",");
    client.print("l="); client.print(l); client.print(",");
    client.print("co="); client.print(pm10); client.print(",");
    client.print("o3="); client.print(pm10); client.print(",");
    client.print("pm10="); client.print(pm10); client.print(",");
    client.print("pm25="); client.print(pm25); client.print(",");
    client.print("so2="); client.print(so2); client.print(",");
    client.print("no2="); client.print(no2); client.print(",");
    client.println("");
    //server
    client.print("Host: ");client.print(server);
    client.println("User-Agent: Arduair");
    client.println("Connection: close");
    client.println();
  }
 }

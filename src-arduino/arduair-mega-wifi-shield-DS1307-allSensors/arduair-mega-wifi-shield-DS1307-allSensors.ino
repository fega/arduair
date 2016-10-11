//libraries...
#include "Wire.h"      //for I2C communication
#include "DHT.h"       //for dht sensor
#include <SPI.h>       //for Serial communication (with the SD card)
#include <SD.h>        //SD card Library
#include <SFE_BMP180.h>//Sparkfun BMP180 pressure Sensor Library
#include <SparkFunTSL2561.h>//light sensor library SparkFun TSL2561 Breakout
#include <WiFi.h>      //wifi shield Library
#include <Event.h>
#include <Timer.h>     //arduino timer library

#define DS1307_ADDRESS 0x68 //clock pin
#define DHTPIN 7            //DHT pin
#define DHTTYPE DHT11       //dht type
#define server "arduair.herokuapp.com/test/"    // website address
#define WIFIPIN 4 //Wifi shield ss pin
#define SDPIN 10  //Sd ss pin

File myFile;//Defining one file  class

char ssid[] = "yourNetwork"; //  your network SSID (name)
char pass[] = "secretPassword";    // your network password (use for WPA, or use as key for WEP)
String device,password;
int status = WL_IDLE_STATUS;

WiFiClient client;
float pm10,pm25;
int second, minute,hour,weekDay,monthDay,month,year;


DHT dht(DHTPIN, DHTTYPE); //DHT constructor
SFE_BMP180 bmp;           //bmp constructor
SFE_TSL2561 light;        //TSL2561 constructor
Timer t;
bool zeAvailable=true;
unsigned long zeCo,zeNO2,zeSO2; //ze sensors serial port
unsigned int zeCounter;// Ze counter of meausures

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600); //ZE CO-sensor
  Serial2.begin(9600); //ZE NO2-sensor
  Serial3.begin(9600); //ZE SO2-sensor
  Wire.begin();
  dht.begin();
  bmp.begin();
  light.begin();
  sdBegin();
  wifiBegin();
  t.every(5*60*1000,arduairRead); // 5 minutes
}

void loop() {
  t.update();
}
void arduairRead(){
    tableWrite();
}
void wifiBegin(){
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
  Serial.println("Connected to wifi");
}

void request(int h,int t,float p,float l,float co,float so2,float no2){
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
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

void tableWrite(){
  //write data in SD
  digitalWrite(WIFIPIN,HIGH); //inactive wifi-shield
  digitalWrite(SDPIN,LOW); //active SD

  myFile = SD.open("DATA.txt", FILE_WRITE); //open SD data.txt file
  if (myFile){

    int   h = dht.readHumidity();   // 1* medir humedad
    int   t = dht.readTemperature();// 2* medir temperatura
    float p = readPressure();       // 3* medir presion
    float co= mq7Read();            // 4* medir sensor 1 y transformar
    float so2=zeso2Read();          // 5* Meaus
    float no2=zeno2Read();
    float l=lightRead();
    pmRead();

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
    request(h,t,p,l,co,so2,no2);
  }
  digitalWrite(WIFIPIN,LOW); //active wifishield
  digitalWrite(SDPIN,HIGH); //inactive SD
}
/*//////////////////////////////////////////////////////////////////
MQ-7 CO sensor
//////////////////////////////////////////////////////////////////*/
float mq7Read(){
  int sensorValue = analogRead(0);       // read analog input pin 0
  Serial.println(sensorValue, DEC);  // prints the value read
  delay(100);// wait 100ms for next reading

  float finalValue =sensorValue;
  return finalValue;
}
/*//////////////////////////////////////////////////////////////////
MQ-131 O3 low concentration sensor
//////////////////////////////////////////////////////////////////*/
float mq131Read(){
  int sensorValue = analogRead(0);       // read analog input pin 0
  Serial.println(sensorValue, DEC);  // prints the value read
  delay(100);// wait 100ms for next reading

  float finalValue =sensorValue;
  return finalValue;
}
/*//////////////////////////////////////////////////////////////////
ZE03-SO2 winsen sensor
//////////////////////////////////////////////////////////////////*/
float zeso2Read(){
  float c= zeSO2/zeCounter;
  zeSO2=0;
  return c;
}
void serialEvent1(){
  if (zeAvailable==true){
    String input;
    while (Serial1.available()){
      char inChar = (char)Serial.read();
      input += inChar;
      if (input.length()==8){
        zeSO2=(input[2]*256+input[3])*0.1;
      }
    }
  }
}
/*//////////////////////////////////////////////////////////////////
ZE03-no2 winsen sensor
//////////////////////////////////////////////////////////////////*/
float zeno2Read(){

}
/*//////////////////////////////////////////////////////////////////
ZE03-co winsen sensor
//////////////////////////////////////////////////////////////////*/
float ze03_co(){

}
/*//////////////////////////////////////////////////////////////////
Shinyei PPD42: dust sensor
based on dustduino project
//////////////////////////////////////////////////////////////////*/
float pmRead(){
  unsigned long starttime;

  unsigned long triggerOnP10, triggerOffP10, pulseLengthP10, durationP10;
  boolean P10 = HIGH, triggerP10 = false;
  unsigned long triggerOnP25, triggerOffP25, pulseLengthP25, durationP25;
  boolean P25 = HIGH, triggerP25 = false;
  float ratioP10 = 0, ratioP25 = 0;
  unsigned long sampletime_ms = 30000;
  float countP10, countP25;

  for( ; ; ){
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
}
/*//////////////////////////////////////////////////////////////////
 BMP180 Pressure Sensor
//////////////////////////////////////////////////////////////////*/
float readPressure(){
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
/*//////////////////////////////////////////////////////////////////
SparkFun Luminosity Sensor Breakout - TSL2561
//////////////////////////////////////////////////////////////////*/
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
    if (good) Serial.println(" (good)"); else Serial.println(" (BAD)");
  }
}
/*//////////////////////////////////////////////////////////////////
 RTC based on http://bildr.org/2011/03/ds1307-arduino/
//////////////////////////////////////////////////////////////////*/
byte bcdToDec(byte val)  {
  // Convert binary coded decimal to normal decimal numbers
  return ( (val/16*10) + (val%16) );
}

void getDate(){
  // Reset the register pointer
  Wire.beginTransmission(DS1307_ADDRESS);
  byte zero = 0x00;
  Wire.write(zero);
  Wire.endTransmission();
  Wire.requestFrom(DS1307_ADDRESS, 7);

  second = bcdToDec(Wire.read());
  minute = bcdToDec(Wire.read());
  hour = bcdToDec(Wire.read() & 0b111111); //24 hour time
  weekDay = bcdToDec(Wire.read()); //0-6 -> sunday - Saturday
  monthDay = bcdToDec(Wire.read());
  month = bcdToDec(Wire.read());
  year = bcdToDec(Wire.read());
}
/*//////////////////////////////////////////////////////////////////
SD card begin
//////////////////////////////////////////////////////////////////*/
void sdBegin(){
  if (!SD.begin(4)) {
    //Serial.println("SD failed!");
    return;
  }
  //Serial.println("SD done.");
}

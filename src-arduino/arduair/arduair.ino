//TODO: delete this file
//libraries...
#include "Wire.h"      //for I2C communication
#include "DHT.h"       //for dht sensor
#include <SPI.h>       //for Serial communication (with the SD card)
#include <SD.h>        //SD card Library
#include <SFE_BMP180.h>//Sparkfun BMP180 pressure Sensor Library
//#include <VSync.h>

#include <Adafruit_CC3000.h>//for CC3000 Wifi shield
//#include <ccspi.h>
//#include <string.h>

//define...
#define DS1307_ADDRESS 0x68 //clock pin
#define DHTPIN 7            //DHT pin
#define DHTTYPE DHT11
#define ALTITUDE 1655.0

#define ADAFRUIT_CC3000_IRQ   3  //CC3000 config
#define ADAFRUIT_CC3000_VBAT  5
#define ADAFRUIT_CC3000_CS    10
Adafruit_CC3000 cc3000 = Adafruit_CC3000(ADAFRUIT_CC3000_CS, ADAFRUIT_CC3000_IRQ, ADAFRUIT_CC3000_VBAT,SPI_CLOCK_DIVIDER);
#define WLAN_SSID       "myNetwork"           // cannot be longer than 32 characters!
#define WLAN_PASS       "myPassword"
#define WLAN_SECURITY   WLAN_SEC_WPA2
#define IDLE_TIMEOUT_MS  3000
#define WEBSITE      "arduair.herokuapp.com"
#define WEBPAGE      "/test/"
uint32_t ip; //it is for the CC3000 but I don't know what it does.


File myFile;//Defining one file  class

//Configuration Variables for the program and sensors
//String sensorName1,  sensorName2,  sensorName3,  sensorName4,  sensorName5;//nombres que aparecen en la tabla
//int    sensorPin1,   sensorPin2,   sensorPin3,   sensorPin4,   sensorPin5;//el pin donde estara ubicado el sensor
//String sensorModel1, sensorModel2, sensorMode3,  sensorModel4, sensorModel5;//modelo del sensor para cosas de calibracion

int arduFrequency; //frecuencia de medicion
int beginYear, beginMonth, beginDay, beginHour, beginMinute; //inicio y final del muestreo
int endYear,  endMonth, endDay, endHour,     endMinute;

DHT dht(DHTPIN, DHTTYPE); //DHT constructor
SFE_BMP180 bmp;           //bmp constructor

void setup() {
  Serial.begin(9600);
  Wire.begin();
  dht.begin();
  bmp.begin();
  sdBegin();
  wifiBegin();
}

void loop() {
  Serial.print("LOOP");
  wifiSend();
}

void tableWrite(){
  //escribe en la SD, la tabla

  myFile = SD.open("DATA.txt", FILE_WRITE); //abrir la SD
  if (myFile){
    int h = dht.readHumidity();   // 1* medir humedad
    myFile.print(h);
    myFile.print(",");

    int t= dht.readTemperature(); // 2* medir temperatura
    myFile.print(t);
    myFile.print(",");

    float p= readPressure();      // 3* medir presion
    myFile.print(p);
    myFile.print(",");

    float co=mq7Read();           // 4* medir sensor 1 y transformar
    myFile.print(co);
    myFile.print(",");

    // 5* medir sensor 2 y transformar
    // 6* medir sensor 3 y transformar
    // 7* medir sensor 4 y transformar
    // 8* medir sensor 5 y transformar
    //enviar a la tabla
    myFile.println(" ");
    myFile.close();
  }
}

void putOnTable(float variable, int X,int Y){
  //envia la informacion a la tabla
}

void transform(float c, float x, float x2){
  //transforma los datos de los sensores
}

/////                   DS1307                   /////
void readTime(){
  //lee el tiempo
  // http://bildr.org/2011/03/ds1307-arduino/
}

byte bcdToDec(byte val)  {
// Convert binary coded decimal to normal decimal numbers
  return ( (val/16*10) + (val%16) );
}

void printDate(){

  // Reset the register pointer
  Wire.beginTransmission(DS1307_ADDRESS);

  byte zero = 0x00;
  Wire.write(zero);
  Wire.endTransmission();

  Wire.requestFrom(DS1307_ADDRESS, 7);

  int second = bcdToDec(Wire.read());
  int minute = bcdToDec(Wire.read());
  int hour = bcdToDec(Wire.read() & 0b111111); //24 hour time
  int weekDay = bcdToDec(Wire.read()); //0-6 -> sunday - Saturday
  int monthDay = bcdToDec(Wire.read());
  int month = bcdToDec(Wire.read());
  int year = bcdToDec(Wire.read());

  //print the date EG   3/1/11 23:59:59
  Serial.print(month);
  Serial.print("/");
  Serial.print(monthDay);
  Serial.print("/");
  Serial.print(year);
  Serial.print(" ");
  Serial.print(hour);
  Serial.print(":");
  Serial.print(minute);
  Serial.print(":");
  Serial.println(second);
}
/////                   BMP180                   /////
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

  delay(5000);  // Pause for 5 seconds.
}
/////                   MQ7Sensor                   /////
float mq7Read(){
  int sensorValue = analogRead(0);       // read analog input pin 0
  Serial.println(sensorValue, DEC);  // prints the value read
  delay(100);// wait 100ms for next reading

  float finalValue =sensorValue;
  return finalValue;
}
/////                   MQ4Sensor                   /////
float mq4Read(){
  int sensorValue = analogRead(0);       // read analog input pin 0
  Serial.println(sensorValue, DEC);  // prints the value read
  delay(100);// wait 100ms for next reading

  float finalValue =sensorValue;
  return finalValue;
}
/////                   MQ131Sensor                   /////
float mq131Read(){
  int sensorValue = analogRead(0);       // read analog input pin 0
  Serial.println(sensorValue, DEC);  // prints the value read
  delay(100);// wait 100ms for next reading

  float finalValue =sensorValue;
  return finalValue;
}
/////                   SD CARD                   /////
void sdBegin(){
  if (!SD.begin(4)) {
    //Serial.println("SD failed!");
    return;
  }
  //Serial.println("SD done.");
}
//void getConfig(){
//  //http://p3nlhclust404.shr.prod.phx3.secureserver.net/SharedContent/redirect_0.html
//  myFile = SD.open("DATA.txt", FILE_READ);
//  char character;
//  String settingName;
//  String settingValue;
//    if (myFile) {
//    while (myFile.available()) {
//    character = myFile.read();
//    while((myFile.available()) && (character != '[')){
//    character = myFile.read();
//    }
//    character = myFile.read();
//    while((myFile.available()) && (character != '=')){
//    settingName = settingName + character;
//    character = myFile.read();
//    }
//    character = myFile.read();
//    while((myFile.available()) && (character != ']')){
//    settingValue = settingValue + character;
//    character = myFile.read();
//    }
//    if(character == ']'){
//
//    /*
//    //Debuuging Printing
//    Serial.print("Name:");
//    Serial.println(settingName);
//    Serial.print("Value :");
//    Serial.println(settingValue);
//    */
//
//    // Apply the value to the parameter
//    //applySetting(settingName,settingValue);
//    // Reset Strings
//    settingName = "";
//    settingValue = "";
//    }
//    }
//    // close the file:
//    myFile.close();
//  }
//}

//void applySetting(String set, String valString){
//  int val=valString.toInt();
//  if (set == "frecuency") {
//    arduFrequency=val;
//  }
//
//  //begin parameters
//  else if (set == "beginYear") {
//    beginYear=val;
//  }
//  else if (set == "beginMonth") {
//    beginMonth=val;
//  }
//  else if (set == "beginDay") {
//    beginDay=val;
//  }
//  else if (set == "beginHour") {
//    beginHour=val;
//  }
//  else if (set == "beginMinute") {
//    beginMinute=val;
//  }
//
//  //end parameters
//  else if (set == "endYear") {
//    endYear=val;
//  }
//  else if (set == "endMonth") {
//    endMonth=val;
//  }
//  else if (set == "endDay") {
//    endDay=val;
//  }
//  else if (set == "endHour") {
//    endHour=val;
//  }
//  else if (set == "endMinute") {
//    endMinute=val;
//  }
//  else{
//    //Serial.println("the value " + set +" doesn´t exist in the config file");
//  }
//
//}
void wifiBegin(){
  //CC3000 Initializing..
  //Serial.println(F("\nwifi Begin"));
  if (!cc3000.begin())
  {
    //Serial.println(F("Wifi_Failed"));
    while(1);
  }
  //CC3000 Connecting...
  //Serial.print(F("Connecting ")); Serial.println(WLAN_SSID);
  if (!cc3000.connectToAP(WLAN_SSID, WLAN_PASS, WLAN_SECURITY)) {
    //Serial.println(F("Failed!"));
    while(1);
  }
  //Serial.println(F("Connected!"));

  /* Wait for DHCP to complete */
  //Serial.println(F("Request DHCP"));
  while (!cc3000.checkDHCP())
  {
    delay(100); // ToDo: Insert a DHCP timeout!
  }

  /* Display the IP address DNS, Gateway, etc. */

  ip = 0;
  // Try looking up the website's IP address
  Serial.print(WEBSITE); Serial.print(F(" -> "));
  while (ip == 0) {
    if (! cc3000.getHostByName(WEBSITE, &ip)) {
      Serial.println(F("Couldn't resolve!"));
    }
    delay(500);
  }

  cc3000.printIPdotsRev(ip);
}
void wifiSend(){
  //send the GET request
  Adafruit_CC3000_Client www = cc3000.connectTCP(ip, 80);
  if (www.connected()) {
    www.fastrprint(F("GET "));
    www.fastrprint(WEBPAGE);
    www.fastrprint(F(" HTTP/1.1\r\n"));
    www.fastrprint(F("Host: ")); www.fastrprint(WEBSITE); www.fastrprint(F("\r\n"));
    www.fastrprint(F("\r\n"));
    www.println();
  } else {
    //Serial.println(F("Connection failed"));
    return;
  }
  /* Read data until either the connection is closed, or the idle timeout is reached. */
  unsigned long lastRead = millis();
  while (www.connected() && (millis() - lastRead < IDLE_TIMEOUT_MS)) {
    while (www.available()) {
      char c = www.read();
      Serial.print(c);
      lastRead = millis();
    }
  }
  //Serial.println(F("\n\nDisconnecting"));
  //cc3000.disconnect();
 delay(10000);
}

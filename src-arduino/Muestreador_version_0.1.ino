//libraries...
#include "Wire.h"      //for I2C communication
#include "DHT.h"       //for dht sensor
#include <SPI.h>       //for Serial communication (with the SD card)
#include <SD.h>        //SD card Library
#include <SFE_BMP180.h>//Sparkfun BMP180 pressure Sensor Library
#include <VSync.h>
//define...
#define DS1307_ADDRESS 0x68
#define DHTPIN 7
#define DHTTYPE DHT11
#define ALTITUDE 1655.0

File myFile;//Defining one file  class

//Configuration Variables for the program and sensors
//String sensorName1,  sensorName2,  sensorName3,  sensorName4,  sensorName5;//nombres que aparecen en la tabla
//int    sensorPin1,   sensorPin2,   sensorPin3,   sensorPin4,   sensorPin5;//el pin donde estara ubicado el sensor
//String sensorModel1, sensorModel2, sensorMode3,  sensorModel4, sensorModel5;//modelo del sensor para cosas de calibracion

int arduFrequency; //frecuencia de medicion
int beginYear, beginMonth, beginDay, beginHour, beginMinute; //inicio y final del muestreo
int endYear,  endMonth, endDay, endHour,     endMinute;

//Conection variables.
int humTempPin;

DHT dht(DHTPIN, DHTTYPE);
SFE_BMP180 bmp;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  dht.begin();
  bmp.begin();
  sdBegin();
}

void loop() {
  
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
    //Serial.println("initialization failed!");
    return;
  }
  //Serial.println("initialization done.");
}
void getConfig(){
  //http://p3nlhclust404.shr.prod.phx3.secureserver.net/SharedContent/redirect_0.html
  myFile = SD.open("DATA.txt", FILE_READ);
  char character;
  String settingName;
  String settingValue;
    if (myFile) {
    while (myFile.available()) {
    character = myFile.read();
    while((myFile.available()) && (character != '[')){
    character = myFile.read();
    }
    character = myFile.read();
    while((myFile.available()) && (character != '=')){
    settingName = settingName + character;
    character = myFile.read();
    }
    character = myFile.read();
    while((myFile.available()) && (character != ']')){
    settingValue = settingValue + character;
    character = myFile.read();
    }
    if(character == ']'){
    
    /*
    //Debuuging Printing
    Serial.print("Name:");
    Serial.println(settingName);
    Serial.print("Value :");
    Serial.println(settingValue);
    */
    
    // Apply the value to the parameter
    //applySetting(settingName,settingValue);
    // Reset Strings
    settingName = "";
    settingValue = "";
    }
    }
    // close the file:
    myFile.close(); 
  }
}
void applySetting(String set, String valString){
  int val=valString.toInt();
  if (set == "frecuency") {
    arduFrequency=val;
  }

  //begin parameters
  else if (set == "beginYear") {
    beginYear=val;
  }  
  else if (set == "beginMonth") {
    beginMonth=val;
  }
  else if (set == "beginDay") {
    beginDay=val;
  }
  else if (set == "beginHour") {
    beginHour=val;
  }
  else if (set == "beginMinute") {
    beginMinute=val;
  }

  //end parameters
  else if (set == "endYear") {
    endYear=val;
  }  
  else if (set == "endMonth") {
    endMonth=val;
  }
  else if (set == "endDay") {
    endDay=val;
  }
  else if (set == "endHour") {
    endHour=val;
  }
  else if (set == "endMinute") {
    endMinute=val;
  }
  else{
    //Serial.println("the value " + set +" doesn´t exist in the config file");
  }
  
}

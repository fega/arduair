//libraries...
#include "Wire.h"            //for I2C communication
#include "DHT.h"             //for dht sensor
#include <SPI.h>             //for Serial communication (with the SD card)
#include <SD.h>              //SD card Library
#include <SFE_BMP180.h>      //Sparkfun BMP180 pressure Sensor Library
#include <Adafruit_CC3000.h> //AdaFruit CC3000 library
#include <ccspi.h>           //AdaFruit CC3000 (Another) library
#include <string.h>          //AdaFruit CC3000 (Another) library

//define...
#define DS1307_ADDRESS 0x68
#define DHTPIN 7
#define DHTTYPE DHT11
#define ALTITUDE 1655.0

#define SENSORPIN1 1
#define SENSORPIN2 2
#define SENSORPIN3 3
#define SENSORPIN4 4
#define SENSORPIN5 5

File myFile;//Defining one file  class

void setup() {
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:

}

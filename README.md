# arduAIR

Air Quality Monitor in Arduino. controlled by a Node Server. So, you can build your own monitor and upload the data to this server (or your own) 

This project it's currently in development, I will be happy if you want to contribute.

## Getting started:

### building your own air quality monitor
First of all, you will need to build your own Arduino Quality monitor, it could be as simple or complex that you want, the most simple model can be composed of:
* 1 arduino (uno, mega or whatever)
* 1 air Quality sensor (in this category we have a lot of options, like):
 * [MQ sensors]():
   * [MQ]()
   * [MQ-2]()
   * [MQ-4]()
   * [MQ-121]()
 * Dust optical sensor:
   * [Shinyei ppd]()
*  


### Setup your air Q. monitor in to the platform.
Now, I supose that you have your air quality monitor, (complete or incomplete) you can subscribe it in the platform, it's pretty easy:

1) go to: [arduair.herokuapp.com](arduair.herokuapp.com) (provisional URL)
2) click on "add" tab and fill the form.
3) if you are using the arduair config system, click on "add config file";
4) click on submit.
5) enjoy it.

## How to use the arduair Platform
### Subscribing a device:
Please go to getting started/ Setup your air Q. monitor in to the platform.
### Deleting a device

**Instructions coming soon**

## Project State:
### receiving samples
I recevived the samples around Jul-13-2016 for the sparkfun pieces and Jul-19-2016, for the shinyei ppd42ns and MICS 2714
### Testing Parts:
* [Arduino Wifi Shield](https://www.sparkfun.com/products/11287) => working.
* [DHT22](https://www.sparkfun.com/products/10167) =>  working.
* [BMP180](https://www.sparkfun.com/products/11824) => working, but the results are strange. tested another one, getting the same values.
* [SparkFun Luminosity Sensor Breakout - TSL2561](https://www.sparkfun.com/products/12055) => working.
* [SparkFun Real Time Clock Module](https://www.sparkfun.com/products/12708) => Sadly, not working.
* [shinyei ppd42ns](http://www.seeedstudio.com/wiki/images/4/4c/Grove_-_Dust_sensor.pdf) => working, and responding to PM concentration changes. 
* [MQ-7 (Carbon Monoxide)](https://www.sparkfun.com/products/9403) => It will need an special circuit
* [MQ-131 low concentration (Ozone)](http://www.winsen-sensor.com/products/semiconductor-gas-sensor/sensor-mq131.html) => coming soon
* [MICS 2714]() => it will need an special circuit (and special ensambling)
* [ZE03-CO](http://www.winsen-sensor.com/products/co-module/ze03-co.html) => (thanks to ([Winsen](http://www.winsen-sensor.com/) for the calibration, they made an special 0-50 ppm for US), coming soon
* [ZE03-NO2]() => coming soon.
* [ZE03-SO2]() => coming soon.

 
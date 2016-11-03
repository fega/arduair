
# Building your own arduAir device
 Here you can find how to create the same version that I been working on. but in practice, you can build your own version with your own components.

## Equipment

Currently, this project uses:

- 1 Arduino (MEGA)
- 1 Sparkfun DS1307 real time Clock module
- 1 SparkFun BMP180 pressure sensor Module
- 1 SparkFun TSL2561 Light sensor Module
- 1 Arduino wifi Shield (with SD socket)
- 1 DHT22 Humidity/temperature sensor
- 1 Micro SD
- A Set of Air quality sensors, in this case, we use sensors for criteria pollutants.
  - Shinyei ppd42ns Dust sensor
  - MQ-131 low concentration, and Pololu Breakout
  - MQ-7 Carbon Monoxide Sensor
  - ME03-CO: Carbon Monoxide Sensor
  - ME03-SO2: SO2 Sensor
  - ME03-NO2: NO2 Sensor
  - Here we have a couple of alternatives, also AQICN.com have another bunch of references with some experimentation.
- Some Resistances and transistors
- 1 2200 mAh 7.4v 35c Hi-Lithium polymer battery
- 3 lm317 for supply regulation
- A couple of protoboards or similar.

## Installing the Arduino IDE
In order to use an Arduino, you will need to install their IDE on your PC,so [click here to get started](https://www.arduino.cc/en/Guide/HomePage).

## Installing the libraries.
The Arduair project uses a bunch of libraries provides with Arduino, Adafruit and soon, so you will need to install it in order to use some components, if you don't know how to add new libraries [please check this guide](https://www.arduino.cc/en/Guide/Libraries), the libraries that you are going to use, are:

- Wire.h
- DHT.h
- WiFi.h
- SD.h
- SPI.h
- SFE_BMP180.h, [zip version available here](https://github.com/sparkfun/BMP180_Breakout_Arduino_Library/).
- SparkFunTSL2561.h, [zip version available here](https://github.com/sparkfun/SparkFun_TSL2561_Arduino_Library).

## Testing components
Is always a good idea test every component alone to ensure that it works (and you know how to wire it). [in this folder](https://github.com/fega/arduair/tree/master/src-arduino/component%20tests) you will find the testing sketches for all of the components.
## Ensemble
You will need to ensemble the following sketch, if you want to open it on fritzing, check the files. You should also, add [This file]() in the root of the SD (with the same name)

## Testing your Arduair
After you build your device, you should check if it is working, achieve that you can upload the [source code]() to the Arduino. If you observe the code carefully, you will see some weird statements like this:
```c++
#if defined(DEVMODE)
  ...
#endif
```
There are [conditional compilation statements](), and you can active this mode and see some useful logs through Serial
![Arduino Serial ScreenShot](https://lh3.googleusercontent.com/mj00F9ybXC44gQem3UAUkPtLNn8l7-8sITUSA7kBytYzprqk4OuHJQFp_bQWIFwzqFBhVey8mZq1Tgj9Qeg9xnJK_GEm9ics-wRfpiWhHXVmOWAIPPUXdhhiszCx_I2_tp-78ZlJUI_ZmuL2tlUvIgp41y61D2kAbTntQ9WESAIGeyUmVHzHRSqhb6Mkn87F5VajiZvz4QXIPydw4u0blcNAi_XspJbzBvTeYcXDoN2N-H2w14uXaAGXqRRS2vUCNWoDekqnauVHVwoGtaIBi1aXBmjo2DZZJfI2Zx3sQQMxPR2sirzeFihHE-NBdJPv1IKH3cXpvky_wHrsqolDUn38SvM_vR92oOn7boUxhnIqiEbZpK4xN7KAzPKOvVt8cJ4deo_5kq0Sa0iARRmnHHC2E28759gz8KYWumtgPTbGpsoNlMBXU7eTkmSjvcUlM2o4M5iBs5P5YAvayCYVaMmYkAX6Dqe0c-K07cl77m68TP5W7tm9z8jcja5ZwGirvuylUfZRfIgZHx3-oUaMgcc5di1P4xmcQeD0CC6l2F382sxY7WFX5h3TiNIGviLEpa8H5nb5aEPwHXVo91F6tywZF62FIlKxvoY6OiZdNPS3VPzVJg=w640-h170-no)

To toggle the Dev mode, comment or uncomment the following line
```c++
#define DEVMODE true
```
## Using the platform

### Register your Arduair device
After you have an Arduair device you can register it in
http://arduair.herokuapp.com/add, be careful to not provide a personal password because the platform doesn't provide any kind of encrypt right now.

Don't forget to update your SD config.txt file with your configuration

## Deploying your own copy of the server.

In order to achieve that, you will need to install [Node.js](https://nodejs.org/es/), and download this repo.

After that you will need to install [Gulp]() globally with:

```
$ npm install gulp -g
```

And install the prtoject's dependencies

```
$ cd src

$ npm install
```
And run the server with Gulp

```
$ gulp
```

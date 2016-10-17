# arduAIR

Air Quality Monitor in Arduino. controlled by a Node Server. So, you can build your own monitor and upload the data to this server (or your own)

This project's currently in development, I will be happy if you want to contribute.

## Getting started:

### building your own air quality monitor

First of all, you will need to build your own Arduino Quality monitor, it could be as simple or complex that you want.

#### equipment

Currently, this project uses:

- 1 Arduino (MEGA)
- 1 Sparkfun DS1307 real time Clock module
- 1 SparkFun BMP180 pressure sensor Module
- 1 SparkFun TSL2561 Light sensor Module
- 1 Arduino wifi Shield (with SD socket)
- 1 micro SD
- 1 DHT22 Humidity/temperature sensor
- A set of Air quality sensor, in this case, we use sensors for criteria pollutants.
  - shinyei ppd42ns Dust sensor
  - MQ-131 low concentration, and Pololu Breakout
  - MQ-7 Carbon Monoxide Sensor
  - ME03-CO: Carbon Monoxide Sensor
  - ME03-SO2: SO2 Sensor
  - ME03-NO2: NO2 Sensor
  - Here we have a couple of alternatives, also AQICN.com have another bunch of references with some experimentation.
- some Resistances and transistors
- 1 2200 mAh 7.4v 35c Hi-Lithium polimer battery
- 3 lm317 for supply regulation

#### Instructions

See here to open the building instructions. (coming soon).

## Setup your air Q. monitor into the platform.

Now, I suppose that you have your air quality monitor, (complete or incomplete) you can subscribe it in the platform, it's pretty easy:

1. Go to: <arduair.herokuapp.com> (provisional URL)
2. Click on "add" tab and fill the form.
3. If you are using the Arduair config system, click on "add config file";
4. click on submit.
5. enjoy it.

## platform API

We built a very simple API with some non-rest request, because it's easy to perform GET request from arduino.

### Send data without date

```
GET api/:device/:password/timezone
```

name     | type   | description
-------- | ------ | ------------------
device   | string | target Device ID
password | string | target device pass

### Send data with date

```
GET api/:device/:password/:day/:month/:year/:hour/:minute
```

name     | type   | description
-------- | ------ | ------------------
device   | string | target Device ID
password | string | target device pass
day      | number | (1-30)Set day
month    | number | (1-12) Set month
year     | number | (0-9999) set year
hour     | number | (0-24) set hour
minute   | number | (0-60) set minute

### Get all device data

```
GET /:device
```

### Get device data

```
GET /device/:device
```
name     | type   | description
-------- | ------ | ------------------
device   | string | target Device ID

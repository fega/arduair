# ArduAIR

Air Quality Monitor in Arduino. where the interface is a node Server.

### Features:
* Measure Air Criteria pollutants and meteorology variables
* Nice and responsive web UI.
* DebugMode and error log.
* Technical documentation and diagrams

![Arduair screenshot](https://lh3.googleusercontent.com/n5DMal5MwRDozlpnW49EXgYQDbvq39EygwUUXoNwcXKT7U1Ys_4ugA6NnGjbhOQRFY5IhGNsufVo555OuExD0CHivVf-lpzqsD1wEeBmtf5SXPHdYcxEqIFx0hNo6G2qsvZPhx4xgXebkyKA7lD9mKPMS0HugMAi_3bbGt7SLCAaYWy6HTNJ69gANxLJ8lvDBvfZu-idVGM0lgRWwKp01by0gD2WkMlUTx96PYtHEZmPIUOfO-dyn6GNmMmkb-yCURblqtIIz1HQR4uervb-cn6l5sFw-8mJnVzsm1Rvx7zl3MkKe3BR0vghUzwXs6vTBozuzx6svWtWT1ZTunGCy-BvHV9-BNxybk1103pTjneWZYsyxRccRW456pV0Z_H9Ng42aIEwej9-ZXBpOkKYYhEEC_QG_NkkAkvuFlO0ZkjcGxltKhy_JnbJHAFzaJxGevFPgwkZzR1Qo-LyCejmXDiEMguqCSsMF4SFFIE03SuF_il-x9vf12pLn_tmoJKQKVCnPfwLvYJeLrkhmmabxL0SdTGRBMz7V9FTFSQFPyKjbdlTURkH5beaYCnw6NuN6jdMrM_M6YuiEdBW8ymE9orCn8l3MbRcBHf16RZqmLN5reuU4w=w960-h635-no)

## Getting started:

### Building your own air quality monitor

To build an Arduair device,[follow this guide](https://github.com/fega/arduair/blob/master/docs/build-an-Arduair-device.md). if you have questions, doubts or suggestions, open an issue or  a pull request  
|
### Setup the server

You can use the server hosted  [http://arduair.herokuapp.com](here), or deploy your own copy. to achieve that, follow this tutorial (coming soon)

### Setup your air Q. monitor into the platform.

Now, I suppose that you have your air quality monitor, (complete or incomplete) you can subscribe it in the platform, it's pretty easy:

1. Go to: <arduair.herokuapp.com> (provisional URL)
2. Click on "add" tab and fill the form.
3. If you are using the Arduair config system, click on "add config file";
4. Click on submit.
5. Enjoy it.

## Platform API

We built a very simple API with some non-rest request because it's easy to perform GET request from Arduino.

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
day      | number | (1-30)Set the day
month    | number | (1-12) Set the month
year     | number | (0-9999) set the year
hour     | number | (0-24) set the hour
minute   | number | (0-60) set the minute

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

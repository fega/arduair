## Members

<dl>
<dt><a href="#arduair">arduair</a></dt>
<dd><p>Global Object with arduair default configuration and methods</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#hiding">hiding()</a> ⇒ <code>undefined</code></dt>
<dd><p>This function hides all tabs and special buttons</p>
</dd>
<dt><a href="#main">main()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show the main tab</p>
</dd>
<dt><a href="#configure">configure()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show configuration tab and configure action button</p>
</dd>
<dt><a href="#data">data()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show data tab, and do an AJAX request to get every device in the database, it also generates a table with the response</p>
</dd>
<dt><a href="#pageAdd">pageAdd()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show add tab and add action button</p>
</dd>
<dt><a href="#pageDebugger">pageDebugger()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show debug tab</p>
</dd>
<dt><a href="#pageDataGraph">pageDataGraph()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show graph</p>
</dd>
</dl>

<a name="arduair"></a>

## arduair
Global Object with arduair default configuration and methods

**Kind**: global variable  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| arduair.data | <code>Array</code> | Data retrieved from the server, by default is null |
| arduair.normalizedData | <code>Array</code> | A copy of arduair.data after normalization process * @property {Array} arduair.aqiData A copy of arduair.data after AQI calculation |
| arduair.units | <code>Object</code> | Units used in the graphs |
| arduair.aqi_colors | <code>Array</code> | Colors of every range of the Air Quality index |
| arduair.aqi_ranges | <code>Array</code> | Ranges used to calculate te aqi_ranges |
| arduair.line_style | <code>Array</code> | Set the default apereance for the lines in the graph |


* [arduair](#arduair)
    * [.data](#arduair.data) : <code>Array</code>
    * [.normalizeDeviceData()](#arduair.normalizeDeviceData) ⇒ <code>Array</code>
        * [~checkAndNormalize(dates)](#arduair.normalizeDeviceData..checkAndNormalize) ⇒ <code>Array</code>
    * [.aqi()](#arduair.aqi)
    * [.nowcastAqi()](#arduair.nowcastAqi)
        * [~nowcastConcentration()](#arduair.nowcastAqi..nowcastConcentration)
    * [.getColor()](#arduair.getColor)
    * [.getLine()](#arduair.getLine)

<a name="arduair.data"></a>

### arduair.data : <code>Array</code>
Data retrieved from server, by default is null, it could store until 5
spaces, each data contains at least a name and date properties.

**Kind**: static property of <code>[arduair](#arduair)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the device |
| date | <code>Array</code> | Array with date objects |
| locatioKn | <code>Array</code> | Array with location coordinates, for now, Arduair doesn't make use of this parameter but you could use it to extends functionalities |
| humidity | <code>Array</code> | Array with humidity data, in % |
| temperature | <code>Array</code> | Array with temperature data in °C |
| pressure | <code>Array</code> | Array with pressure data, in mb // TODO: check units |
| others: | <code>Array</code> | others attributes measured, in this categories, can be grouped 'pm10' and 'pm2.5' in mg/m3, and 'CO', 'O3', 'NO2' and 'SO2' in ug/m3 |

<a name="arduair.normalizeDeviceData"></a>

### arduair.normalizeDeviceData() ⇒ <code>Array</code>
This method organizes into a form appropriate for graphjs.
mainly, this method put all dates (X axis of the graph)
in one array and organizes all the measures (Y data) consequently

**Kind**: static method of <code>[arduair](#arduair)</code>  
**Returns**: <code>Array</code> - Array with the data normalized  
<a name="arduair.normalizeDeviceData..checkAndNormalize"></a>

#### normalizeDeviceData~checkAndNormalize(dates) ⇒ <code>Array</code>
Check all data from dates provided if arduair.data.date
contains this date, if true, puts every arduair.data key in the
corresponding place of the date checked. it seems to be a very slow
function and should be corrected for another better implementation.

**Kind**: inner method of <code>[normalizeDeviceData](#arduair.normalizeDeviceData)</code>  
**Returns**: <code>Array</code> - myArray normalized copy objects from arduair.data  

| Param | Type | Description |
| --- | --- | --- |
| dates | <code>Date</code> | array of dates, mainly concatenated dates from dateArray.sort(dateSort()); |

<a name="arduair.aqi"></a>

### arduair.aqi()
Calculates the AQI for the given "c" (concentration) in the "pollutant"
if c is an array, returns the an array with the InstantCast aqi values.

**Kind**: static method of <code>[arduair](#arduair)</code>  
<a name="arduair.nowcastAqi"></a>

### arduair.nowcastAqi()
**Kind**: static method of <code>[arduair](#arduair)</code>  
<a name="arduair.nowcastAqi..nowcastConcentration"></a>

#### nowcastAqi~nowcastConcentration()
Calculates the right concentration for every value in the arr,depending on the dates array

**Kind**: inner method of <code>[nowcastAqi](#arduair.nowcastAqi)</code>  
<a name="arduair.getColor"></a>

### arduair.getColor()
**Kind**: static method of <code>[arduair](#arduair)</code>  
<a name="arduair.getLine"></a>

### arduair.getLine()
**Kind**: static method of <code>[arduair](#arduair)</code>  
<a name="hiding"></a>

## hiding() ⇒ <code>undefined</code>
This function hides all tabs and special buttons

**Kind**: global function  
<a name="main"></a>

## main() ⇒ <code>undefined</code>
Show the main tab

**Kind**: global function  
<a name="configure"></a>

## configure() ⇒ <code>undefined</code>
Show configuration tab and configure action button

**Kind**: global function  
<a name="data"></a>

## data() ⇒ <code>undefined</code>
Show data tab, and do an AJAX request to get every device in the database, it also generates a table with the response

**Kind**: global function  
<a name="pageAdd"></a>

## pageAdd() ⇒ <code>undefined</code>
Show add tab and add action button

**Kind**: global function  
<a name="pageDebugger"></a>

## pageDebugger() ⇒ <code>undefined</code>
Show debug tab

**Kind**: global function  
<a name="pageDataGraph"></a>

## pageDataGraph() ⇒ <code>undefined</code>
Show graph

**Kind**: global function  

## Members

<dl>
<dt><a href="#myChart">myChart</a></dt>
<dd><p>Chart configuration, to get more info look in <a href="http://www.chartjs.org/">chart.js</a></p>
</dd>
<dt><a href="#aqiChart">aqiChart</a></dt>
<dd><p>AQI chart configuration</p>
</dd>
<dt><a href="#arduair">arduair</a></dt>
<dd><p>Global Object with arduair default configuration and methods</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#saveDataRequested">saveDataRequested(res)</a></dt>
<dd><p>Saves a requested data in the correct place of arduair.data</p>
</dd>
<dt><a href="#toastAndRemoveClass">toastAndRemoveClass(message, object, classToRemove)</a></dt>
<dd><p>Lauch a materialize toast and after it disappear, remove the a specific class to the given object</p>
</dd>
<dt><a href="#generateDeviceCollectionItem">generateDeviceCollectionItem(item)</a> ⇒ <code>String</code></dt>
<dd><p>Generate a item of a collection with the given item, this is visible in the /data url</p>
</dd>
<dt><a href="#generateDeviceCollectionList">generateDeviceCollectionList(res)</a></dt>
<dd><p>generate a collection from the given res parameter using the generateDeviceCollectionItem() function, if res.devices is empty, it generates an html error message and append it #deviceCollection object</p>
</dd>
<dt><a href="#generateErrorItem">generateErrorItem(text)</a> ⇒ <code>String</code></dt>
<dd><p>Returns an html error message with the given text</p>
</dd>
<dt><a href="#generateGraphChips">generateGraphChips(data)</a></dt>
<dd><p>Generates a control bar in the /data/device panel with the given data</p>
</dd>
<dt><a href="#generateChipsForGraph">generateChipsForGraph(destiny, data)</a></dt>
<dd><p>Generate a set of chips and append it to the destiny object</p>
</dd>
<dt><a href="#generateBtnAddToGraph">generateBtnAddToGraph(destiny, dataCount)</a></dt>
<dd><p>Generate an &quot;add to graph&quot; button and append it to the destiny. if dataCount &gt;= 5, disables the add button.</p>
</dd>
<dt><a href="#generateBtnEditGraph">generateBtnEditGraph(destiny, dataCount)</a></dt>
<dd><p>Generate an &quot;edit graph&quot; button and append it to the destiny. if dataCount &gt;= 5, disables the add button.</p>
</dd>
<dt><a href="#bindBtnEditGraph">bindBtnEditGraph(destiny)</a></dt>
<dd><p>adds editGraph button functionality</p>
</dd>
<dt><a href="#generateBtnSwitchGraph">generateBtnSwitchGraph(destiny, dataCount)</a></dt>
<dd><p>Generate an &quot;switch&quot; button and append it to the destiny. if dataCount &gt;= 5, disables the add button.</p>
</dd>
<dt><a href="#generateGraphMenu">generateGraphMenu()</a></dt>
<dd><p>Generates a options menu for each data array. with the given units</p>
</dd>
<dt><a href="#generateGraphMenuBtn">generateGraphMenuBtn(destiny, name, units)</a></dt>
<dd><p>generate the buttons for the graph menu</p>
</dd>
<dt><a href="#generateGraphMenuMasterBtn">generateGraphMenuMasterBtn(destiny, color, name)</a></dt>
<dd><p>Adds a simple header button for the graph menu</p>
</dd>
<dt><a href="#generateAqiGraphMenu">generateAqiGraphMenu()</a></dt>
<dd><p>Generates a options menu for each data array, in the AQI graph panel with the given units</p>
</dd>
<dt><a href="#generateAqiGraphMenuBtn">generateAqiGraphMenuBtn(destiny, name, units, device)</a></dt>
<dd><p>Generates a button for the menu in de aqi graph menu button.</p>
</dd>
<dt><a href="#generatePDF">generatePDF(data, firstDate, lastDate)</a></dt>
<dd><p>Generates a pdf report from the firstDate to the last date</p>
</dd>
<dt><a href="#pageDocumentation">pageDocumentation()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show the documentation tab</p>
</dd>
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

<a name="myChart"></a>

## myChart
Chart configuration, to get more info look in [chart.js](http://www.chartjs.org/)

**Kind**: global variable  
<a name="aqiChart"></a>

## aqiChart
AQI chart configuration

**Kind**: global variable  
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
Data retrieved from server, by default is null, it could store until 5spaces, each data contains at least a name and date properties.

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
This method organizes into a form appropriate for graphjs.mainly, this method put all dates (X axis of the graph)in one array and organizes all the measures (Y data) consequently

**Kind**: static method of <code>[arduair](#arduair)</code>  
**Returns**: <code>Array</code> - Array with the data normalized  
<a name="arduair.normalizeDeviceData..checkAndNormalize"></a>

#### normalizeDeviceData~checkAndNormalize(dates) ⇒ <code>Array</code>
Check all data from dates provided if arduair.data.datecontains this date, if true, puts every arduair.data key in thecorresponding place of the date checked. it seems to be a very slowfunction and should be corrected for another better implementation.

**Kind**: inner method of <code>[normalizeDeviceData](#arduair.normalizeDeviceData)</code>  
**Returns**: <code>Array</code> - myArray normalized copy objects from arduair.data  

| Param | Type | Description |
| --- | --- | --- |
| dates | <code>Date</code> | array of dates, mainly concatenated dates from dateArray.sort(dateSort()); |

<a name="arduair.aqi"></a>

### arduair.aqi()
Calculates the AQI for the given "c" (concentration) in the "pollutant"if c is an array, returns the an array with the InstantCast aqi values.

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
<a name="saveDataRequested"></a>

## saveDataRequested(res)
Saves a requested data in the correct place of arduair.data

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>AjaxResponse</code> | AjaxResponse to be placed |

<a name="toastAndRemoveClass"></a>

## toastAndRemoveClass(message, object, classToRemove)
Lauch a materialize toast and after it disappear, remove the a specific class to the given object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | message in the toast |
| object | <code>JquerySelector</code> | Object to remove a class |
| classToRemove | <code>String</code> | class to be removed in the object |

<a name="generateDeviceCollectionItem"></a>

## generateDeviceCollectionItem(item) ⇒ <code>String</code>
Generate a item of a collection with the given item, this is visible in the /data url

**Kind**: global function  
**Returns**: <code>String</code> - Html string to be rendered  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Object</code> | Item to be rendered |

<a name="generateDeviceCollectionList"></a>

## generateDeviceCollectionList(res)
generate a collection from the given res parameter using the generateDeviceCollectionItem() function, if res.devices is empty, it generates an html error message and append it #deviceCollection object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>Object</code> | object with a device field with the objects to be rendered |

<a name="generateErrorItem"></a>

## generateErrorItem(text) ⇒ <code>String</code>
Returns an html error message with the given text

**Kind**: global function  
**Returns**: <code>String</code> - Html error message  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | Error text. |

<a name="generateGraphChips"></a>

## generateGraphChips(data)
Generates a control bar in the /data/device panel with the given data

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | data to create the chips |

<a name="generateChipsForGraph"></a>

## generateChipsForGraph(destiny, data)
Generate a set of chips and append it to the destiny object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| destiny | <code>JquerySelector</code> | Where to apppend the chips |
| data | <code>Object</code> | Object to create the chips |

<a name="generateBtnAddToGraph"></a>

## generateBtnAddToGraph(destiny, dataCount)
Generate an "add to graph" button and append it to the destiny. if dataCount >= 5, disables the add button.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| destiny | <code>JquerySelector</code> | Where append the button |
| dataCount | <code>Number</code> | if dataCount>= disables the buton |

<a name="generateBtnEditGraph"></a>

## generateBtnEditGraph(destiny, dataCount)
Generate an "edit graph" button and append it to the destiny. if dataCount >= 5, disables the add button.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| destiny | <code>JquerySelector</code> | Where append the button |
| dataCount | <code>Number</code> | if dataCount>= disables the buton |

<a name="bindBtnEditGraph"></a>

## bindBtnEditGraph(destiny)
adds editGraph button functionality

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| destiny | <code>JquerySelector</code> | Where append the button |

<a name="generateBtnSwitchGraph"></a>

## generateBtnSwitchGraph(destiny, dataCount)
Generate an "switch" button and append it to the destiny. if dataCount >= 5, disables the add button.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| destiny | <code>JquerySelector</code> | Where append the button |
| dataCount | <code>Number</code> | if dataCount>= disables the buton |

<a name="generateGraphMenu"></a>

## generateGraphMenu()
Generates a options menu for each data array. with the given units

**Kind**: global function  
<a name="generateGraphMenuBtn"></a>

## generateGraphMenuBtn(destiny, name, units)
generate the buttons for the graph menu

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| destiny | <code>JquerySelector</code> | where the button should be placed |
| name | <code>String</code> | Name of the button |
| units | <code>String</code> | units of the button |

<a name="generateGraphMenuMasterBtn"></a>

## generateGraphMenuMasterBtn(destiny, color, name)
Adds a simple header button for the graph menu

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| destiny | <code>JquerySelector</code> | where the button should be placed |
| color | <code>String</code> | Color of the master button |
| name | <code>name</code> | Name of the button (a device name) |

<a name="generateAqiGraphMenu"></a>

## generateAqiGraphMenu()
Generates a options menu for each data array, in the AQI graph panel with the given units

**Kind**: global function  
<a name="generateAqiGraphMenuBtn"></a>

## generateAqiGraphMenuBtn(destiny, name, units, device)
Generates a button for the menu in de aqi graph menu button.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| destiny | <code>JquerySelector</code> | Where the button should be placed |
| name | <code>String</code> | Name of the variable |
| units | <code>String</code> | Units in the button |
| device | <code>String</code> | Device name (for triggering reason) |

<a name="generatePDF"></a>

## generatePDF(data, firstDate, lastDate)
Generates a pdf report from the firstDate to the last date

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Data source |
| firstDate | <code>Date</code> | beggining date |
| lastDate | <code>Date</code> | Last date in the report |

<a name="pageDocumentation"></a>

## pageDocumentation() ⇒ <code>undefined</code>
Show the documentation tab

**Kind**: global function  
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

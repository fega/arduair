## Members

<dl>
<dt><a href="#arduair">arduair</a></dt>
<dd><p>Global Object with arduair default configuration and methods</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#hidding">hidding()</a> ⇒ <code>undefined</code></dt>
<dd><p>This function hide all tabs and special buttons</p>
</dd>
<dt><a href="#main">main()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show main tab</p>
</dd>
<dt><a href="#configure">configure()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show configuration tab and configure action button</p>
</dd>
<dt><a href="#documentation">documentation()</a> ⇒ <code>undefined</code></dt>
<dd><p>Show documentation tab and comment action button</p>
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
| arduair.data | <code>Array</code> | Data retrieved from server, by default is null |
| arduiair.units | <code>Object</code> | Units used in the graphs |
| arduair.activeGraph | <code>Array</code> |  |
| arduair.aqi_colors | <code>Array</code> | Colors of every range of the Air Quality index |
| arduair.aqi_ranges | <code>Array</code> | Ranges used to calculate te aqi_ranges |
| arduair.line_style | <code>Array</code> | Set the default apereance for the lines in the graph |


* [arduair](#arduair)
    * [.generateDeviceList(res)](#arduair.generateDeviceList)
    * [.generateGraphChips()](#arduair.generateGraphChips)
    * [.saveDataRequested()](#arduair.saveDataRequested)
    * [.generateGraphMenu()](#arduair.generateGraphMenu)
    * [.bindMenuButtonBehavior()](#arduair.bindMenuButtonBehavior)

<a name="arduair.generateDeviceList"></a>

### arduair.generateDeviceList(res)
Generates the table with devices gotten by a request

**Kind**: static method of <code>[arduair](#arduair)</code>  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>Json</code> | Response object |

<a name="arduair.generateGraphChips"></a>

### arduair.generateGraphChips()
Generates chips for each device loaded

**Kind**: static method of <code>[arduair](#arduair)</code>  
<a name="arduair.saveDataRequested"></a>

### arduair.saveDataRequested()
Save a requested data in the correct place of arduair.data

**Kind**: static method of <code>[arduair](#arduair)</code>  
<a name="arduair.generateGraphMenu"></a>

### arduair.generateGraphMenu()
Generates a options menu for each data array.

**Kind**: static method of <code>[arduair](#arduair)</code>  
<a name="arduair.bindMenuButtonBehavior"></a>

### arduair.bindMenuButtonBehavior()
This function controls the filledGraphData buttons behavior

**Kind**: static method of <code>[arduair](#arduair)</code>  
<a name="hidding"></a>

## hidding() ⇒ <code>undefined</code>
This function hide all tabs and special buttons

**Kind**: global function  
<a name="main"></a>

## main() ⇒ <code>undefined</code>
Show main tab

**Kind**: global function  
<a name="configure"></a>

## configure() ⇒ <code>undefined</code>
Show configuration tab and configure action button

**Kind**: global function  
<a name="documentation"></a>

## documentation() ⇒ <code>undefined</code>
Show documentation tab and comment action button

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

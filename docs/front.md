## Members

<dl>
<dt><a href="#arduair">arduair</a></dt>
<dd><p>Global array for client configuration</p>
</dd>
<dt><a href="#chartctx">chartctx</a></dt>
<dd><p>Chart contex, necesary  generate the graph</p>
</dd>
<dt><a href="#myChart">myChart</a></dt>
<dd><p>Chart configuration, to get more info look in <a href="http://www.chartjs.org/">chart.js</a></p>
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
<dt><a href="#printMenuGraph">printMenuGraph(index)</a> ⇒ <code>undefined</code></dt>
<dd><p>This function create a menu for the graph</p>
</dd>
<dt><a href="#dataGraphRequest">dataGraphRequest(device)</a> ⇒ <code>undefined</code></dt>
<dd><p>Request a device data and put it in arduair.data array</p>
</dd>
<dt><a href="#GraphChips">GraphChips()</a></dt>
<dd><p>Generates chips for each device loaded</p>
</dd>
</dl>

<a name="arduair"></a>

## arduair
Global array for client configuration

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

<a name="chartctx"></a>

## chartctx
Chart contex, necesary  generate the graph

**Kind**: global variable  
<a name="myChart"></a>

## myChart
Chart configuration, to get more info look in [chart.js](http://www.chartjs.org/)

**Kind**: global variable  
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
<a name="printMenuGraph"></a>

## printMenuGraph(index) ⇒ <code>undefined</code>
This function create a menu for the graph

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Number</code> | the index to construct their menu |

<a name="dataGraphRequest"></a>

## dataGraphRequest(device) ⇒ <code>undefined</code>
Request a device data and put it in arduair.data array

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| device | <code>String</code> | Device name |

<a name="GraphChips"></a>

## GraphChips()
Generates chips for each device loaded

**Kind**: global function  

/*global Chart, jQuery $ myChart, Materialize arduair _ moment pdfMake*/
/* exported myChart*/
/*///////////////////////////////////////
MaterializeCSS initialization
///////////////////////////////////////*/
(function($) {
    $(() => {
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        $('.modal-trigger').leanModal();
        $('select').material_select();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
        //search data buttons
        $('#actionBtn-search').click(() => {
            $('#modalSearch').openModal();
        });
        $('#actionBtn-SearchClose').click(() => {
            $('#modalSearch').closeModal();
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space
/*UTILS*/
/* eslint-disabl */
/**
 * Saves a requested data in the correct place of arduair.data
 * @param  {AjaxResponse} res AjaxResponse to be placed
 */
function saveDataRequested(res) {
    var position;
    var name = res.data.name;
    if (res.status === 'done') { //si el resultado es satisfactorio...
      position = selectPosition(arduair.data);
    }
    toastAndRemoveClass(res.message,"#actionBtn-search a",res.status);
    arduair.data[position] = res.data; //ubico el array recibido en el array
    var normalized = arduair.normalizeDeviceData(arduair.data);
    arduair.normalizedData = normalized.data;
    arduair.normalizedDates = normalized.dates;
    function selectPosition(data){
      if (data.isNull()) { //.. si todo el array  del cliente es null, imprimo en la posicion 0
        return 0;//console.log("todo el array es null");
      } else { // si no, busco una posicion nula para imprimir
        var position = data.checkNewData(name);//console.log("CheckNewData retornando" + position);
        if (position === false || position === null || position === undefined) {
          return data.firstNull();//console.log("no hay data con ese nombre, poniendo la data en:" + position);
        }
        if (position === -1) { // ni no la hay imprimo en el ultimo lugar
          return 4;//console.log("Data full, sobre escribiendo 4");
        }
      }
    }
  }
/**
 * Lauch a materialize toast and after it disappear, remove the a specific class to the given object
 * @param  {String} message       message in the toast
 * @param  {JquerySelector} object        Object to remove a class
 * @param  {String} classToRemove class to be removed in the object
 */
function toastAndRemoveClass(message,object,classToRemove){
  Materialize.toast(message, 4000, '', () => {
    $(object).removeClass(classToRemove);
  });
}
/**
 * Generate a item of a collection with the given item, this is visible in the /data url
 * @param  {Object} item Item to be rendered
 * @return {String}      Html string to be rendered
 */
function generateDeviceCollectionItem(item){
  return `
  <li class="collection-item avatar">
    <a href="data/${item.name}">
      <span class="primary-text title">${item.name}</span>
      <p class="primary-text">Last Register: ${moment(name.lastRegister).format("Do YYYY, h:mm:ss a")}</p>
      <p>Owner: ${item.owner}</p>
      ${chips(item)}
    </a>
  </li>`;

  function chips(item){
    var result = "";
    result = _(item)
      .omit(["location", "name" , "lastRegister", "email", "password", "parameters", "owner","_id","__v","temperature","date","humidity","pressure","Location","pst","description","configFile"])
      .map((i,k)=>`<div class="chip">${k}</div>`)
      .join(" ");

    result= `<div class="hide-on-small-only">${result}</div>`;
      console.log(result);
    return result;
  }
}
/**
 * generate a collection from the given res parameter using the generateDeviceCollectionItem() function, if res.devices is empty, it generates an html error message and append it #deviceCollection object
 * @param  {Object} res object with a device field with the objects to be rendered
 */
function generateDeviceCollectionList(res){
  var devices = _(res.devices)
  .map(item=>generateDeviceCollectionItem(item))
  .join('');
  console.log(res.devices[1])
  if(_.isEmpty(devices)) devices= generateErrorItem(res.message);
  $('#deviceCollection').html(devices);
}
/**
 * Returns an html error message with the given text
 * @param  {String} text Error text.
 * @return {String}      Html error message
 */
function generateErrorItem(text){
  return `
  <div class="col s12 center">
    <p class="error-text">${text}</p>
  </div>`;
}
/**
 * Generates a control bar in the /data/device panel with the given data
 * @param  {Object} data data to create the chips
 */
function generateGraphChips(data) {
    $('#page-graph-chips').html(''); // PONGO LOS CHIPS EN EL HTML
    generateChipsForGraph("#page-graph-chips",data);
    generateBtnAddToGraph ("#page-graph-chips",data.firstNull());
    generateBtnEditGraph  ("#page-graph-chips",data.isNull());
    generateBtnSwitchGraph("#page-graph-chips",arduair.normalizedData,arduair.normalizedDates);
    generateBtnPDFGraph("#page-graph-chips");
}
/**
 * Generate a set of chips and append it to the destiny object
 * @param  {JquerySelector} destiny Where to apppend the chips
 * @param  {Object} data    Object to create the chips
 */
function generateChipsForGraph(destiny, data) {
  var content = '';
  var firstNull = data.firstNull(); // how many chips will be created
  for (var i = 0; i < firstNull; i++) {
    var el = data[i];
    content += `
      <div class="chip page-edit-chip" id="page-edit-chip-${i}">
        ${el.name}<i class="material-icons">close</i>
      </div>`;
  }
  $(destiny).append(content);
  $(".page-edit-chip i.material-icons").click(function() { //AÑADO LOS CLICKS del boton "clear", para eliminar la entrada
      //console.log($(this));
      var index = $(this).parent().attr("id").replace('page-edit-chip-', '');
      var device = $(this).parent().text();
      device=_.trim(device).slice(0, -5); //TODO add device name validation withoutspaces
      //console.log("DEVICE:")
      //console.log(device)
      data.splice(index, 1, null);
      generateGraphMenu(arduair.data,arduair.units); //imprimo el menu
      generateAqiGraphMenu(arduair.data); //imprimo el menu
      _.remove(aqiChart.data.datasets,{device});//and delete the data
      aqiChart.update(0);
  });
}
/**
 * Generate an "add to graph" button and append it to the destiny. if dataCount >= 5, disables the add button.
 * @param  {JquerySelector} destiny   Where append the button
 * @param  {Number} dataCount if dataCount>= disables the buton
 */
function generateBtnAddToGraph(destiny,dataCount){
  var button=`
  <a id="page-graph-add" href="/data" class="btn-floating accent">
    <i class="material-icons">add</i>
  </a>`;
  $(destiny).append(button);
  if (dataCount === 5) $(destiny).addClass("disabled");
}
/**
 * Generate an "edit graph" button and append it to the destiny. if dataCount >= 5, disables the add button.
 * @param  {JquerySelector} destiny   Where append the button
 * @param  {Number} dataCount if dataCount>= disables the buton
 */
function generateBtnEditGraph(destiny,disabled){
  var button = `
  <a id="page-graph-edit" class="btn-floating primary">
    <i class="material-icons">edit</i>
  </a>`;
  $(destiny).append(button);
  if (disabled) $('#page-graph-edit').addClass("disabled"); //ACTIVO O DESACTIVO LOS BOTONES

  $('#page-graph-edit').click(() => { //AÑADO LOS CLICKS del boton de edicion
      var menu = $("#page-graph-edit-menu");
      if (menu.hasClass("active")) {
          menu.removeClass("active");
          menu.slideUp();
      } else {
          menu.addClass("active");
          menu.slideDown();
      }
  });
}
/**
 * adds editGraph button functionality
 * @param  {JquerySelector} destiny   Where append the button
 */
function bindBtnEditGraph(destiny) {
  $('#page-graph-edit')
  .unbind('click')
  .unbind('click.namespace')
  .bind('click.namespace', () => { //AÑADO LOS CLICKS del boton de edicion
    var menu = $(destiny);
    if (menu.hasClass("active")) {
      menu.removeClass("active");
      menu.slideUp();
    } else {
      menu.addClass("active");
      menu.slideDown();
    }
  });
}
/**
 * Generate an "switch" button and append it to the destiny. if dataCount >= 5, disables the add button.
 * @param  {JquerySelector} destiny   Where append the button
 * @param  {Number} dataCount if dataCount>= disables the buton
 */
function generateBtnSwitchGraph(destiny,data){
  var button = `
  <a id="page-graph-switch" class="btn-floating primary" style="background-color:#2c3e50!important;text-align: center;
    font-size: small;
    font-weight: bolder;">
    AQI
  </a>`;
  $(button).appendTo(destiny)
  .click(function(){
    var btn = $(this);//the button to bind the function
    if(btn.text().includes("AQI")){
      generateAqiGraphMenu(data);
      aqiChart.data.datasets=[];
      aqiChart.update(0);
      bindBtnEditGraph("#page-aqigraph-edit-menu");
      btn.text("[C]");//changes button text

      //TODO: unbind and bind BtnEditGraph effect for the AQI graph to show the menu
      $("#aqigraph-row").slideDown('fast');
      $("#graph-row").slideUp('fast');
    }else{
      bindBtnEditGraph("#page-graph-edit-menu");
      btn.text("AQI");//changes button text
      $("#aqigraph-row").slideUp('fast');
      $("#graph-row").slideDown('fast');
    }
  });
}
/**
 * Generate a PDF generator button
 * @param  {JquerySelector} destiny   Where append the button
 * @param  {Number} dataCount if dataCount>= disables the buton
 */
function generateBtnPDFGraph(destiny){
  var button = `
  <a id="page-graph-switch" class="btn-floating primary" style="background-color:#2c3e50!important;text-align: center;
    font-size: small;
    font-weight: bolder;">
    PDF
  </a>`;
  $(button).appendTo(destiny)
  .click(()=>{
    //var btn = $(this);//the button to bind the function
    generatePDF(arduair.data,"1995-12-25","2002-12-25");
  });
}
/**
 * Generates a options menu for each data array. with the given units
 */
function generateGraphMenu(data,units) {
    data.forEach((el, index) => {
      var ind = index + 1;
      var destiny = `#graph-options-${ind}`;
      var filteredData;
      $(`#graph-options-${ind}`).html('');
      if (el){
        generateGraphMenuMasterBtn(destiny,arduair.getColor(index),el.name);
        filteredData=_.omit(el,['date','Location','pst','name']);
        _.forIn(filteredData,(val,key)=>generateGraphMenuBtn(destiny,key,units[key]));
      }
    });
}
/**
 * generate the buttons for the graph menu
 * @param  {JquerySelector} destiny where the button should be placed
 * @param  {String} name    Name of the button
 * @param  {String} units   units of the button
 */
function generateGraphMenuBtn(destiny,name,units){
  var content =`
  <a  class="btn filledGraphData" data-var="${name}" data-units="${units}">
   ${name} ${units}
  </a>`;
  $(content ).appendTo(destiny).bind('click.namespace', function() {
      var main = $(this);
      var units = main.data("units");
      var value = main.data("var");
      var index = main.parent().attr("id").replace("graph-options-", "") - 1;
      var data = [];

      if ($(this).hasClass("active")) $(this).removeClass("active"); // si esta activo lo desactivo
      else $(this).addClass("active"); //si no:

      $(".filledGraphData").each(function() { //por cada boton filledGraphData
          var other = $(this);
          var oUnits = other.data("units");
          var oValue = other.data("var");
          var oIndex = other.parent().attr("id").replace("graph-options-", "") - 1;
          if (oUnits === units) { //que tenga las mismas unidades
              other.removeClass("disabled"); //lo dejo disponible
              if (oValue === value && index !== oIndex && main.hasClass("active")) { //si ademas tiene el mismo tipo de valor
                  other.addClass("active"); // lo activo y añado a la gradica
              }
          } else { //si no tiene las mismas unidades
              other.addClass("disabled"); //lo desactivo y elimino la clase activo
              other.removeClass("active");
          }
          //despues de todo esto:
          if (other.hasClass("active")) {
              var color = arduair.getColor(oIndex);
              var line = arduair.getLine(oValue);
              data.push({
                  data: arduair.normalizedData[oIndex][oValue],
                  label: oValue,
                  borderColor: color,
                  borderDash: line
              });
          }
          myChart.data.datasets = data;
          myChart.data.labels = arduair.normalizedDates;
          myChart.update(100);
      });
  });;
}
/**
 * Adds a simple header button for the graph menu
 * @param  {JquerySelector} destiny where the button should be placed
 * @param  {String} color   Color of the master button
 * @param  {name} name    Name of the button (a device name)
 */
function generateGraphMenuMasterBtn(destiny,color,name){
  var content=`
  <a  class="btn filledGraphDataMaster white-text" style="background-color:${color}">
    ${name}
  </a>`;
  $(destiny).append(content);
}
/**
 * Generates a options menu for each data array, in the AQI graph panel with the given units
 */
function generateAqiGraphMenu(data){
  data.forEach((item, index) => {//forEach element in data
    var ind = index + 1;
    $(`#aqigraph-options-${ind}`).html('');//TODO: it should iterates over this kind of objects
    var destiny = `#aqigraph-options-${ind}`;//set a destiny
    if (item){//generate buttons depending on their keys
      generateGraphMenuMasterBtn(destiny,arduair.getColor(index),item.name);
      if (_.has(item,'o3')){
        generateAqiGraphMenuBtn(destiny,'Instant O3','AQI',item.name);
        generateAqiGraphMenuBtn(destiny,'Nowcast O3','AQI',item.name);
      }if(_.has(item,'pm25')){
        generateAqiGraphMenuBtn(destiny,'Instant PM2.5','AQI',item.name);
        generateAqiGraphMenuBtn(destiny,'Nowcast PM2.5','AQI',item.name);
      }if(_.has(item,'pm10')){
        generateAqiGraphMenuBtn(destiny,'Instant PM10','AQI',item.name);
        generateAqiGraphMenuBtn(destiny,'Nowcast PM10','AQI',item.name);
      }if(_.has(item,'no2')){
        generateAqiGraphMenuBtn(destiny,'NO2','AQI',item.name);
        generateAqiGraphMenuBtn(destiny,'Instant NO2','AQI',item.name);
      }if(_.has(item,'so2')){
        generateAqiGraphMenuBtn(destiny,'SO2','AQI',item.name);
        generateAqiGraphMenuBtn(destiny,'Instant SO2','AQI',item.name);
      }if(_.has(item,'co')){
        generateAqiGraphMenuBtn(destiny,'Nowcast CO','AQI',item.name);
        generateAqiGraphMenuBtn(destiny,'Instant CO','AQI',item.name);
      }
    }
  });
}
/**
 * Generates a button for the menu in de aqi graph menu button.
 * @param  {JquerySelector} destiny Where the button should be placed
 * @param  {String} name    Name of the variable
 * @param  {String} units   Units in the button
 * @param  {String} device  Device name (for triggering reason)
 */
function generateAqiGraphMenuBtn(destiny,name,units,device){
  var content =`
  <a  class="btn filledGraphData" data-var="${name}" data-units="${units}" data-device="${device }" >
   ${name} ${units}
  </a>`;

  $(content ).appendTo(destiny).bind('click.namespace', function() {//when you do click
    // console.log("PROBANDO FUNCION")
    var item=$(this);
    var device=item.data('device');
    var label=item.data('var');//get the button data
    var pollutant= _(label).toLower().replace("instant ","").replace("nowcast ","").replace(".","").replace(" ","");
    var normalizedLabel=_.camelCase(label+" AQI");
    var active= item.hasClass("active");
    var object= _.find(arduair.normalizedData,{name:device});
    var objectIndex= _.findIndex(arduair.normalizedData,{name:device});
    var result={};
    if(active){// if the button is active
      item.removeClass("active");//put inactive off
      _.remove(aqiChart.data.datasets,{label,device});//and delete the data
      aqiChart.update(0);
    }else{//if Not
      // console.log("PROBANDO ACTIVE MODE")
      // console.log(label)
      // console.log(normalizedLabel)
      // console.log(object)
      // console.log(objectIndex)
      // console.log(result)

      $(this).addClass("active");//set it as active
      if(!_.has(object,normalizedLabel)){
        if(normalizedLabel.includes("instant")){
          result.data=arduair.data[objectIndex][normalizedLabel]=arduair.aqi(arduair.data[objectIndex][pollutant],pollutant);
        }else{
          result.data=arduair.data[objectIndex][normalizedLabel]=arduair.nowcastAqi(arduair.data[objectIndex][pollutant],pollutant,arduair.normalizedDates);
        }
      }
      result.label=label;
      result.borderColor=arduair.getColor(objectIndex);
      result.borderDash=arduair.getLine(pollutant);
      result.device = device;
      aqiChart.data.datasets.push(result);
      aqiChart.data.labels = arduair.normalizedDates;

      aqiChart.update(0);
    }
  });
}
/**
 * Generates a pdf report from the firstDate to the last date
 * @param  {Object} data      Data source
 * @param  {Date} firstDate beggining date
 * @param  {Date} lastDate  Last date in the report
 */
function generatePDF(data,firstDate,lastDate){
  firstDate = moment(firstDate);
  lastDate  = moment(lastDate);
  var img = "";
  var headers = _(data)
    .chain()
    .map(item=>_.keys(item))
    .flatten()
    .uniq()
    .filter((item)=>item !== 'date')
    .filter((item)=>item !== 'name')
    .map(item=>{return {text:item,style:'tableHeader'};})
    .value();
  headers.unshift({text:'dates',style:'tableHeader'});
  var table={
    headerRows: 1,
    body: headers
  };
  if (_.isEmpty(data)){//check if the data is empty
    toastAndRemoveClass("There is no data to print","","");
    return;
  }
  if(firstDate.diff(lastDate)>0){//check the input dates
    toastAndRemoveClass("LastDateError","","");
    return;
  }
  data.forEach(item=>{
    //generateTable(item)
  })
  var pdf={
    content:[{
      text: "ARDUAIR summary document",
      style:"header",
      alignment: 'center'
    },{
      text:" "
    },{
      text:"Devices",
      style: 'subheader'
    },{
      text:"Devices:",//for each data.devices....
    },{
      text:" "
    },{
      text:"date Ranges",
      style: 'subheader'
    },{
      text: `From:  ${firstDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}
      To:        ${lastDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}`
    },{
      text:" "
    },{
      text:"Resume",
      style: 'subheader'
    }
  ],
    styles: {
      header: {
        fontSize: 25,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      tableHeader: {
			fontSize: 12,
			color:"#2980b9",
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      }
    }
  };

   //pdfMake.createPdf(pdf).open();
   function generateTable(data,dates,title,header,subheader){
     var result = { headerRows: 0, body: [] }
     if (title !== undefined){
       result.body.push("")
     }
     if (header !== undefined){
       result.body.push("")
     }
     if (subheader !== undefined){
       result.body.push("")
     }

   }
}
/* eslint-enable */
/*///////////////////////////////////////
ChartJS Global Configuration
///////////////////////////////////////*/
Chart.defaults.global.defaultColor = 'rgba(255, 255, 255, 0)';
Chart.defaults.global.defaultFontColor = '#2c3e50';
Chart.defaults.global.elements.line.fill = false;
Chart.defaults.global.elements.line.borderWidth = 1;
Chart.defaults.global.elements.line.backgroundColor = 'rgba(255, 255, 255, 1)';
Chart.defaults.global.elements.line.borderColor = '#FF1744';
Chart.defaults.global.elements.point.backgroundColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.global.elements.point.radius = 4;
Chart.defaults.global.elements.point.borderColor = '#FF1744';
/**
 * Chart configuration, to get more info look in [chart.js](http://www.chartjs.org/)
 */
var myChart = new Chart($("#chart"), {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: '0',
            data: [0]
        }]
    },
    options: {
        spanGaps:true,
        defaultColor: '#FF1744',
        scales: {
            type: 'time',
            xAxes: [{
                type: "time"
            }]
        }
    }
});
/**
 * AQI chart configuration
 */
var aqiChart = new Chart($("#aqi-chart"), {
  type: 'line',
  data: {
    labels: [0,100],
    datasets: []
  },
  options: {
    spanGaps: true,
    defaultColor: '#FF1744',
    scales: {
      type: 'time',
      xAxes: [{
        type: "time"
      }]
    },
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 50,
        borderColor: '#00e500',
        borderWidth: 1
      },{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 100,
        borderColor: '#ffff00',
        borderWidth: 1
      }, { //AQI LINES
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 150,
        borderColor: "rgb(255,127,0)",
        backgroundColor: "rgba(255,127,0,.04)",
        fill: true,
        pointRadius: 0,
      }, { //AQI LINES
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 200,
        borderColor: "#ff0000",
        backgroundColor: "rgba(255,0,0,.04)",
        fill: true,
        pointRadius: 0,
      }, { //AQI LINES
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 300,
        borderColor: "rgb(164,61,155)",
        backgroundColor: "rgba(164,61,155,.04)",
        fill: true,
        pointRadius: 0,
      }, { //AQI LINES
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 400,
        borderColor: "#94001e",
        pointRadius: 0,
      }, { //AQI LINES
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 500,
        borderColor: "rgb(148,0,30)",
        backgroundColor: "rgba(148,0,30,.05)",
        fill: true,
        pointRadius: 0
}]
    }
  }
});

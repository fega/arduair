/*global page $, Materialize, myChart, moment mean min max _*/
/**
 * Global Object with arduair default configuration and methods
 * @global
 * @property {Array} arduair.data Data retrieved from the server, by default is null
 * @property {Array} arduair.normalizedData A copy of arduair.data after normalization process
 * * @property {Array} arduair.aqiData A copy of arduair.data after AQI calculation
 * @property {Object} arduair.units Units used in the graphs
 * @property {Array} arduair.aqi_colors Colors of every range of the Air Quality index
 * @property {Array} arduair.aqi_ranges Ranges used to calculate te aqi_ranges
 * @property {Array} arduair.line_style Set the default apereance for the lines in the graph
 */
var arduair = {
  /**
   * Data retrieved from server, by default is null, it could store until 5
   * spaces, each data contains at least a name and date properties.
   * @property {String} name The name of the device
   * @property {Array} date Array with date objects
   * @property {Array} locatioKn Array with location coordinates, for now,
   * Arduair doesn't make use of this parameter but you could use it to extends
   * functionalities
   * @property {Array} humidity Array with humidity data, in %
   * @property {Array} temperature Array with temperature data in °C
   * @property {Array} pressure Array with pressure data, in mb // TODO: check units
   * @property {Array} others: others attributes measured, in this categories,
   * can be grouped 'pm10' and 'pm2.5' in mg/m3, and 'CO', 'O3', 'NO2' and 'SO2'
   * in ug/m3
   * @type {Array}
   */
  data: [null],
  normalizedData: [null],
  normalizedDates:[null],
  aqiData: [null],
  units: {
      humidity: '%',
      temperature: '°C',
      pressure: 'mb',
      Location: 'Geo',
      pst: 'mg/m3',
      pm10: 'mg/m3',
      pm25: 'mg/m3',
      so2: 'ug/m3',
      no2: 'ug/m3',
      o3: 'ug/m3',
      co: 'ug/m3',
      ch4: 'ug/m3',
      nh3: 'ug/m3'
  },
  aqi_colors: [
            {
        value: [0, 50],
        color: '00c853' //green
    }, {
        value: [51, 100],
        color: '00c853' //yellow
    }, {
        value: [101, 150],
        color: 'ff9100' //orange
    }, {
        value: [151, 200],
        color: 'd50000' //red
    }, {
        value: [201, 300],
        color: 'd50000' //purple
    }, {
        value: [301, 301],
        color: '4e342e' //maroon
    }, {
        value: [401, 500],
        color: '4e342e' //maroon
    }],
  aqi_ranges: {
      o3_8h: [{
          value: [0, 50],
          range: [0, 0.059]
      }, {
          value: [51, 100],
          range: [0.060, 0.075]
      }, {
          value: [101, 150],
          range: [0.076, 0.095]
      }, {
          value: [151, 200],
          range: [0.096, 0.115]
      }, {
          value: [201, 300],
          range: [0.116, 0.374]
      }, {
          value: [301, 301],
          range: [0.375, 100000]
      }, {
          value: [401, 500],
          range: [0, 0]
      }], //ppm,


      o3_1h: [{
          value: [101, 150],
          range: [0.125, 0.164]
      }, {
          value: [151, 200],
          range: [0.165, 0.204]
      }, {
          value: [201, 300],
          range: [0.205, 0.404]
      }, {
          value: [301, 400],
          range: [0.405, 0.504]
      }, {
          value: [401, 500],
          range: [0.505, 0.604]
      }], //ppm

      pm10_24h: [{
          value: [0, 50],
          range: [0, 54]
      }, {
          value: [51, 100],
          range: [55, 154]
      }, {
          value: [101, 150],
          range: [155, 254]
      }, {
          value: [151, 200],
          range: [255, 354]
      }, {
          value: [201, 300],
          range: [355, 424]
      }, {
          value: [301, 301],
          range: [425, 505]
      }, {
          value: [401, 500],
          range: [505, 604]
      }], //ug/m3

      pm25_24h: [{
          value: [0, 50],
          range: [0, 12]
      }, {
          value: [51, 100],
          range: [12.1, 35.4]
      }, {
          value: [101, 150],
          range: [35.5, 55.4]
      }, {
          value: [151, 200],
          range: [55.5, 150.4]
      }, {
          value: [201, 300],
          range: [150.5, 250.4]
      }, {
          value: [301, 301],
          range: [250.5, 350.4]
      }, {
          value: [401, 500],
          range: [350.5, 500.4]
      }], //ug/m3

      co_8h: [{
          value: [0, 50],
          range: [0, 4.4]
      }, {
          value: [51, 100],
          range: [4.5, 9.4]
      }, {
          value: [101, 150],
          range: [9.5, 12.4]
      }, {
          value: [151, 200],
          range: [12.5, 15.4]
      }, {
          value: [201, 300],
          range: [15.5, 30.4]
      }, {
          value: [301, 301],
          range: [30.5, 40.4]
      }, {
          value: [401, 500],
          range: [40.5, 50.4]
      }],
      so2_24h: [{
          value: [0, 50],
          range: [0, 0.035]
      }, {
          value: [51, 100],
          range: [0.036, 0.075]
      }, {
          value: [101, 150],
          range: [0.076, 0.185]
      }, {
          value: [151, 200],
          range: [0.186, 0.304]
      }, {
          value: [201, 300],
          range: [0.305, 0.604]
      }, {
          value: [301, 301],
          range: [0.605, 0.804]
      }, {
          value: [401, 500],
          range: [0.805, 1.004]
      }],

      no2_1h: [{
          value: [0, 50],
          range: [0, 0.053]
      }, {
          value: [51, 100],
          range: [0.054, 0.100]
      }, {
          value: [101, 150],
          range: [0.101, 0.360]
      }, {
          value: [151, 200],
          range: [0.361, 0.649]
      }, {
          value: [201, 300],
          range: [0.650, 1.249]
      }, {
          value: [301, 301],
          range: [1.249, 1.649]
      }, {
          value: [401, 500],
          range: [1.650, 2.049]
      }]
  },
  line_style: ['#FF1744', '#2980b9', '#2c3e50', '#ffab00', '#00bfa5'],
  line_borders: {
      "so2": [2, 2],
      "pm10": [15, 30],
      "no2": [2, 2],
      "pm25": [2, 2],
      "co": [5, 5],
      "ch4": [15, 5],
      "nh3": [3, 3, 3, 15],
      "default": [0, 1],
  },
  /**
   * Generates the table with devices gotten by a request
   * @param  {Json} res Response object
   */
  generateDeviceList(res) {
      //console.log(res);
      $("#actionBtn-search a").removeClass("sync");
      $("#actionBtn-search a").addClass(res.status);
      Materialize.toast(res.message, 4000, '', () => {
          $("#actionBtn-search a").removeClass(res.status);
      });

      var devices = ''; //this array contains the html of the device list
      if (res.devices.length > 0) {
          res.devices.forEach((item)=>{
            devices+=`
            <li class="collection-item avatar">
              <a href="data/${item.name}">
                <img src="http://www.asocopi.org/images/logo_upb.gif" alt="" class="responsive-img circle">
                <span class="primary-text title">${item.name}</span>
                <p>Owner:${item.owner}</p>
              </a>
            </li>`;
          });
      } else {
        devices +=`
        <div class="col s12 center">
          <p class="error-text">${res.message}</p>
        </div>`;
      }
      $('#deviceCollection').html(devices);
  },
  /**
   * Generates chips for each device loaded
   */
  generateGraphChips(data) {
      var content = ""; //namespace
      var firstNull = data.firstNull(); // how many chips will be created
      for (var i = 0; i < firstNull; i++) {
          var el = data[i];
          content+= `
          <div class="chip page-edit-chip" id="page-edit-chip-${i}">
            ${el.name}<i class="material-icons">close</i>
          </div>`;
      }
      content += `
      <a id="page-graph-add" href="/data" class="btn-floating accent">
        <i class="material-icons">add</i>
      </a>`;
      content += `
      <a id="page-graph-edit" class="btn-floating primary">
        <i class="material-icons">edit</i>
      </a>`;
      content += `
      <a id="page-graph-edit" class="btn-floating primary" style="background-color:#2c3e50!important">
        <i class="material-icons">cloud</i>
      </a>`;

      $('#page-graph-chips').html(content); // PONGO LOS CHIPS EN EL HTML

      if (data.isNull()) $('#page-graph-edit').addClass("disabled"); //ACTIVO O DESACTIVO LOS BOTONES
      if (data.firstNull() === 5) $('#page-graph-add').addClass("disabled");

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

      $(".page-edit-chip i.material-icons").click(function() { //AÑADO LOS CLICKS del boton "clear", para eliminar la entrada
          //console.log($(this));
          var index = $(this).parent().attr("id").replace('page-edit-chip-', '');
          data.splice(index, 1, null);
          arduair.generateGraphMenu(arduair.data,arduair.units,arduair.line_style); //imprimo el menu
          arduair.bindMenuButtonBehavior();
          //arduair.generateGraphChips(arduair.data);
      });

  },
  /**
   * Save a requested data in the correct place of arduair.data
   */
  saveDataRequested(res) {
    var position;
    var name = res.data.name;
    if (res.status === 'done') { //si el resultado es satisfactorio...
      position = selectPosition(arduair.data);
    }
    Materialize.toast(res.message, 2000, '', () => { $("#actionBtn-search a").removeClass(res.status);});
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
  },
  /**
   * Generates a options menu for each data array.
   */
  generateGraphMenu(data,units,colors) {
      data.forEach((el, index) => {
        var ind = index + 1;
        if (el) {
          var content = '';
          content+=`
          <a  class="btn filledGraphDataMaster white-text" style="background-color:${colors[index]}">
            ${el.name}
          </a>`;
          var filteredData=
           _.omit(el,['date','Location','pst','name']);
           _.forIn(filteredData,(val,key)=>{
             var u =units[key];
             content +=`
             <a  class="btn filledGraphData" data-var="${key}" data-units="${u}">
              ${key} ${u}
             </a>`;
           });
          $(`#graph-options-${ind}`).html(content);
        } else {
          $(`#graph-options-${ind}`).html('');
        }
      });
  },
  /**
   * This method organizes into a form appropriate for graphjs.
   * mainly, this method put all dates (X axis of the graph)
   * in one array and organizes all the measures (Y data) consequently
   * @return {Array} Array with the data normalized
   */
  normalizeDeviceData(data) {
    //generate a normalized dates array
    var dateArray = _(data)
      .chain()
      .filter(val => val !== null)
      .map(val => val.date)
      .flatten()
      .sort((date1, date2) => { if (date1 > date2) return 1; if (date1 < date2) return -1; return 0;})
      .sortedUniq()
      .value();
    var normalizedData =checkAndNormalize(data,dateArray);
    //put everything in their place
    return {
      data: normalizedData,
      dates: dateArray
    };
      /**
       * Check all data from dates provided if arduair.data.date
       * contains this date, if true, puts every arduair.data key in the
       * corresponding place of the date checked. it seems to be a very slow
       * function and should be corrected for another better implementation.
       * @param {Date} dates array of dates, mainly concatenated dates from
       * dateArray.sort(dateSort());
       * @return {Array} myArray normalized copy objects from arduair.data
       */
      function checkAndNormalize(data,dates) {
          var myArray = []; //array to return
          data.forEach((val, ind) => { //for each arduair.data
              if (val !== null) { //that isn't null
                  myArray[ind] = {}; //set an empty object
                  for (var k in val) { //with empty array Keys
                      if (k !== "name" && k !== "date") { //(except for the name and dates)
                          myArray[ind][k] = [];
                      } else {
                          if (k === "name") myArray[ind]["name"] = val["name"];
                      }
                  }
                  //then
                  dates.forEach((val2, ind2) => { //forEach date in dates array
                      var place = val.date.indexOf(val2);
                      if (place !== -1) { //if present in a arduair.data[ind].date
                          for (var k in val) { //put the original value in their place
                              if (k !== "name" && k !== "date") {
                                  //console.log("asignar",arduair.data)
                                  myArray[ind][k][ind2] = val[k][place];
                              }
                          }
                      } else { //else
                          for (var i in val) { //put null instead
                              if (i !== "name" && i !== "date") {
                                  //console.log("NO asignar")
                                  myArray[ind][i][ind2] = undefined;

                              }
                          }
                      }
                  });
              } else {
                  myArray[ind] = null;
              }
          });
          return myArray;
      }
  },
  /**
   * This function controls the filledGraphData buttons behavior
   */
  bindMenuButtonBehavior() {
      $('.filledGraphData').unbind('click.namespace').bind('click.namespace', function() {
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
                  var color = arduair.line_style[oIndex];
                  var line = arduair.line_borders[oValue];
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
      });
  },
  /**
   * Calculate the air Quality index from
   * Standar method,
   * NowCast method and
   * InstantCast method
   */
  calculateAQI(obj){
    var result ={};
    //Standar aqi
    result.o3   = arduair.aqiArray(obj.o3,"o3_1h");
    result.co   = arduair.aqiArray(obj.co,"co_8h");
    result.no2  = arduair.aqiArray(obj.no2,"no2_1h");
    result.so2  = arduair.aqiArray(obj.so2,"so2_24h");
    result.pm10 = arduair.aqiArray(obj.pm10,"pm10_24h");
    result.pm25 = arduair.aqiArray(obj.pm25,"pm25_24h");
    //InstantCast
    result.o3_ins   = arduair.aqiArray(obj.o3,"o3_1h");
    result.co_ins   = arduair.aqiArray(obj.co,"co_8h");
    result.no2_ins  = arduair.aqiArray(obj.no2,"no2_1h");
    result.so2_ins  = arduair.aqiArray(obj.so2,"so2_24h");
    result.pm10_ins = arduair.aqiArray(obj.pm10,"pm10_24h");
    result.pm25_ins = arduair.aqiArray(obj.pm25,"pm25_24h");
    //Nowcast
    result.o3_now   = arduair.nowcast(obj.o3,"o3_1h");
    result.co_now   = arduair.nowcast(obj.co,"co_8h");
    result.pm10_now = arduair.nowcast(obj.pm10,"pm10_24h");
    result.pm25_now = arduair.nowcast(obj.pm25,"pm25_24h");
    return result;
  },
  /**
   * Calculates the AQI for the given array of concentrations in the pollutant
   */
  aqiArray(arr,pollutant){
     return arr.map(n=> arduair.aqi(n,pollutant));
  },
  /**
   * Calculates the AQI for the given "c" (concentration) in the "pollutant"
   */
  aqi(c,pollutant){
    var category;
    arduair.aqi_ranges[pollutant].some((item,index)=>  {
      var min =item.range[0];
      var max =item.range[1];
      if (c >= min && c<=max){
        category = index;
        return true;
      }
      return false;
    });
    var Ihi=arduair.aqi_ranges[pollutant][category].value[1];
    var Ilo=arduair.aqi_ranges[pollutant][category].value[0];
    var Bhi=arduair.aqi_ranges[pollutant][category].range[1];
    var Blo=arduair.aqi_ranges[pollutant][category].range[0];
    return  (Ihi-Ilo)/(Bhi-Blo)*(c-Blo)+Ilo;
  },
  /**
   *
   */
  nowcastConcentration(arr,pollutant,datesArr){
    var dates = datesArr.map(val=>moment(val));
    var range = pollutant==="o3"?8:12;

    return arr.map((value,index)=>{
      var w1,w,c1,c2;
      var means= _(arr)
      .groupBy((v,i)=>dates[index].diff(dates[i],'hours'))
      .filter((v,k)=>_.inRange(parseInt(k),range))
      .map(v=>mean(v))
      .value();

      w1 = min(means)/max(means);
      w  = (w1<= 0.5)? 0.5 : w1;

      c1= _(means)
        .map((v,k)=>v*Math.pow(w,k))
        .sum()
        .value();
      c2= _(means)
        .map((v,k)=>Math.pow(w,k))
        .sum()
        .value();

      var c= c1/c2;
      return c;
    });

    // return arr.map((item,index,arr)=>{//for each item in the array
    //   var arrays=[]; //create a temporal array to store te evaluated values
    //   var date=moment(datesArr[index]);//and create a moment.js date
    //
    //   arr.forEach((item)=>{// Iterate the entire array Again
    //     if(item!=undefined){
    //       var hour = (pollutant!=="o3")?12:8;
    //       for(var i=1;i>hour;i++){ //to know where to store it
    //         if(  moment(item).isBetween(date.subtract(i-1, 'hours'),date.subtract(i, 'hours'))  ){
    //           arrays[i].push(arr[i]);// put the concentration in their place
    //         }
    //       }
    //     }//when I finalize the array
    //   });
    //   var ch = arrays.forEach((item)=>{
    //     return mean([item]); //cal
    //   });
    //
    //   var w1 = min(arr)/max(arr);
    //   var w  = (w1<= 0.5)? 0.5 : w1;
    //
    //   var c1 = ch.reduce((ant,act,index)=>{
    //     var k=Math.pow(w, index);
    //     return ant + k*act;
    //   });
    //   var c2 = ch.reduce((ant,act,index)=>{
    //     var k=Math.pow(w, index);
    //     return ant + k;
    //   });
    //   // result concentration
    //   var c= c1/c2;
    //   return c;
    // });
  },
  /**
   *
   */
  nowcastAqi(arr,pollutant,dates){
    var C=arduair.nowcastConcentration(arr,pollutant,dates);
    return arduair.aqiArray(C,pollutant);
  }
};
/*
 * Page.js Routing
 */
page("/", main);
page("/data/:device", pageDataGraph);
page("/data", data);
page("/configure", configure);
page("/add", pageAdd);
page("/debug", pageDebugger);
page();
/**
 * This function hides all tabs and special buttons
 * @function
 * @return {undefined}
 */
function hiding() {
  $("#main").addClass("hide");
  $("#data").addClass("hide");
  $("#configure").addClass("hide");
  $("#documentation").addClass("hide");
  $("#add").addClass("hide");
  $("#debugger").addClass("hide");
  $("#graph").addClass("hide");

  $("#actionBtn-add").addClass("hide");
  $("#actionBtn-configure").addClass("hide");
  $("#actionBtn-search").addClass("hide");
  $("#actionBtn-comment").addClass("hide");

  $('.button-collapse').sideNav('hide');
}
/**
 * Show the main tab
 * @function
 * @return {undefined}
 */
function main() {
  hiding();
  $("#main").removeClass("hide");
}
/**
 * Show configuration tab and configure action button
 * @function
 * @return {undefined}
 */
function configure() {
  hiding();
  $("#configure").removeClass("hide");
  $("#actionBtn-configure").removeClass("hide");
}
/**
 * Show data tab, and do an AJAX request to get every device in the database, it also generates a table with the response
 * @function
 * @return {undefined}
 */
function data() {
  hiding();
  $("#data").removeClass("hide");
  $("#actionBtn-search").removeClass("hide");
  $("#actionBtn-search a").addClass("sync");
  //send AJAX request to get devices data
  $.get('/device', (res) => {
    arduair.generateDeviceList(res);
  });
}
/**
 * Show add tab and add action button
 * @function
 * @return {undefined}
 */
function pageAdd() {
  hiding();
  $("#add").removeClass("hide");
  $("#actionBtn-add").removeClass("hide");
}
/**
 * Show debug tab
 * @function
 * @return {undefined}
 */
function pageDebugger() {
  hiding();
  $("#debugger").removeClass("hide");
}
/**
 * Show graph
 * @function
 * @return {undefined}
 */
function pageDataGraph(ctx) {
  //hide tab
  hiding();
  $('#graph').removeClass("hide");
  var device = ctx.params.device;
  $.get('/device/' + device, (res) => {
    arduair.saveDataRequested(res);
    arduair.generateGraphMenu(arduair.data,arduair.units,arduair.line_style); //imprimo el menu
    arduair.bindMenuButtonBehavior();
    arduair.generateGraphChips(arduair.data);
  });
}
/*////////////////////
//AJAX Forms
////////////////////*/
//add Device Form
$(document).ready(() => { // TODO: check if the arrow function breaks the code
  $('#addform').ajaxForm({
    success: addFormSuccess, //success Callback
    beforeSubmit: formBefore, //Before Submit Callback
    buttonId: "#actionBtn-add button",
    error: formError
  });
  // bind '#config-search-form' and provide a simple callback function
  $('#config-search-form').ajaxForm({
    success: configSearchSuccess, //success Callback
    beforeSubmit: formBefore, //Before Submit Callback
    buttonId: "#actionBtn-configure a",
    error: formError
  });
  //this function is triggered when a addform is sended successful
  function addFormSuccess(res) {
    //res.status= status sended by the server
    //res.message= message sended by the sever, for human reading
    var status = res.status;
    var btn = this.buttonId;
    $(btn).addClass(status);
    $(btn).removeClass("sync");
    Materialize.toast(res.message, 4000, '', () => {
      $(btn).removeClass(status);
    });
  }
  //this function is before send the form, it change the state of button ID.
  function formBefore() {
    //add a sync class before send the form
    $(this.buttonId).addClass("sync");
    //console.log("sending request");
  }
  //when an error happen, a toast is showed, and the state of button is error
  function formError() {
    var btn = this.buttonId;
    $(btn).addClass('error');
    $(btn).removeClass("sync");
    Materialize.toast('error desconocido, intenta de nuevo', 4000, '', () => {
      $(btn).removeClass('error');
    });
  }
  //this function is triggered when a #config-search-form is sended successful
  function configSearchSuccess(res) {
    var status = res.status;
    var btn = this.buttonId;
    $(btn).addClass(status);
    $(btn).removeClass("sync");
    Materialize.toast(res.message, 4000, '', () => {
      $(btn).removeClass(status);
    });
    if (res.status == "done") {
      $('#config-device-founded').slideDown(700);
      if (res.device) {
        $('#config-device-founded-form input').each(function() {
          var atribute = $(this).attr('id').replace("config-", "");
          $(this).attr("value", res.device[atribute]);
        });
        if (res.device.pass) {
          $("#config-wifi").prop('checked', true);
        } else {
          $("#config-wifi").prop('checked', true);
        }
      } else {
        $('#config-device-founded-form input').each(function() {
          $(this).attr("value", "");
        });
        $("#config-wifi").prop('checked', false);
      }
      $('#config-device-founded-form input').each(function() {
        $(this).focus();
      });
    }
  }
});
/*////////////////////
//Other stuff
////////////////////*/
/**
 * Check
 * @return {Boolean} [description]
 */
Array.prototype.isNull = function() {
  return this.join().replace(/,/g, '').length === 0;
};
/**
 * Check if an object of an array contains a name property equals to name parameter
 * @param  {String} name the name value that you want to search
 * @return {Number}      the index of the element found
 */
Array.prototype.checkNewData = function(name) {
  var result = false;
  this.forEach((el, index) => {
    if (el) {
      if (el.name == name) {
        result = index;
      }
    }
  });
  return result;
};
/**
 * return the position of the first nul found
 * @name firstNull
 * @function
 * @memberof Array
 * @return {Number}
 */
Array.prototype.firstNull = function() {
  if (this.indexOf(null) === -1) {
    return this.length;
  } else {
    return this.indexOf(null);
  }
};

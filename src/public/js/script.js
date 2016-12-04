/*global page $, moment _ toastAndRemoveClass generateDeviceCollectionList generateGraphChips generateGraphMenu saveDataRequested*/
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
      o3: [{
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
      }],

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
      "o3": [3, 10, 3, 15],
      "nowcast pm10": [15, 5],
      "nowcast pm2.5": [3, 1, 3, 15],
      "nowcast o3": [3, 10, 3, 15],
      "nowcast co": [10, 3, 10, 15],
      "default": [0, 1],
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
   * Calculates the AQI for the given "c" (concentration) in the "pollutant"
   * if c is an array, returns the an array with the InstantCast aqi values.
   */
      aqi(c, pollutant) {
    if (_.isArray(c)) {
      return c.map(n => computeAqi(n, pollutant));
    } else {
      return computeAqi(c, pollutant);
    }

    function computeAqi(c, pollutant) {

      switch (pollutant) {
        case "instantO3Aqi":
          pollutant="o3";
          break;
        case "instantCoAqi":
        case "co":
          pollutant="co_8h";
          break;
        case "instantPm10Aqi":
        case "pm10":
          pollutant="pm10_24h";
          break;
        case "instantPm25Aqi":
        case "pm2.5":
        case "pm25":
          pollutant="pm25_24h";
          break;
        case "no2":
        case "no2Aqi":
          pollutant="no2_1h";
          break;
        case "so2":
        case "so2Aqi":
          pollutant="so2_24h";
          break;
      }
      var category = arduair.aqi_ranges[pollutant].find(v => _.inRange(c, v.range[0], v.range[1])); //this return the category that I want.
      if (_.isUndefined(category)) {
        console.warn("[concentration] out of range");
        return undefined;//TODO: it should return 0 or 500 in edge cases
      } else {
        var Ihi = category.value[1];
        var Ilo = category.value[0];
        var Bhi = category.range[1];
        var Blo = category.range[0];

        return (Ihi - Ilo) / (Bhi - Blo) * (c - Blo) + Ilo;
      }
    }
  },
  /**
   *
   */
  nowcastAqi(arr,pollutant,dates){
    console.log("ARRAY");
    console.log(arr);
    switch (pollutant) {
      case "nowcastO3Aqi":
        pollutant="o3";
        break;
      case "nowcastCoAqi":
      case "co":
        pollutant="co_8h";
        break;
      case "nowcastPm10Aqi":
        pollutant="pm10_24h";
        break;
      case "nowcastPm25Aqi":
      case "pm2.5":
      case "pm25":
        pollutant="pm25_24h";
        break;
      case "no2":
      case "no2Aqi":
        pollutant="no2_1h";
        break;
      case "so2":
      case "so2Aqi":
        pollutant="so2_24h";
        break;

    }
    var C=nowcastConcentration(arr,pollutant,dates);
    return arduair.aqi(C,pollutant);
    /**
     * Calculates the right concentration for every value in the arr,depending on the dates array
     *
     */
    function nowcastConcentration(arr,pollutant,datesArr){
      //console.log(datesArr)
      var dates = datesArr.map(val=>moment(val));
      var range = pollutant==="o3"?8:12;//TODO: check calculated ranges
      var nowcast= (pollutant==="so2"|| pollutant==="no2")?false:true;
      if (nowcast){
        return arr.map((value,index)=>{
          var w1,w,c1,c2;
          var means= _(arr)
          .groupBy((v,i)=>dates[index].diff(dates[i],'hours'))
          .filter((v,k)=>_.inRange(parseInt(k),range))
          .map(v=>_.mean(v))
          .value();

          w1 = Math.min(means)/Math.max(means);
          w  = (w1<= 0.5)? 0.5 : w1;

          c1= _(means)
            .map((v,k)=>v*Math.pow(w,k))
            .sum();

          c2= _(means)
            .map((v,k)=>Math.pow(w,k))
            .sum();

          var c= c1/c2;
          return c;
        });
      }else{
        //TODO: calculate aqi for NO2 and SO2
      }

    }
  },
  /**
   *
   */
  getColor(index){
    return arduair.line_style[index];
  },
  /**
   *
   */
  getLine(pollutant){
    return arduair.line_borders[pollutant];
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
    $("#actionBtn-search a").removeClass("sync");
    $("#actionBtn-search a").addClass(res.status);
    toastAndRemoveClass(res.message,"#actionBtn-search a",res.status);
    generateDeviceCollectionList(res);
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
    saveDataRequested(res);
    generateGraphMenu(arduair.data,arduair.units); //imprimo el menu
    generateGraphChips(arduair.data);
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
    toastAndRemoveClass(res.message,btn,status);
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
    toastAndRemoveClass("error desconocido, intenta de nuevo",btn,'error');
  }
  //this function is triggered when a #config-search-form is sended successful
  function configSearchSuccess(res) {
    var status = res.status;
    var btn = this.buttonId;
    $(btn).addClass(status);
    $(btn).removeClass("sync");
    toastAndRemoveClass(res.message,btn,status);
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

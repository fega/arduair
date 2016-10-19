/*global page $, Materialize, myChart*/
// DOING: add data combinator function.
// TODO: add AQI calculator function
// DONE: put all functions on arduair prototype
/**
 * Global Object with arduair default configuration and methods
 * @global
 * @property {Array} arduair.data Data retrieved from the server, by default is null
 * @property {Array} arduair.normalizedData A copy of arduair.data after normalization process
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
     * @property {Array} location Array with location coordinates, for now,
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
    aqi_colors: [{
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

            for (var i = 0; i < res.devices.length; i++) {
                devices += '<li class="collection-item avatar">';
                devices += '<a href="data/' + res.devices[i].name + '">';
                devices += ' <img src="http://www.asocopi.org/images/logo_upb.gif" alt="" class="responsive-img circle">';
                devices += '<span class="primary-text title">' + res.devices[i].name + '</span>';
                devices += '<p>Owner:' + res.devices[i].owner + '</p>';
                devices += '<p>Last register:' + res.devices[i].lastRegister + '</p>';
                //devices +='<p>Measure:'+res.devices[i].owner+'</p>';
                //devices +='<p>Last Location:'+res.devices[i].owner+'</p>';
                devices += '</a>';
                devices += '</li>';
            }

        } else {
            devices += '<div class="col s12 center"><p class="error-text">'; //if data is not retrieved
            devices += res.message;
            devices += '</p> </div>';
        }
        $('#deviceCollection').html(devices);
    },
    /**
     * Generates chips for each device loaded
     */
    generateGraphChips() {
        var content = ""; //namespace
        var firstNull = arduair.data.firstNull(); // how many chips will be created
        for (var i = 0; i < firstNull; i++) {
            var el = arduair.data[i];
            content += '<div class="chip page-edit-chip" id="page-edit-chip-' + i + '">' + el.name + '<i class="material-icons">close</i></div>';
        }
        content += '<a id="page-graph-add" href="/data" class="btn-floating accent"><i class="material-icons">add</i></a>';
        content += '<a id="page-graph-edit" class="btn-floating primary"><i class="material-icons">edit</i></a>';

        $('#page-graph-chips').html(content); // PONGO LOS CHIPS EN EL HTML

        if (arduair.data.isNull()) $('#page-graph-edit').addClass("disabled"); //ACTIVO O DESACTIVO LOS BOTONES
        if (arduair.data.firstNull() === 5) $('#page-graph-add').addClass("disabled");

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
            arduair.data.splice(index, 1, null);
            arduair.generateGraphMenu(); //imprimo el menu
            arduair.bindMenuButtonBehavior();
            //arduair.generateGraphChips();
        });

    },
    /**
     * Save a requested data in the correct place of arduair.data
     */
    saveDataRequested(res) {
        var position = false;
        var name = res.data.name;
        if (res.status === 'error') { // si el resultado es un error, imprimo el error
            Materialize.toast(res.message, 4000, '', () => {
                $("#actionBtn-search a").removeClass(res.status);
            });
        }
        if (res.status === 'done') { //si el resultado es satisfactorio...
            if (arduair.data.isNull()) { //.. si todo el array  del cliente es null, imprimo en la posicion 0
                position = 0;
                //console.log("todo el array es null");
            } else { // si no, busco una posicion nula para imprimir
                position = arduair.data.checkNewData(name);
                //console.log("CheckNewData retornando" + position);
                if (position === false || position === null || position === undefined) {
                    position = arduair.data.firstNull();
                    //console.log("no hay data con ese nombre, poniendo la data en:" + position);
                }
                if (position === -1) { // ni no la hay imprimo en el ultimo lugar
                    position = 4;
                    //console.log("Data full, sobre escribiendo 4");
                }
                if (position >= 0) {
                    //console.log("poniendo la data en :" + position);
                }
            }
        }
        Materialize.toast(res.message, 4000, '', () => {
            $("#actionBtn-search a").removeClass(res.status);
        }); //le aviso al usuario que paso
        arduair.data[position] = res.data; //ubico el array recibido en el array
        var normalized = arduair.normalizeData();
        arduair.normalizedData=normalized.data;
        arduair.normalizedDates=normalized.dates;
    },
    /**
     * Generates a options menu for each data array.
     */
    generateGraphMenu() {
        arduair.data.forEach((el, index) => {
            var ind = index + 1;
            if (el) {
                var content = "";
                content += '<a  class="btn filledGraphDataMaster white-text" style="background-color:' + arduair.line_style[index] + ';">' + el.name + '</a>';
                for (var i in arduair.data[index]) {
                    if (i == 'date' || i == 'Location' || i == 'pst' || i == 'name');
                    else {
                        var units = arduair.units[i];
                        //console.log(units);
                        content += '<a  class="btn filledGraphData" data-var="' + i + '" data-units="' + units + '">' + i + ' ' + units + '</a>';
                    }
                }

                $('#graph-options-' + ind).html(content);
                //console.log("remplazado en: " + ind);
            } else {
                $('#graph-options-' + ind).html("");
            }
        });
    },
    /**
     * This method organizes into a form appropriate for graphjs.
     * mainly, this method put all dates (X axis of the graph)
     * in one array and organizes all the measures (Y data) consequently
     * @return {Array} Array with the data normalized
     */
    normalizeData() {
        // 1) concat arrays
        var dateArray = dateConcat();
        // 2) sort array
        dateArray.sort(dateSort());
        // 3) delete duplicates
        dateArray = removeDuplicate(dateArray);
        // 4) put everything in their place
        return {
          data: checkAndNormalize(dateArray),
          dates: dateArray
        };
        /**
         * Sorting date function comparator from https://gist.github.com/onpubcom/1772996
         * @param  {Date} date1 First date object to compare
         * @param  {Date} date2 Second date object to compare
         * @return {Number} Comparison Returns Comparison result.
         */
        function dateSort(date1, date2) {
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
        }
        /**
         * Concat each arduair.data.date
         * @return {Array} Concatenated_Dates concatenated dates array
         */
        function dateConcat() {
            var myArray = [];
            arduair.data.forEach((val) => {
                if (val !== null) {
                    myArray = myArray.concat(val.date);
                }
            });
            return myArray;
        }
        /**
         * Check all data from dates provided if arduair.data.date
         * contains this date, if true, puts every arduair.data key in the
         * corresponding place of the date checked. it seems to be a very slow
         * function and should be corrected for another better implementation.
         * @param {Date} dates array of dates, mainly concatenated dates from
         * dateArray.sort(dateSort());
         * @return {Array} myArray normalized copy objects from arduair.data
         */
        function checkAndNormalize(dates) {
            var myArray = []; //array to return
            arduair.data.forEach((val, ind) => { //for each arduair.data
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
        /**
         * Remove duplicates in an array
         * @param  {Array} arr Array to remove their duplicates
         * @return {Array}     Array without duplicates
         */
        function removeDuplicate(arr) {
            return Array.from(new Set(arr));
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
    updateChart() {

    }
};
/*
 * Page.js Routing
 */
page("/", main);
page("/data/:device", pageDataGraph);
page("/data", data);
page("/configure", configure);
page("/documentation", documentation);
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
 * Show documentation tab and comment action button
 * @function
 * @return {undefined}
 */
function documentation() {
    hiding();
    $("#documentation").removeClass("hide");
    $("#actionBtn-comment").removeClass("hide");
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
        arduair.generateGraphMenu(); //imprimo el menu
        arduair.bindMenuButtonBehavior();
        arduair.generateGraphChips();
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
    arduair.data.forEach((el, index) => {
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
    if (arduair.data.indexOf(null) === -1) {
        return arduair.data.length;
    } else {
        return arduair.data.indexOf(null);
    }
};

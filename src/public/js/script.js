/*global page $, Materialize*/
// TODO: add data combinator function.
// TODO: add AQI calculator function
// TODO: put all functions on arduair prototype
/**
 * La variable global Arduair guarda la configuracion del cliente.
 *   arduair.data <Array>: Guarda los datos de los dispositivos para su
 *   posterior uso, su valor inicial es [null]
 *   arduair.units: unidades de los dispositivos por defecto.
 *   aqi_colors <Array>: array de objetos con los colores de cada etapa del Air Quality Index.
 *   aqi_ranges <array>: array de objetos, donde estan los valores de concentracion del AQI.
 * @type {Object}
 */
var arduair={
  data: [null],
  units:{
    humidity:'%',
    temperature:'°C',
    pressure:'mb',
    Location:'Geo',
    pst:    'mg/m3',
    pm10:   'mg/m3',
    pm25:   'mg/m3',
    so2:    'ug/m3',
    no2:    'ug/m3',
    o3:     'ug/m3',
    co:     'ug/m3',
    ch4:    'ug/m3',
    nh3:    'ug/m3'
  },
  activeGraph:[{}],

  line_colors:[{}],

  aqi_colors:[{
      value: [0,50],
      color: '00c853'//green
    },{
      value: [51,100],
      color: '00c853'//yellow
    },{
      value: [101,150],
      color: 'ff9100'//orange
    },{
      value: [151,200],
      color: 'd50000'//red
    },{
      value: [201,300],
      color: 'd50000'//purple
    },{
      value: [301,301],
      color: '4e342e'//maroon
    },{
      value: [401,500],
      color: '4e342e'//maroon
   }],

  aqi_ranges:{
    o3_8h:[{
      value: [0,50],
      range: [0,0.059]
    },{
      value: [51,100],
      range: [0.060,0.075]
    },{
      value: [101,150],
      range: [0.076,0.095]
    },{
      value: [151,200],
      range: [0.096,0.115]
    },{
      value: [201,300],
      range: [0.116,0.374]
    },{
      value: [301,301],
      range: [0.375,100000]
    },{
      value: [401,500],
      range: [0,0]
    }], //ppm,


    o3_1h:[{
      value: [101,150],
      range: [0.125,0.164]
    },{
      value: [151,200],
      range: [0.165,0.204]
    },{
      value: [201,300],
      range: [0.205,0.404]
    },{
      value: [301,400],
      range: [0.405,0.504]
    },{
      value: [401,500],
      range: [0.505,0.604]
    }], //ppm

    pm10_24h:[{
      value: [0,50],
      range: [0,54]
    },{
      value: [51,100],
      range: [55,154]
    },{
      value: [101,150],
      range: [155,254]
    },{
      value: [151,200],
      range: [255,354]
    },{
      value: [201,300],
      range: [355,424]
    },{
      value: [301,301],
      range: [425,505]
    },{
      value: [401,500],
      range: [505,604]
    }], //ug/m3

    pm25_24h:[{
      value: [0,50],
      range: [0,12]
    },{
      value: [51,100],
      range: [12.1,35.4]
    },{
      value: [101,150],
      range: [35.5,55.4]
    },{
      value: [151,200],
      range: [55.5,150.4]
    },{
      value: [201,300],
      range: [150.5,250.4]
    },{
      value: [301,301],
      range: [250.5,350.4]
    },{
      value: [401,500],
      range: [350.5,500.4]
    }], //ug/m3

    co_8h:[{
      value: [0,50],
      range: [0,4.4]
    },{
      value: [51,100],
      range: [4.5,9.4]
    },{
      value: [101,150],
      range: [9.5,12.4]
    },{
      value: [151,200],
      range: [12.5,15.4]
    },{
      value: [201,300],
      range: [15.5,30.4]
    },{
      value: [301,301],
      range: [30.5,40.4]
    },{
      value: [401,500],
      range: [40.5,50.4]
    }],
    so2_24h:[{
      value: [0,50],
      range: [0,0.035]
    },{
      value: [51,100],
      range: [0.036,0.075]
    },{
      value: [101,150],
      range: [0.076,0.185]
    },{
      value: [151,200],
      range: [0.186,0.304]
    },{
      value: [201,300],
      range: [0.305,0.604]
    },{
      value: [301,301],
      range: [0.605,0.804]
    },{
      value: [401,500],
      range: [0.805,1.004]
    }],

    no2_1h:[{
      value: [0,50],
      range: [0,0.053]
    },{
      value: [51,100],
      range: [0.054,0.100]
    },{
      value: [101,150],
      range: [0.101,0.360]
    },{
      value: [151,200],
      range: [0.361,0.649]
    },{
      value: [201,300],
      range: [0.650,1.249]
    },{
      value: [301,301],
      range: [1.249,1.649]
    },{
      value: [401,500],
      range: [1.650,2.049]
    }]
  }
};
//arduair.prototype.ica=function(val,cont,time){ //value, contaminant, time
//}
/*////////////////////
//page.js config
//page("ruta",callback)
////////////////////*/
page("/",main);
page("/data/:device",pageDataGraph);
page("/data",data);
page("/configure",configure);
page("/documentation",documentation);
page("/documentation/:article",getArticle);
page("/add",pageAdd);
page("/debug",pageDebugger);
page("/about",pageAbout);
page();
/*////////////////////
//Routing functions
////////////////////*/
//funcion que oculta todas las pestañas
function hidding(){
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
//funcion de mostrar la pestaña main
function main(){
  hidding();
  $("#main").removeClass("hide");
}
//funcion para mostrar la pestaña configure
function configure(){
  hidding();
  $("#configure").removeClass("hide");
  $("#actionBtn-configure").removeClass("hide");
}
//funcion para mostrar la pestaña documentation
function documentation(){
  hidding();
  $("#documentation").removeClass("hide");
  $("#actionBtn-comment").removeClass("hide");
}
//funcion para mostrar la pestaña data
function data(){
  hidding();
  $("#data").removeClass("hide");
  $("#actionBtn-search").removeClass("hide");
  $("#actionBtn-search a").addClass("sync");
  //send AJAX request to get devices data
  $.get('/device', function(res){
    console.log(res);
    $("#actionBtn-search a").removeClass("sync");
    $("#actionBtn-search a").addClass(res.status);
    Materialize.toast(res.message, 4000,'',function(){$("#actionBtn-search a").removeClass(res.status);});

    var devices='';//this array contains the html of the device list
    if (res.devices.length>0){

      for(var i=0; i<res.devices.length;i++){
        devices +='<li class="collection-item avatar">';
        devices +='<a href="data/'+res.devices[i].name+'">';
        devices +=' <img src="http://www.asocopi.org/images/logo_upb.gif" alt="" class="responsive-img circle">';
        devices +='<span class="primary-text title">'+res.devices[i].name+'</span>';
        devices +='<p>Owner:'+res.devices[i].owner+'</p>';
        devices +='<p>Last register:'+res.devices[i].lastRegister+'</p>';
        //devices +='<p>Measure:'+res.devices[i].owner+'</p>';
        //devices +='<p>Last Location:'+res.devices[i].owner+'</p>';
        devices+='</a>';
        devices+='</li>';
      }

    }else{
      devices +='<div class="col s12 center"><p class="error-text">';//if data is not retrieved
      devices+=res.message;
      devices+='</p> </div>';
    }
    $('#deviceCollection').html(devices);
  });
}
//funcion para mostrar la pestaña /documentation/:article
function getArticle(res){
  hidding();
  $("#documentation").removeClass("hide");
  var article = res.params.article;
  $.get( "/documentation/"+article,function(res){
    $('#documentation-content').html(res);
    resizeDocIndex();
  });
}
//funcion para mostrar la pestaña /add
function pageAdd(res){
  hidding();
  $("#add").removeClass("hide");
  $("#actionBtn-add").removeClass("hide");
}
//funcion para mostrar la pagina /debug
function pageDebugger(){
  hidding();
  $("#debugger").removeClass("hide");
}
//funcion para mostrar la pagina /about
function pageAbout(){
}
//funcion para mostrar la pagina /graph
function pageDataGraph(ctx){
	//hide tab
	hidding();
	$('#graph').removeClass("hide");
  dataGraphRequest(ctx.params.device);
}
/*////////////////////
//AJAX Forms
////////////////////*/
//add Device Form
$(document).ready(function() {
  // bind 'addForm' and provide a simple callback function
  $('#addform').ajaxForm({
    success: formSuccess,    //success Callback
    beforeSubmit: formBefore, //Before Submit Callback
    buttonId:"#actionBtn-add button",
    error: formError
  });
  // bind '#config-search-form' and provide a simple callback function
  $('#config-search-form').ajaxForm({
    success: configSearchSuccess,    //success Callback
    beforeSubmit: formBefore, //Before Submit Callback
    buttonId:"#actionBtn-configure a",
    error: formError
  });
  //this function is triggered when a addform is sended successful
  function formSuccess(res){
    //res.status= status sended by the server
    //res.message= message sended by the sever, for human reading
    var status =res.status;
    var btn=this.buttonId;
    $(btn).addClass(status);
    $(btn).removeClass("sync");
    Materialize.toast(res.message, 4000,'',function(){$(btn).removeClass(status);});
  }
  //this function is before send the form, it change the state of button ID.
  function formBefore(){
    //add a sync class before send the form
    $(this.buttonId).addClass("sync");
    console.log("sending request");
  }
  //when an error happen, a toast is showed, and the state of button is error
  function formError(){
    var btn=this.buttonId;
    $(btn).addClass('error');
    $(btn).removeClass("sync");
    Materialize.toast('error desconocido, intenta de nuevo', 4000,'',function(){$(btn).removeClass('error');});
  }
  //this function is triggered when a #config-search-form is sended successful
  function configSearchSuccess(res){
    var status =res.status;
    var btn=this.buttonId;
    $(btn).addClass(status);
    $(btn).removeClass("sync");
    Materialize.toast(res.message, 4000,'',function(){$(btn).removeClass(status);});

    if (res.status=="done"){
      $('#config-device-founded').slideDown(700);
    }
  }
});

/*////////////////////
//CHART
////////////////////*/
var chartctx = $("#chart");
var chartData =[0];
var myChart = new Chart(chartctx, {
  type: 'line',
  data: {
    labels: [0],
    datasets: [{
      label: '0',
      data: chartData
    }]
  },
  options: {
    defaultColor:'#FF1744',
    scales: {
      type:'time',
      xAxes: [{
        type:"time"
      }]
    }
  }
});
myChart.update();
//to update the points use:
//myChart.data.datasets[0].data
//myLineChart.update();

/*////////////////////
//Other stuff
////////////////////*/
//resize documentation index, to obtain  better appereance
function resizeDocIndex(){
  var h= $("#documentation-content").height();
  $('#documentation-index').css({minHeight: h});
  //$('#page-graph-edit-menu').width($('#page-graph-edit-menu').parent().width());
}
$( window ).resize(resizeDocIndex());
//search data buttons
$('#actionBtn-search').click(function(){     $('#modalSearch').openModal();});
$('#actionBtn-SearchClose').click(function(){$('#modalSearch').closeModal();});
//GENERATE A CONFIG-FILE?
$("#config-file-btn").click(function(){
  $("#config-file").slideDown(500);
  $(this).addClass('hide');
  $("#no-config-file-btn").removeClass('hide');
});
$("#no-config-file-btn").click(function(){
  $("#config-file").slideUp(500);
  $(this).addClass('hide');
  $("#config-file-btn").removeClass('hide');
});
function checkDataName(until,name){
  var result=true
  for (var i=0; i<until;i++){
    if (arduair.data[i].name==name){
      result= false;
    }
  }
  return result;
}
function printMenuGraph(index){

  arduair.data.forEach(function(el,index){
    ind=index+1;
    if(el){
      var content="";
      content+= '<a  class="btn filledGraphData white-text" style="background-color:'+Lines[index].borderColor+';">'+el.name+'</a>';
      for ( var i in arduair.data[index]){
        if(i=='date' || i=='Location' || i=='pst' || i=='name'){
         }else{
          var units= arduair.units[i];
          console.log(units)
          content+= '<a  class="btn filledGraphData" data-var="'+i+'" data-units="'+units+'">'+i +' '+units+'</a>';
        }
      }

    $('#graph-options-'+ ind ).html(content);
    console.log("remplazado en: "+ind)
    }else{
      $('#graph-options-'+ ind ).html("");
    }
  })
  //$('#page-graph-edit-menu').width($('#page-graph-edit-menu').parent().width());
}
function dataGraphRequest(device){
  var position= false
  //console.log("dataGraph:"+position)
  var pos=-1;
  $.get('/device/'+ device,function(res){
  	//console.log("IMPRIMIR:");
  	//console.log(arduair.data);

   var name=res.data.name
      	if(res.status==='error'){// si el resultado es un error, imprimo el error
      		Materialize.toast(res.message, 4000,'',function(){$("#actionBtn-search a").removeClass(res.status);});
      	}
      	if(res.status==='done'){//si el resultado es satisfactorio...
      		if(arduair.data.isNull()){//.. si todo el array  del cliente es null, imprimo en la posicion 0
      			position=0;
      			console.log("todo el array es null");
      		}else{// si no, busco una posicion nula para imprimir
      			position=arduair.data.checkNewData(name)
      			console.log("CheckNewData retornando"+position)
      			if(position===false || position===null || position===undefined){
      				position= arduair.data.firstNull();
      				console.log("no hay data con ese nombre, poniendo la data en:"+position);
      			}
      			if(position=== -1){// ni no la hay imprimo en el ultimo lugar
      				position=4;
      				console.log("Data full, sobre escribiendo 4");
      			}
      			if (position>=0){
      				console.log("poniendo la data en :"+position);
      			}
      		}
      	}

      Materialize.toast(res.message, 4000,'',function(){$("#actionBtn-search a").removeClass(res.status);});//le aviso al usuario que paso
      arduair.data[position]=res.data;//ubico el array recibido en el array
      printMenuGraph(position); //imprimo el menu
      bindFilledGraphData();
      GraphChips();
    })
}
function bindFilledGraphData(){
  $('.filledGraphData').unbind('click.namespace').bind('click.namespace',function(){
    var main =$(this)
    var units=main.data("units");
    var value=main.data("var");
    var index=main.parent().attr("id").replace("graph-options-","")-1;
    var data = []

    if ($(this).hasClass("active"))     $(this).removeClass("active");// si esta activo lo desactivo
    else                                $(this).addClass("active"); //si no:

    $(".filledGraphData").each(function(){//por cada boton filledGraphData
        var other=$(this);
        var oUnits=other.data("units");
        var oValue=other.data("var");
        var oIndex=other.parent().attr("id").replace("graph-options-","")-1;
        console.log(oIndex);

        if (oUnits===units){ //que tenga las mismas unidades
          other.removeClass("disabled"); //lo dejo disponible
          if(oValue===value && index!==oIndex && main.hasClass("active")){//si ademas tiene el mismo tipo de valor
            other.addClass("active");// lo activo y añado a la gradica
          }
        }else{//si no tiene las mismas unidades
          other.addClass("disabled");//lo desactivo y elimino la clase activo
          other.removeClass("active");
        }


        //despues de todo esto:
        if (other.hasClass("active")){
          var color;
          var line;
          switch(oIndex) {//elijo el  color de la linea
            case 0:  color="#FF1744"; break;
            case 1:  color="#2980b9"; break;
            case 2:  color="#2c3e50"; break;
            case 3:  color="#ffab00"; break;
            case 4:  color="#00bfa5"; break;
            default: color="#FF1744";
          }
          switch(oValue) {//elijo el  color de la linea
            case "so2":   line=[2,2]; break;
            case "pm10":  line=[15,30]; break;
            case "no2":   line=[2,2]; break;
            case "pm25":  line=[2,2]; break;
            case "co":    line=[5,5]; break;
            case "ch4":   line=[15,5]; break;
            case "nh3":   line=[3,3,3,15]; break;
            default: line=[1,0];
          }


          data.push({
            data:arduair.data[oIndex][oValue],
            label:oValue,
            borderColor: color,
            borderDash:line
          });
        }
        myChart.data.datasets=data;
        myChart.data.labels=arduair.data[oIndex].date;
        myChart.update(100);
      })
  })
}
function GraphChips(){
  var content="";//GENERO LOS CHIPS
  var firstNull=arduair.data.firstNull();
  var i=0;
  for (i ; i<firstNull ; i++){
    var el=arduair.data[i];
    content+='<div class="chip page-edit-chip" id="page-edit-chip-'+i+'">'+el.name+'<i class="material-icons">close</i></div>';
  }

  content+='<a id="page-graph-add" href="/data" class="btn-floating accent"><i class="material-icons">add</i></a>'
  content+='<a id="page-graph-edit" class="btn-floating primary"><i class="material-icons">edit</i></a>'

  $('#page-graph-chips').html(content)// PONGO LOS CHIPS EN EL HTML

  if (arduair.data.isNull())  $('#page-graph-edit').addClass("disabled");//ACTIVO O DESACTIVO LOS BOTONES
  if (arduair.data.firstNull()===5) $('#page-graph-add').addClass("disabled");

  $('#page-graph-edit').click(function(){//AÑADO LOS CLICKS del boton de edicion
    var menu=$("#page-graph-edit-menu");
    if (menu.hasClass("active")){
      menu.removeClass("active");
      menu.slideUp();
    }else{
      menu.addClass("active");
      menu.slideDown();
    }
  });

  $(".page-edit-chip i.material-icons").click(function(){//AÑADO LOS CLICKS del boton "clear", para eliminar la entrada
    console.log("WHA HAPEN?")
    var index = $(this).parent().attr("id").replace('page-edit-chip-','');
    arduair.data.splice(index,1,null);

    printMenuGraph(); //imprimo el menu
    bindFilledGraphData();
    GraphChips();
  })
}

//funcion que checkea si array is null
Array.prototype.isNull = function (){
  return this.join().replace(/,/g,'').length === 0;
};
//funcion que checkea si los datos con cierto nombre ya se han añadido
Array.prototype.checkNewData = function(name){
  var result=false;
  arduair.data.forEach(function(el,index){
   if(el){
    if(el.name==name){
      result=index;
    }
  }
});
  return result;
};
//funcion que devuelve el index del primer nulo
Array.prototype.firstNull = function(){
  return arduair.data.indexOf(null);
};

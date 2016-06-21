var arduair={
  data: [null,null,null,null,null],
  units:{
    humidity:"%",
    temperature:"°C",
    pressure:"mb",
    Location:"Geo",
    pst:    "mg/m3",
    pm10:   "mg/m3",
    pm25:   "mg/m3",
    so2:    "ug/m3",
    no2:    "ug/m3",
    o3:     "ug/m3",
    co:     "ug/m3",
    ch4:    "ug/m3",
    nh3:    "ug/m3",
  },
  activeGraph:[{

  }]
}

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
function main(){
  hidding();
  $("#main").removeClass("hide");
}
function configure(){
  hidding();
  $("#configure").removeClass("hide");
  $("#actionBtn-configure").removeClass("hide");
}
function documentation(){
  hidding();
  $("#documentation").removeClass("hide");
  $("#actionBtn-comment").removeClass("hide");
}
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
function getArticle(res){
  hidding();
  $("#documentation").removeClass("hide");
  var article = res.params.article;
  $.get( "/documentation/"+article,function(res){
    $('#documentation-content').html(res);
    resizeDocIndex();
  });
}
function pageAdd(res){
  hidding();
  $("#add").removeClass("hide");
  $("#actionBtn-add").removeClass("hide");
}
function pageDebugger(){
  hidding();
  $("#debugger").removeClass("hide");
}
function pageAbout(){
}
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
  $('#config-search-form').ajaxForm({
    success: configSearchSuccess,    //success Callback
    beforeSubmit: formBefore, //Before Submit Callback
    buttonId:"#actionBtn-configure a",
    error: formError
  }); 
});
function formSuccess(res){
  //res.status= status sended by the server
  //res.message= message sended by the sever, for human reading
  var status =res.status;
  var btn=this.buttonId;
  $(btn).addClass(status);
  $(btn).removeClass("sync");
  Materialize.toast(res.message, 4000,'',function(){$(btn).removeClass(status);});
}
function formBefore(){
  //add a sync class before send the form
  $(this.buttonId).addClass("sync");
  console.log("sending request");
}
function formError(){
  var btn=this.buttonId;
  $(btn).addClass('error');
  $(btn).removeClass("sync");
  Materialize.toast('error desconocido, intenta de nuevo', 4000,'',function(){$(btn).removeClass('error');});
}
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
  $('#page-graph-edit-menu').width($('#page-graph-edit-menu').parent().width());
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
  $('#page-graph-edit-menu').width($('#page-graph-edit-menu').parent().width());
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

Array.prototype.checkNewData = function(name){
  var result=false;
  arduair.data.forEach(function(el,index){
   if(el){
    if(el.name==name){
      result=index;
    }
  }
})
  return result;
}
Array.prototype.firstNull = function(){
  return arduair.data.indexOf(null);
}
var arduair={
  data: [null,null,null,null,null]
  units:[]
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
	var content=""; 
	console.log("printMenuGraph: "+index)
	for ( var i in arduair.data[index]){
		if(i=='date' || i=='Location' || i=='pst' || i=='name'){  
		}else{
			content+= '<a href="#" class="btn filledGraphData" >'+i+'</a>';
		}
	}
	index++;
	$('#graph-btn-'+ index ).slideUp(0);
	$('#graph-options-'+ index ).html(content);
	$('#graph-edit-btn-'+ index ).slideDown(400);
	$('#graph-options-'+ index ).slideDown(400);
}
function printChartGraph(index){
	var data=arduair.data[index];

	Lines[0].data=data.humidity;
	Lines[0].label='humidity';
	Lines[1].data=data.pressure;
	Lines[1].label='pressure';
	Lines[2].data=data.temperature;
	Lines[2].label='temperature';
	Lines[3].data=data.pst;
	Lines[3].label='pst';
	Lines[4].data=data.so2;
	Lines[4].label='so2';
	Lines[5].data=data.co;
	Lines[5].label='co';
	Lines[6].data=data.nh3;
	Lines[6].label='nh3';
	Lines[7].data=data.ch4;
	Lines[7].label='ch4';
	myChart.data.datasets[0]=Lines[0];
	myChart.data.datasets[1]=Lines[1];
	myChart.data.datasets[2]=Lines[2];
	myChart.data.datasets[3]=Lines[3];
	myChart.data.datasets[4]=Lines[4];
	myChart.data.datasets[5]=Lines[5];
	myChart.data.datasets[6]=Lines[6];
	myChart.data.datasets[7]=Lines[7];
	myChart.data.labels=data.date;
	myChart.update();
}


function dataGraphRequest(device){
	var position= false
	console.log("dataGraph:"+position)
	var pos=-1;
	$.get('/device/'+ device,function(res){
		console.log("IMPRIMIR:");
		console.log(arduair.data);

		var name=res.data.name
		if(res.status==='error'){
			Materialize.toast(res.message, 4000,'',function(){$("#actionBtn-search a").removeClass(res.status);});
		}
		if(res.status==='done'){
			if(arduair.data.isNull()){
				position=0;
				console.log("HEY: todo el array es null");
			}else{
				position=arduair.data.checkNewData(name)
				console.log("CheckNewData retornando"+position)
				if(position===false || position===null || position===undefined){
					position= arduair.data.firstNull();
					console.log("no hay data con ese nombre, poniendo la data en:"+position);
				}
				if(position=== -1){
					position=4;
					console.log("Data full, sobre escribiendo 4");
				}
				if (position>=0){
					
					console.log("poniendo la data en :"+position);
					
				}
				
			}
		}
	
	
	Materialize.toast(res.message, 4000,'',function(){$("#actionBtn-search a").removeClass(res.status);});
	arduair.data[position]=res.data;
	printMenuGraph(position);
	printChartGraph(position);
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
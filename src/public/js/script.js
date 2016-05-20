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
  hidding();
  $('#graph').removeClass("hide");

  $.get('/device/'+ ctx.params.device,function(res){
    var status=res.status;
    var message=res.message;
    var data=res.data;
    if(status=='done'){
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
      // myChart.data.datasets[1]
      // myChart.data.datasets[2].data=data.pressure;
      // myChart.data.datasets[3].data=data.pst;
      // myChart.data.datasets[4].data=data.pm10;
      // myChart.data.datasets[5].data=data.pm25;
      // myChart.data.datasets[6].data=data.so2;
      // myChart.data.datasets[7].data=data.no2;
      // myChart.data.datasets[8].data=data.o3;
      // myChart.data.datasets[9].data=data.co;
      // myChart.data.datasets[10].data=data.ch4;
      // myChart.data.datasets[11].data=data.nh3;
      myChart.update();
    }
    if (status=='error')
    //string=JSON.stringify(data)
    //$('#graph-row').html(string);
    Materialize.toast(message, 4000,'',function(){$("#actionBtn-search a").removeClass(status);});
  });
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
var chartData =[12, 19,5 , 5, 2, 3];
var myChart = new Chart(chartctx, {
  type: 'line',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
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
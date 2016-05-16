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
    $("#actionBtn-add").addClass("hide");
    $("#actionBtn-configure").addClass("hide");
    $("#actionBtn-search").addClass("hide");
    $("#actionBtn-comment").addClass("hide");
    $("#add").addClass("hide");
    $("#debugger").addClass("hide");
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
          devices +='<a href="'+res.devices[i].name+'">';
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
function pageDataGraph(){  
}
/*////////////////////
//AJAX Forms
////////////////////*/
//add Device Form
$(document).ready(function() { 
    // bind 'addForm' and provide a simple callback function 
    $('#addform').ajaxForm({
      success: addSuccess,    //success Callback
      beforeSubmit: addBefore //Before Submit Callback
    }); 
});
function addSuccess(res){
  //res.status= status sended by the server
  //res.message= message sended by the sever, for human reading
  var status =res.status;
  $("#actionBtn-add button").addClass(status);
  $("#actionBtn-add button").removeClass("sync");
  Materialize.toast(res.message, 4000,'',function(){$("#actionBtn-add button").removeClass(status);});
}
function addBefore(){
  //add a sync class before send the form
  $("#actionBtn-add button").addClass("sync");
}
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
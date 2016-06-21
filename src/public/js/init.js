/*///////////////////////////////////////
MaterializeCSS initialization
///////////////////////////////////////*/
(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('select').material_select();
    $('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 // Creates a dropdown of 15 years to control year
  	});
  }); // end of document ready
})(jQuery); // end of jQuery name space
/*///////////////////////////////////////
ChartJS Global Configuration
///////////////////////////////////////*/
Chart.defaults.global.defaultColor='rgba(255, 255, 255, 0)';
Chart.defaults.global.defaultFontColor='#2c3e50';
Chart.defaults.global.elements.line.fill=false;
Chart.defaults.global.elements.line.borderWidth=1;
Chart.defaults.global.elements.line.backgroundColor='rgba(255, 255, 255, 1)';
Chart.defaults.global.elements.line.borderColor='#FF1744';
Chart.defaults.global.elements.point.backgroundColor='rgba(255, 255, 255, 0.1)';
Chart.defaults.global.elements.point.radius=4;
Chart.defaults.global.elements.point.borderColor='#FF1744';
//Array lines: contain data. defaults of chat
var Lines=[{
  label: '',
  data: [],
},{
  //backgroundColor:'#2980b9',
  borderColor:'#2980b9',
  borderDash:[5,5]
},{
  //backgroundColor:'#2980b9',
  borderColor:'#2980b9',
  borderDash:[15,30]
},{
  //backgroundColor:'#2980b9',
  borderColor:'#2980b9',
  borderDash:[15,5]
},{
  //backgroundColor:'#2980b9',
  borderColor:'#2980b9',
  borderDash:[2,2]
},{
  //backgroundColor:'#2980b9',
  borderColor:'#2980b9',
  borderDash:[3,3,3,15]
},{
  //backgroundColor:'#2980b9',
  borderColor:'#2980b9'
},{
  //backgroundColor:'#2980b9',
  borderColor:'#2980b9'
}];
/*colors:
borderColor:'#2980b9'
borderColor:'#2c3e50'
borderColor:'#ffab00'
borderColor:'#00bfa5'
borderColor:'#6200ea'
borderColor:'#8d6e63'
orderColor:'#64dd17 '



*/
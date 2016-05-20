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
Chart.defaults.global.defaultColor='#FF1744';
Chart.defaults.global.defaultFontColor='#2c3e50';
Chart.defaults.global.elements.line.fill=false;
Chart.defaults.global.elements.line.backgroundColor='rgba(255, 23, 68, 0.1)';
Chart.defaults.global.elements.line.borderColor='#FF1744';
Chart.defaults.global.elements.point.backgroundColor='rgba(255, 23, 68, 0.1)';
Chart.defaults.global.elements.point.radius=4;
Chart.defaults.global.elements.point.borderColor='#FF1744';
//Array lines: contain data. defaults of chat
var Lines=[{
  label: '',
  data: [],
},{
  backgroundColor:'#2980b9',
  borderColor:'#2980b9'
},{
  backgroundColor:'#2c3e50',
  borderColor:'#2c3e50'
},{
  backgroundColor:'#ffab00',
  borderColor:'#ffab00'
},{
  backgroundColor:'#00bfa5',
  borderColor:'#00bfa5'
},{
  backgroundColor:'#6200ea',
  borderColor:'#6200ea'
},{
  backgroundColor:'#8d6e63',
  borderColor:'#8d6e63'
},{
  backgroundColor:'#64dd17 ',
  borderColor:'#64dd17 '
}];

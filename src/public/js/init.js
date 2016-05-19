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
//Chart.defaults.global={
//  responsive:true,
//  responsiveAnimationDuration: 400
//};


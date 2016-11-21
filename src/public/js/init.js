/*global Chart, jQuery $ myChart*/
/* exported myChart*/
/*///////////////////////////////////////
MaterializeCSS initialization
///////////////////////////////////////*/
(function($) {
    $(() => {
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        $('.modal-trigger').leanModal();
        $('select').material_select();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
        //search data buttons
        $('#actionBtn-search').click(() => {
            $('#modalSearch').openModal();
        });
        $('#actionBtn-SearchClose').click(() => {
            $('#modalSearch').closeModal();
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space
/*///////////////////////////////////////
ChartJS Global Configuration
///////////////////////////////////////*/
Chart.defaults.global.defaultColor = 'rgba(255, 255, 255, 0)';
Chart.defaults.global.defaultFontColor = '#2c3e50';
Chart.defaults.global.elements.line.fill = false;
Chart.defaults.global.elements.line.borderWidth = 1;
Chart.defaults.global.elements.line.backgroundColor = 'rgba(255, 255, 255, 1)';
Chart.defaults.global.elements.line.borderColor = '#FF1744';
Chart.defaults.global.elements.point.backgroundColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.global.elements.point.radius = 4;
Chart.defaults.global.elements.point.borderColor = '#FF1744';
/**
 * Chart configuration, to get more info look in [chart.js](http://www.chartjs.org/)
 */
var myChart = new Chart($("#chart"), {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: '0',
            data: [0]
        }]
    },
    options: {
        spanGaps:true,
        defaultColor: '#FF1744',
        scales: {
            type: 'time',
            xAxes: [{
                type: "time"
            }]
        }
    }
});

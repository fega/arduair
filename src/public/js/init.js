/*global Chart, jQuery $ myChart, Materialize*/
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
    },
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 10,
        borderColor: 'black',
        borderWidth: 3
      }]
    }
});
/**
 * AQI chart configuration
 */
var aqiChart = new Chart($("#aqi-chart"), {
  type: 'line',
  data: {
    labels: [0,100],
    datasets: [{
      label: '0',
      data: [0]
    }, {
      label: '0',
      data: [0]
    }, {
      label: '0',
      data: [0]
    }, {
      label: '0',
      data: [0]
    }, {
      label: '0',
      data: [0]
    }, { //AQI LINES
      label: 'aqi',
      data: [50,50],
      borderColor: "#00e500",
      backgroundColor:"rgba(0,230,0,.1)",
      fill: true,
      pointRadius:0,
      borderWidth: 1
    }, { //AQI LINES
      label: 'aqi',
      data: [100,100],
        borderColor: "#ffff00",
        backgroundColor:"rgba(255,255,0,.08)",
        fill: true,
        pointRadius:0,
    }, { //AQI LINES
      label: 'aqi',
      data: [150,150],
        borderColor: "rgb(255,127,0)",
        backgroundColor:"rgba(255,127,0,.04)",
        fill: true,
        pointRadius:0,
    }, { //AQI LINES
      label: 'aqi',
      data: [200,200],
        borderColor: "#ff0000",
        backgroundColor:"rgba(255,0,0,.04)",
        fill: true,
        pointRadius:0,
    }, { //AQI LINES
      label: 'aqi',
      data: [300,300],
        borderColor: "rgb(164,61,155)",
        backgroundColor:"rgba(164,61,155,.04)",
        fill: true,
        pointRadius:0,
    }, { //AQI LINES
      label: 'aqi',
      data: [400,400],
        borderColor: "#94001e",
        pointRadius:0,
    }, { //AQI LINES
      label: 'aqi',
      data: [500,500],
      borderColor: "rgb(148,0,30)",
      backgroundColor:"rgba(148,0,30,.05)",
      fill: true,
      pointRadius:0
    }]
  },
  options: {
    spanGaps: true,
    defaultColor: '#FF1744',
    scales: {
      type: 'time',
      xAxes: [{
        type: "time"
      }]
    }
  },
  annotation: {
    annotations: [{
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: 10,
      borderColor: 'black',
      borderWidth: 3
    }]
  }
});

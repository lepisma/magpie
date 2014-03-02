currentSwitch = "B1";
currentSlide = $("#valueslider").attr("data-slider-value");
filtered = [];

$(document).ready(function(){


  getExtraValues();

  $("[data-toggle='switch']").wrap('<div class="switch" onclick="switchData(this)"/>').parent().bootstrapSwitch();

  $(".swt-list").first().addClass("active");
  currentSwitch = $(".swt-list").first().find("input").attr("id");

  //-----------------------------------------plots the power graph----------------------------------------//
  $.ajax({
    url: "/get/power",
    type: "GET",
    success: function(data, status, xhr) {


      var chart;
      var chartData = data.power_data;

      AmCharts.ready(function () {
          // SERIAL CHART
          chart = new AmCharts.AmSerialChart();
          chart.pathToImages = "js/amcharts/images/";
          chart.dataProvider = chartData;
          chart.dataDateFormat = "YYYY-MM-DD";
          chart.categoryField = "date";

          // AXES
          // category
          var categoryAxis = chart.categoryAxis;
          categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
          categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD-
          categoryAxis.gridAlpha = 0.1;
          categoryAxis.minorGridAlpha = 0.1;
          categoryAxis.axisAlpha = 0;
          categoryAxis.minorGridEnabled = false;
          categoryAxis.inside = true;

          // power
          var valueAxis = new AmCharts.ValueAxis();
          valueAxis.tickLength = 0;
          valueAxis.axisAlpha = 0;
          valueAxis.showFirstLabel = false;
          valueAxis.showLastLabel = false;
          chart.addValueAxis(valueAxis);

          // GRAPH
          var graph = new AmCharts.AmGraph();
          graph.dashLength = 3;
          graph.lineColor = "#00CC00";
          graph.valueField = "power";
          graph.dashLength = 3;
          graph.bullet = "round";
          graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>Power Consumed:[[value]]</span></b>";
          chart.addGraph(graph);

          // CURSOR
          var chartCursor = new AmCharts.ChartCursor();
          chart.addChartCursor(chartCursor);

          // HORIZONTAL GREEN RANGE
          var guide = new AmCharts.Guide();
          guide.value = 10;
          guide.toValue = 20;
          guide.fillColor = "#00CC00";
          guide.inside = true;
          guide.fillAlpha = 0.2;
          guide.lineAlpha = 0;
          valueAxis.addGuide(guide);

          var initialDate = new Date(1970, 0, 1, 0),
              finalDate = new Date(3000, 0, 1, 0);
          // Max Power Consumption Line
          var trendLine = new AmCharts.TrendLine();
          trendLine.initialDate = initialDate;
          trendLine.finalDate = finalDate;
          trendLine.initialValue = data.warning_at;
          trendLine.finalValue = data.warning_at;
          trendLine.lineColor = "#CC0000";
          chart.addTrendLine(trendLine);

          // WRITE
          chart.write("scatter");
      });

    },
    error: function() {
      console.log("Some error occured while fetching graph data.");
    }
  });

  //-------------------------------------------Setting temperature--------------------------------------//
  (function tempwork() {  
    $.ajax({
      url: '/get/temp',
      type: "GET",
      success: function(data) {
        $('#temp').html(data);
      },
      complete: function() {
        // Schedule the next request when the current one's complete
        setTimeout(tempwork, 60000);
      }
    });
  })();

  //-------------------------------------------Setting population--------------------------------------//
  (function popwork() {  
    $.ajax({
      url: '/get/people',
      type: "GET",
      success: function(data) {
        $('#hud-people').html(data);
      },
      complete: function() {
        // Schedule the next request when the current one's complete
        setTimeout(popwork, 60000);
      }
    });
  })();



  //-------------------------------------------for room panel------------------------------------------//

  // $(".room-select").on('click', 'li', function() {
  //   if(!($(this).hasClass("room-selected"))){
  //     $(this).addClass("room-selected");
  //     $(this).siblings().removeClass("room-selected");
  //   }
  // });


  //-------------------------------------------for hud-control-----------------------------------------//

  $("#hud-controls").on('click', 'a', function() {
    if($(this).hasClass("active")){
    }
    else{
      $(this).addClass("active");
      if($(this).children().first().hasClass("fui-user")){
        $("#hud-temp").hide();
        $("#hud-people").show();
      }
      if($(this).children().first().hasClass("fui-eye")){
        $("#hud-people").hide();
        $("#hud-temp").show();
      }
      $(this).siblings().removeClass("active");
    }
  });

  //---------------------------------------------for device list------------------------------------------//

  $("#deviceList ul").on('click', 'li', function() {
    if($(this).hasClass("active")){
    }
    else{
      $(this).addClass("active");
      currentSwitch = $(this).find("input").attr("id");
      // changeSlideBydevice();
      currentSlide = filtered[currentSwitch[1]-1][1];
      $("#valueslider").slider('setValue', currentSlide);
      $(this).siblings().removeClass("active");
    }
  });

  //------------------------------------is called when user slides slider---------------------------------//

  $("#valueslider").slider();
  $(".tooltip").addClass("hide"); // Hides the tooltip from slider
  $("#valueslider").on('slideStop', function(slideEvt) {

    deviceId = currentSwitch;
    slide = slideEvt.value;

      inputs = {
        "deviceId": deviceId,
        "slide": slide,
      };
      sendReq(inputs, "/change/slide");
      filtered[currentSwitch[1]-1][1] = slide;
      currentSlide = filtered[currentSwitch[1]-1][1];
      console.log(slide);

  });

});

//---------------------------------------is called when user changes active device--------------------------------//

// function changeSlideByDevice(){
    // currentSlide = filtered[currentSwitch[1]-1][1];
    // $("#valueslider").slider('setValue', currentSlide);
// }

//--------------------------------------is called when user changes switch  state---------------------------------//

function switchData(elem){

  elem = $(elem).find("input");
  deviceId = elem.attr("id");
  checked  = elem.prop("checked");

  if(checked){
    newStatus = "on";
  }
  else{
    newStatus = "off";
  }
  inputs = {
    "deviceId": deviceId,
    "newStatus": newStatus
  };
  sendReq(inputs, "/change/switch")
}


//*******************************************************************************************************//

//----------------------------------------- Functions for handling extraValues of switches --------------//

function getExtraValues(){
  $.ajax({
      type: "GET",
      url: "/get/all",
      success: function(result){
        // console.log(result);
        filterExtras(result);
        return result;
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
        return null;
      }
  });
}

function filterExtras(whole){
  whole.forEach(function(entry){
    filtered.push([entry['name'], entry['slide'], entry['alarm']]);
  });
}

//--------------------------------- makes ajax calls to send data and retrieve response---------------------//

function sendReq(inputs, setUrl)
{
   $.ajax({
      type: "GET",
      url: setUrl,
      data: inputs,
      success: function(result) {
        return 1;
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
        return 0;
      }
    });
}

// --------------------------------Helper functions for notifications

function notificationBtnToggle(){
  // Changes the color of notification button from blue to red, and vice versa
  button = $("#notificationBtn");
  if (button.hasClass("btn-info")){
    button.removeClass("btn-info");
    button.addClass("btn-danger");
  }
  else{
    button.removeClass("btn-danger");
    button.addClass("btn-info");
  }
}
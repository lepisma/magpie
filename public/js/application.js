filtered = [];
currentSwitch = null;

$(document).ready(function(){

  checkForNotifications(); // Checks for notifications

  $("[data-toggle='switch']").wrap('<div class="switch" onclick="switchData(this)"/>').parent().bootstrapSwitch(); // Creates the switches

  $(".swt-list").first().addClass("active"); // Selects the first switch
  currentSwitch = $(".swt-list").first().find("input").attr("id");
  getExtraValues(); // Get extravalues of switches and push to filtered array

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
      updateView(currentSwitch);

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
        filterExtras(result);
        updateView(currentSwitch);
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
      }
  });
}

function filterExtras(whole){
  filtered = [];
  whole.forEach(function(entry){
    filtered.push([entry['name'], entry['slide'], entry['alarm']]);
  });
}

// ----------------------------------called for checking notifications

function checkForNotifications(){
  $.get("/get/notifications",
    function(data){
      if (data.length > 1){
        writeNotification(data);
        notificationBtnUnread();
      }
      else{
        writeNotification("No new notification !");
        notificationBtnNormal();
      }
    }
  );
}

//---------------------------------------called when notification is read

function deleteNoti(){
  $.get("/delete/notification",
    function(data){
        checkForNotifications();
      }
  );
}

//----------------------------------------------------------------

//--------------------------------------------------------------------

//-----------------------------------called when user changes clicks on set timer button

function setTimer(){
  time_in_boxes = getTime();
  if (time_in_boxes != null) {
    var data_to_send = {
      "deviceId": currentSwitch,
      "timer": parseFloat(time_in_boxes)
    }

    $.ajax({
      type: "GET",
      url: "/change/timer",
      data: data_to_send,
      success: function(result){
        console.log("succes");
        filtered[currentSwitch[1] -1][2] = parseFloat(time_in_boxes);
        updateView(currentSwitch);
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
      }
    });
  }
}

// -----------------------------------called when delete timer is pressed

function deleteTimer(){
  null_time = -1.0;
  var data_to_send = {
    "deviceId": currentSwitch,
    "timer": null_time
  }
  $.ajax({
    type: "GET",
    url: "/change/timer",
    data: data_to_send,
    success: function(result){
      console.log("succes");
      filtered[currentSwitch[1] -1][2] = parseFloat(null_time);
      updateView(currentSwitch);
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(textStatus);
    }
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

// --------------------------------Helper UI functions

// --------------------------------Updates switch views

function updateView(swt){
  // Updates the view of slider and timer using the current switch value and filtered array
  currentSlide = filtered[swt[1] - 1][1];
  currentTimer = filtered[swt[1] - 1][2];

  if (parseFloat(currentTimer) < 0){
    writeTime("NA"); // DB stores -1 for timer not set
    $("#deleteTimerBtn").addClass("invisible");
  }
  else{
    timer_array = currentTimer.toString().split(".");

    if (timer_array[1] == null){
      // If minute is 00 (the number is without decimal)
      timer_array.push("00");
    }

    if (timer_array[0].length == 1){
      // If hour has only one digit
      timer_array[0] = timer_array[0] + "0";
    }
    if (timer_array[1].length == 1){
      // If minute has only one digit
      timer_array[1] = timer_array[1] + "0";
    }
    timer_string = timer_array[0] + " : " + timer_array[1];
    writeTime(timer_string); // Changes timer
    $("#deleteTimerBtn").removeClass("invisible");
  }

  if (parseInt(currentSlide) < 0){
    hideSlider(); // DB Store -1 for switches with no sliders
  }
  else{
    showSlider();
    $("#valueslider").slider('setValue', currentSlide); // Changes slider
  }
}

// --------------------------------NOTIFICATIONS

function notificationBtnNormal(){
  // Changes the color of notification button from red to blue
  button = $("#notificationBtn");
  button.removeClass("btn-danger");
  button.addClass("btn-info");
}

function notificationBtnUnread(){
  // Changes color of notification button from blue to red
  button = $("#notificationBtn");
  button.removeClass("btn-info");
  button.addClass("btn-danger");
}

function writeNotification(notification_string){
  // Writes notification text in modal
  $("#notificationBody").html(notification_string);
}

// ------------------------------ SLIDER

function hideSlider(){
  // Hides the slider
  // Use when the current switch does not support slider
  $("#slider").addClass("invisible");
}

function showSlider(){
  $("#slider").removeClass("invisible");
}

// ---------------------------------TIMER

function writeTime(timer_string){
  // Writes the given time to timer div
  $("#currentTimer").html(timer_string);
}

function getTime(){
  // Returns the time to set (in array format) using the values filled in timer form
  // Call this on button click of 'set timer' button
  // Returns null if time set is wrong or null
  hours = $("#timerHours").val();
  minutes = $("#timerMinutes").val();
  if (isNaN(hours) || isNaN(minutes)){
    return null;
  }
  else{
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if(hours < 0 || hours > 24 || minutes < 0 || minutes > 60){
      return null;
    }
    else{
      var time = hours.toString() + "." + minutes.toString();
      return time;
    }
  }
}
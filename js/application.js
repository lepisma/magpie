$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:1111/",
    success: function(data) {
      var output = '<ul>';
      $.each(data.data, function(key, val) {
        output += '<li class="swt-list"><span class="swt-name">' + val.device + '</span>';
        output += '<input type="checkbox" data-toggle="switch" name="'+ val.name + '" id="' + val.name + '"';
        if(val.status == 'on'){
          output += ' checked';
        }
        output += '></li>';
        //$("#B2").prop("checked");
      })
      output += '</ul>';
      $('#deviceList').html(output);
      $("[data-toggle='switch']").wrap('<div class="switch" onclick="sendReq(this)"/>').parent().bootstrapSwitch();
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(textStatus);
    }
  });

  $(".room-select").on('click', 'li', function() {
    if(!($(this).hasClass("room-selected"))){
      $(this).addClass("room-selected");
      $(this).siblings().removeClass("room-selected");
    }
  });

  $("#hud-controls").on('click', 'a', function() {
    if($(this).hasClass("active")){
    }
    else{
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
    }
  });

});

function sendReq(elem){
  deviceId = $(elem).children().children().attr("id");
  if($(elem).children().children().prop("checked")){
    newStatus = "on";
  }
  else{
    newStatus = "off";
  }
  inputs = {
    "deviceId": deviceId,
    "newStatus": newStatus
  };

  $.ajax({
      type: "POST",
      url: "http:127.0.0.1:1111/act",
      data: inputs,
      success: function(result) {
        return 1;
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
      }
    });
}

// (function($) {

  

//   $(function() {
    
//     // Room list
    

//     $(".has-switch").click( function() {
//       alert('did you call me');
//       var deviceId = $(this).attr("id");
//       var status   = $(this).prop("checked");
//       var inputs = {
//         'deviceId' : deviceId,
//         'newStatus' : status
//       };
//       // sendData(inputs);
//     });

//     // HUD controls
    


//       // Switch
      

//       // make code pretty
//       window.prettyPrint && prettyPrint();
    
//   });
  
// })(jQuery);

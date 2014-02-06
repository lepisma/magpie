
$(document).ready(function(){

  //-----------------------------------------loads initial data----------------------------------------//
  $.ajax({
    type: "GET",
    url: getUrl,
    success: function(data) {

      var output = '<ul>';
      
      $.each(data.data, function(key, val) {

        output += '<li class="swt-list"><span class="swt-name">' + val.device + '</span>';
        output += '<input type="checkbox" data-toggle="switch" id="' + val.name + '"';
        
        if(val.status == 'on'){
          output += ' checked';
        }

        output += '></li>';
      })
      output += '</ul>';
      $('#deviceList').html(output);

      $("[data-toggle='switch']").wrap('<div class="switch" onclick="sendData(this)"/>').parent().bootstrapSwitch();
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert("An error occured.Please refresh your page.\nMaybe the server is down.")
      console.log(errorThrown);
    }
  });


  //-------------------------------------------for room panel------------------------------------------//

  $(".room-select").on('click', 'li', function() {
    if(!($(this).hasClass("room-selected"))){
      $(this).addClass("room-selected");
      $(this).siblings().removeClass("room-selected");
    }
  });


  //-------------------------------------------for hud-control-----------------------------------------//

  $("#hud-controls").on('click', 'a', function() {
    if($(this).hasClass("active")){
    }
    else{
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
    }
  });

});

//--------------------------------------is called when user changes state-------------------------------//

function sendData(elem){

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
  sendReq(inputs)
}

function sendReq(inputs)
{
   $.ajax({
      type: "POST",
      url: setUrl,
      data: inputs,
      success: function(result) {
        return 1;
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
      }
    });
}


//*******************************************************************************************************//
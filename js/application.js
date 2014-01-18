(function($) {

  $(function() {
  
    // Room list
    $(".room-select").on('click', 'li', function() {
      if($(this).hasClass("room-selected")){
      }
      else{
        $(this).addClass("room-selected");
        $(this).siblings().removeClass("room-selected");
      }
    });

    // HUD controls
    $("#hud-controls").on('click', 'a', function() {
      if($(this).hasClass("active")){
      }
      else{
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
      }
    });

    // Switch
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

    // make code pretty
    window.prettyPrint && prettyPrint();
    
  });
  
})(jQuery);
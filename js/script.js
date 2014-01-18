
function changestate(currentElement)
{
	var source = $(currentElement).attr("src");
	var deviceId = $(currentElement).attr("id");
	if(source == "images/on.jpg")
	{
		var inputs = {
			'deviceId' : deviceId,
			'newStatus' : 'off'
		};
		sendData(inputs);
		$(currentElement).attr("src","images/off.jpg");
	}
	else
	{
		var inputs = {
			'deviceId' : deviceId,
			'newStatus' : 'on'
		};
		sendData(inputs);
		$(currentElement).attr("src","images/on.jpg");
	}
}

function sendData(inputs)
{
	$(document).ready(function(){
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
	});
}

// function load()
// {
// 	$(document).ready(function(){
// 		$.ajax({
// 			type: "GET",
// 			url: "http://127.0.0.1:1111/",
// 			success: function(data) {
// 				var output = '<ul>';
// 				var number = 1;
// 				$.each(data.data, function(key, val) {
// 					output += '<li class="swt-list"><span class="swt-name">' + val.device + '</span><span class="swt switch-on switch-animate">';
// 					output += '<input type="checkbox" data-toggle="switch"></span></li>';
// 					number++ ;
// 				})
// 				output += '</ul>';
// 				$('#deviceList').html(output);
// 			},
// 			error: function(jqXHR, textStatus, errorThrown){
// 				console.log(textStatus);
// 			}
// 		});
// 	});
// }
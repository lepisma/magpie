
function changestate(currentElement)
{
	var source = $(currentElement).attr("src");
	if(source == "images/on.jpg")
	{
		
		$(currentElement).attr("src","images/off.jpg");
	}
	else
	{
		$(currentElement).attr("src","images/on.jpg");

	}
}


function showAll()
{
	console.log("Sending");
	$(document).ready(function(){
		$.ajax({
			type: "GET",
			url: "http://127.0.0.1:1111/",
			success: function(result) {
				alert('success');
				$("#sendit").html(result);
				console.log(result);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus);
			}
		});
	});
}
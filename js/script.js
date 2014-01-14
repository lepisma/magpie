
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

function load()
{
	//alert('loading');
	$(document).ready(function () {
		$.getJSON('data.json', function (data) {
			var output = '';
			var number = 1;
			$.each(data, function(key, val) {
				output += '<h3>' + val.device + '</h3> <img id="' + val.name + '" src="images/' + val.status + '.jpg"';
				output += ' alt="toggle button" onclick="changestate(this)" /> <br />';
				number++ ;
			})
			$('#main').html(output);
		});
	});
}

function sendData()
{
	alert("send function");
	/*$(document).ready(function(){
		var input = {
			message : "hey this is it",
		};
		$.ajax({
			type: "POST",
			url: "here.py",
			data: input,
			success: function(result) {
				alert('success');
				$("#sendit").html(result);
			},
		});
	});*/
}

/*
var stringData = $.ajax({
url: "./sample_data.txt",
async: false,
accessControlAllowCredentials : true
}).responseText;
//Split values of string data
var stringArray = stringData.split(",");
alert("Data Loaded: " + stringArray[0]);
alert(stringArray[1]);
</script>*/
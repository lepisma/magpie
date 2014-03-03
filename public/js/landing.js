function login(){
	var pass = $("#entryField").val();
	if (pass == "ultrasafe"){ // Dummy password, just as a sample
		document.location.href = "/home";
	}
	else{
		showError();
	}
}

function showError(){
	$("#entryError").removeClass("invisible");
}
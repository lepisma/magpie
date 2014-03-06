<!-- % rebase('./app/views/layout.tpl') -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>.: Magpie :.</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/flat-ui.css">
    <link rel="stylesheet" href="css/application.css">
    <link rel="stylesheet" href="css/slider.css">
    <link rel="shortcut icon" href="images/icon.png">

    <script src="js/amcharts/amcharts.js" type="text/javascript"></script>
    <script src="js/amcharts/serial.js" type="text/javascript"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bootstrap-slider.js"></script>
    <script src="js/bootstrap-switch.js"></script>
    <script src="js/flatui-checkbox.js"></script>
    <body>

	<link rel="stylesheet" href="css/landing.css">
	<div id = "landingTitle"  class = "col-md-offset-1">Home Automation - IIT ROORKEE</div>

	<div id = "landing" class = "row">
		<div id = "landingText" class = "col-md-offset-1 col-md-5">
			<hr>
			<div id = "landingSummary">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
			</div>
		</div>
		<div id = "entryForm" class = "col-md-5">
			<input type = "password" class = "form-control" placeholder = "Password" id = "entryField">
			<button id = "entryBtn" class = "btn btn-primary form-control" onclick = "login()">
				Enter
			</button>
			<div id = "entryError" class = "form-control invisible">
				Wrong Password !
			</div>
		</div>
	</div>
	<div id = "logo">
		<a href="http://www.iitr.ac.in" target="_blank"><img src = "images/iit.gif"></a>
	</div>

	<script src = "js/landing.js"></script>
	
  </body>
</html>

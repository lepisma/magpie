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

	<div id = "landing" class = "row">
		<div id = "landingText" class = "col-md-offset-1 col-md-5">
			<div id = "landingTitle">Magpie</div>
			<hr>
			<div id = "landingSummary">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
		<img src = "images/iit.gif">
	</div>

	<script src = "js/landing.js"></script>
	
  </body>
</html>

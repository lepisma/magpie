<!--% rebase('./app/views/layout.tpl')-->
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
    <link rel="shortcut icon" href="images/favicon.ico">
    <script src="js/amcharts/amcharts.js" type="text/javascript"></script>
    <script src="js/amcharts/serial.js" type="text/javascript"></script>
    <script type="text/javascript">
        getUrl = "/all";
        setUrl = "/change";
    </script>
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bootstrap-slider.js"></script>
    <script src="js/bootstrap-switch.js"></script>
    <script src="js/flatui-checkbox.js"></script>
    <script src="js/application.js"></script>
  </head>

      <body>

    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="room-select">
                    <ul>
                      <li class="room-selected">
                        <div class="fui-list"></div>
                      </li>
                      <li>
                        <div class="fui-arrow-right"></div>
                        <div class="room-name">
                            Dining Room
                        </div>
                      </li>
                      <li>
                        <div class="fui-arrow-right"></div>
                        <div class="room-name">
                            Living Room
                        </div>
                      </li>
                      <li>
                        <div class="fui-arrow-right"></div>
                        <div class="room-name">
                            Bedroom
                        </div>
                      </li>
                      <li>
                        <div class="fui-arrow-right"></div>
                        <div class="room-name">
                            Bathroom
                        </div>
                      </li>
                    </ul>
                </div>
                <div class="hud">
                    <div class="btn-group" id="hud-controls">
                        <a class="btn btn-primary active">
                            <span class="fui-time"></span>
                        </a>
                        <a class="btn btn-primary">
                            <span class="fui-eye"></span>
                        </a>
                        <a class="btn btn-primary">
                            <span class="fui-mail"></span>
                        </a>
                        <a class="btn btn-primary">
                            <span class="fui-location"></span>
                        </a>
                        <a class="btn btn-primary">
                            <span class="fui-user"></span>
                        </a>
                    </div>
                    <div id="showhud">
                        <span id="temp"></span><sup>o</sup>C
                    </div>
                </div>
            </div>
            <div class="col-md-8 stats">
                <div class="row">
                    <div class="col-md-4 switch-menu" id="deviceList">
                        <ul>
                        % for switch in switches:
                            <li class="swt-list"><span class="swt-name"> {{switch[1]}} </span>
                            % if switch[2] == "on":
                                <input type="checkbox" data-toggle="switch" id="{{switch[0]}}" checked>
                            % else:
                                <input type="checkbox" data-toggle="switch" id="{{switch[0]}}">
                            % end
                            </li>
                        % end
                        </ul>
                    </div>
                    <div class="col-md-8 view-pane">
                        <!-- <img id="scatter" src="./images/graph.gif"> -->
                        <div id="switchDetails">
                            <div id = "slider">
                                <input id="valueslider" data-slider-id='ex1Slider' type="text" data-slider-min="1" data-slider-max="15" data-slider-step="1" data-slider-value="10"/>
                            </div>
                        </div>
                        <!-- <div id="view-pane-filler"></div> -->
                        <div id="scatter" style="width: 71%; height: 200px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--% include-->

  </body>
</html>
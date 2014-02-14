% rebase('./app/views/layout.tpl')

    <div class="container">
        <div class="row">
            <div class="col-md-4 room-select">
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
            <div class="col-md-8 stats">
                <div class="switch-menu" id="deviceList">
                    <ul>
                    % for switch in switches['data']:
                        <li class="swt-list"><span class="swt-name"> {{switch['device']}} </span>
                        % if switch['status'] == "on":
                            <input type="checkbox" data-toggle="switch" id="{{switch['name']}}" checked>
                        % else:
                            <input type="checkbox" data-toggle="switch" id="{{switch['name']}}">
                        % end
                        </li>
                    % end
                    </ul>
                </div>
                <div class="view-pane">
                    <!-- <img id="scatter" src="./images/graph.gif"> -->
                    <div id="scatter" style="width: 71%; height: 200px;"></div>
                </div>
            </div>
        </div>
        <div class="col-md-4 hud">
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
            <a class="btn btn-primary">
            <span class="fui-photo"></span>
            </a>
            </div>
            <div id="showhud">
                23<sup>o</sup>C
            </div>
        </div>
      </div>
    </div>
from bottle import Bottle, request, response, run
import devices

app = Bottle()

@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
 
@app.get('/')
def show():
    return devices.data

@app.post('/act')
def act():
	deviceId = request.forms.get('deviceId')
	devices.changeState(deviceId)
	return

app.run(host = "0.0.0.0", port = 1111)
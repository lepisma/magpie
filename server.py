from bottle import Bottle, request, response, run
import devices

app = Bottle()

@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    # response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.get('/')
def show():
    return devices.data

@app.post('/act')
def act():
	deviceId = request.forms.get('deviceId')
	newStatus = request.forms.get('newStatus')
	devices.changeState(deviceId,newStatus)
	return

app.run(host = "0.0.0.0", port = 1111)
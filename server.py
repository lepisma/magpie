from bottle import get, post, request, run, response
import devices

@get('/')
def showAll():
	return devices.data

@post('/act')
def act():
	deviceId = request.forms.get('deviceId')
	devices.changeState(deviceId)
	return

run(host = "localhost", port = 1111)
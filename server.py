from bottle import Bottle, request, response, run, template, static_file
import writer

app = Bottle()

@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    # response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.get('/all')
def show():
    return writer.data

@app.get('/')
def mainpage():
	return template("app/views/index")

@app.get('<path:path>')
def server_public(path):
	return static_file(path, root = 'public/')

@app.post('/change')
def change():
	deviceId = request.forms.get('deviceId')
	newStatus = request.forms.get('newStatus')
	writer.changeState(deviceId,newStatus)
	return

app.run(host = "0.0.0.0", port = 1111)
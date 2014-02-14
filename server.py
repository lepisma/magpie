from bottle import Bottle, request, response, run, template, static_file
from lib import handler
import sqlite3
import json


app = Bottle()

@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    # response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.get('/all')
def show():
    return handler.data

@app.get('/')
def mainpage():
	return template("app/views/landing")

@app.get('/home')
def landingpage():
  return template("app/views/home")

@app.get('<path:path>')
def server_public(path):
	return static_file(path, root = 'public/')

@app.get('/power')
def power_data():
  """Returns  power data in JSON format
  """
  response.headers['Content-Type'] = 'application/json'

  connection = sqlite3.connect("app/models/magpie.db")
  cursor = connection.cursor()
  dict = handler.power(cursor)
  return json.dumps(dict)

@app.post('/change')
def change():
	deviceId = request.forms.get('deviceId')
	newStatus = request.forms.get('newStatus')
	handler.changeStateSwitch(deviceId,newStatus)
	return

app.run(host = "0.0.0.0", port = 1111)
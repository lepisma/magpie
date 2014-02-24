from bottle import Bottle, request, response, run, template, static_file
from app.controllers import controls, power, temperature
import sqlite3

# Connects [creates] the db
connection = sqlite3.connect("magpie.db")
connection.row_factory = sqlite3.Row
cursor = connection.cursor()

# Initializes bottle
app = Bottle()

@app.hook('after_request')
def enable_cors():
  response.headers['Access-Control-Allow-Origin'] = '*'
  # response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
  # response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

# Returns switch states in JSON
@app.get('/all')
def show():
  response.headers['Content-Type'] = 'application/json'
  print controls.getAll(cursor, True)
  return controls.getAll(cursor, True)

# The home page
@app.get('/')
@app.get('/home')
def landingpage():
  return template("app/views/home", switches = controls.getAll(cursor))

# Static rendering
@app.get('<path:path>')
def server_public(path):
	return static_file(path, root = 'public/')

# Returns power in JSON
@app.get('/power')
def power_data():
  """Returns  power data in JSON format
  """
  response.headers['Content-Type'] = 'application/json'
  return power.getAll_JSON(cursor)

# Changes the state according to request
@app.get('/change')
def change():
	deviceId = request.GET.get('deviceId')
	newStatus = request.GET.get('newStatus')
	print newStatus
	controls.setState(cursor, deviceId, newStatus)
	return

# Get the temperature value
@app.get('/temp')
def get_temp():
  temp = temperature.getTemperature(cursor)
  return str(temp)

# Run
app.run(host = "0.0.0.0", port = 1111)
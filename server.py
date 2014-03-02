from bottle import Bottle, request, response, run, template, static_file
from app.controllers import controls, power, stats
# import raspberry
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

# The home page
@app.get('/')
def landingpage():
  return template("app/views/landing")

@app.get('/home')
def homepage():
  return template("app/views/home", switches = controls.getAll(cursor))

# Static rendering
@app.get('<path:path>')
def server_public(path):
  return static_file(path, root = 'public/')

# Returns switch states in JSON
@app.get('/get/all')
def show():
  response.headers['Content-Type'] = 'application/json'
  print controls.getAll(cursor, True)
  return controls.getAll(cursor, True)

# Returns power in JSON
@app.get('/get/power')
def power_data():
  """Returns  power data in JSON format
  """
  response.headers['Content-Type'] = 'application/json'
  return power.getAll_JSON(cursor)

# Gets the temperature value
@app.get('/get/temp')
def get_temp():
  temp = stats.getTemperature(cursor)
  return str(temp)

# Gets the number of people
@app.get("/get/people")
def get_people():
  return str(stats.getPeople(cursor))

# Get notifications
@app.get("/get/notifications")
def get_notifications():
  return str(stats.getNotifications(cursor))

# Changes the switch state according to request
@app.get('/change/switch')
def change():
  deviceId = request.GET.get('deviceId')
  newStatus = request.GET.get('newStatus')
  print newStatus
  # raspberry.write()
  controls.setState(cursor, deviceId, newStatus)
  return

# Changes the slider state according to request
@app.get("/change/slide")
def slide():
  deviceId = request.GET.get('deviceId')
  slide = request.GET.get('slide')
  print slide
  controls.setSlide(cursor, deviceId, slide)
  return

# Changes the timer for switch
@app.get("/change/timer")
def timer():
  deviceId = request.GET.get('deviceId')
  timer = request.GET.get('timer')
  controls.setTimer(cursor, deviceId, timer)
  return

# Run
app.run(host = "0.0.0.0", port = 1111)
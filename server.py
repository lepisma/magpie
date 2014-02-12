from bottle import Bottle, request, response, run, template, static_file
import writer
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
    return writer.data

@app.get('/')
def mainpage():
	return template("app/views/index")

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

  cursor.execute("""CREATE TABLE IF NOT EXISTS power
                    (date text, power real)
                 """)

  # insert sample data
  cursor.execute("INSERT INTO power VALUES ('14/02/2014', 6.05)")
  cursor.execute("INSERT INTO power VALUES ('15/02/2014', 5.64)")

  # fetch power data
  cursor.execute("SELECT * FROM power")
  data = cursor.fetchall()

  dict = {"power_data": data}

  return json.dumps(dict)

@app.post('/change')
def change():
	deviceId = request.forms.get('deviceId')
	newStatus = request.forms.get('newStatus')
	writer.changeState(deviceId,newStatus)
	return

app.run(host = "0.0.0.0", port = 1111)
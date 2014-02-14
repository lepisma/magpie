import sqlite3
import json

def getAll_JSON(cursor):

	POWER_WARNING_LIMIT = 10
	# fetch power data
	cursor.execute("SELECT * FROM power")
	data = cursor.fetchall()

	plotdata = []

	for value in data:
		value = {
			"date": value[0],
			"power": value[1]
		}
		plotdata.append(value)

	dict = {"power_data": plotdata, "warning_at": POWER_WARNING_LIMIT}
	return json.dumps(dict)
import sqlite3

def getTemperature(cursor):
	cursor.execute("SELECT * FROM temperature limit 1")
	data = cursor.fetchall()

	for row in data:
		return row[0]
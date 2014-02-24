import sqlite3

def getTemperature(cursor):
	cursor.execute("SELECT * FROM temperature LIMIT 0, 1")
	data = cursor.fetchall()

	for row in data:
		return row[0]
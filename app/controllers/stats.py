import sqlite3

def getTemperature(cursor):
	cursor.execute("SELECT * FROM stats LIMIT 0, 1")
	data = cursor.fetchall()

	for row in data:
		return row[0]

def getPeople(cursor):
	cursor.execute("SELECT * FROM stats LIMIT 0, 1")
	data = cursor.fetchall()

	for row in data:
		return row[1]

def getNotifications(cursor):
	cursor.execute("SELECT * FROM stats LIMIT 0, 1")
	data = cursor.fetchall()

	for row in data:
		return row[2]

def deleteNotification(cursor, conn):
	cursor.execute("UPDATE stats SET feedback = ''")
	conn.commit()
	return
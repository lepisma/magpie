import sqlite3

def getAll(cursor):
	cursor.execute("SELECT * FROM switches")
	return cursor.fetchall()

def setState(cursor, id, newStatus):
	cursor.execute("UPDATE switches SET status = '" + str(newStatus) + "' WHERE name = '" + str(id) + "'")
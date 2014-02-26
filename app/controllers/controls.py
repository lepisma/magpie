import sqlite3
import json

def getAll(cursor, api = False):
	cursor.execute("SELECT * FROM switches")
	dat = cursor.fetchall()

	if api == True:
		return json.dumps([dict(ix) for ix in dat])

	return dat

def setState(cursor, id, newStatus):
	cursor.execute("UPDATE switches SET status = '" + str(newStatus) + "' WHERE name = '" + str(id) + "'")
	return

def setSlide(cursor, id, slide):
	cursor.execute("UPDATE switches SET slide = '" + str(slide) + "' WHERE name = '" + str(id) + "'")
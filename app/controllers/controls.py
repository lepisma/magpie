import sqlite3
import json

def getAll(cursor, api = False):
	cursor.execute("SELECT * FROM switches")
	dat = cursor.fetchall()
	if api == True:
		return json.dumps([dict(ix) for ix in dat])

	return dat

def setState(cursor, conn, id, newStatus):
	cursor.execute("UPDATE switches SET status = '" + str(newStatus) + "' WHERE id = '" + str(id) + "'")
	conn.commit()
	return

def setSlide(cursor, conn, id, slide):
	cursor.execute("UPDATE switches SET slide = " + slide + " WHERE id = '" + str(id) + "'")
	conn.commit()
	return

def setTimer(cursor, conn, id, timer):
	cursor.execute("UPDATE switches SET alarm = " + timer +" WHERE id = '" + str(id) + "'")
	conn.commit()
	return
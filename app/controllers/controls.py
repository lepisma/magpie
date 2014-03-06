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


def linkToPi(cursor, route, id, status):
  cursor.execute("SELECT type from switches WHERE id = '" + str(id) + "'")
  switch_type = cursor.fetchall()[0][0]
  switch_id = id[1]
  print switch_type
  if route == 'switch':
    if status == "off":
      print "raspberry.write( " + switch_type + ", " + switch_id + ", " +  "0)"
      # raspberry.write(switch_type, switch_id, 0)
    elif switch_type == "F":    # else the switch has been turned on
      cursor.execute("SELECT slide from switches WHERE id = '" + str(id) + "'")
      switch_status = cursor.fetchall()[0][0]
      print switch_status
      print "raspberry.write( " + switch_type + ", " + switch_id + ", " +  str(switch_status) + ")"
      # raspberry.write(switch_type, switch_id, slide)
    else:
      print "raspberry.write( " + switch_type + ", " + switch_id + ", " + "1)"
      # raspberry.write(switch_type, switch_id, 1)
  elif route == 'slide':
    print "raspberry.write( " + switch_type + ", " + switch_id + ", " +  status + ")"
    # raspberry.write(switch_type, switch_id, status)
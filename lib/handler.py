import json
from lib import switches


def changeStateSwitch(id,newStatus):

	data = json.load(open('app/models/data.json', 'r+'))
	nos = len(data['data']) # Number of devices
	info = data['data']

	for i in range(0, nos):
		if info[i]['name'] == id:
			state = info[i]['status']
			if state == newStatus:
				print('already the status')
			else:
				dataType = info[i]['type']
				dataSwitch = info[i]['name'][1]
				dataStatus = ( "1" if (newStatus == "on") else "0" )
				switches.sendSignalSwitch(dataType, dataSwitch, dataStatus)
				info[i]['status'] = newStatus
				print('status changed')
		json.dump(data, open('app/models/data.json', 'w'))

	return 1


def power(cursor):

	# corresponds to the max allowed power consumption each day
	POWER_WARNING_LIMIT = 10
	
	cursor.execute("""CREATE TABLE IF NOT EXISTS power
                    (date text, power real)
                 """)

	# insert sample data
	cursor.execute("INSERT INTO power VALUES ('2014-02-14', 6.05)")
	cursor.execute("INSERT INTO power VALUES ('2014-02-15', 12.64)")
	cursor.execute("INSERT INTO power VALUES ('2014-02-16', 17.36)")

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
	return dict
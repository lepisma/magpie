import serial
import time
import sqlite3
import datetime
import ast

connection = sqlite3.connect("/home/pi/project/magpie/app/controllers/lib/magpie.db")
cursor = connection.cursor()

ser = serial.Serial('/dev/ttyAMA0', 9600, timeout=0.5)

def write(switch_type, switch_id, switch_status):
	data = switch_type+switch_id+switch_status
	"""
		Fan = 'F1'
		Bulb = 'F2'
		Button = 'B1, B2, B3, B4'
	"""
	ser.write(data)
	print data
	return time.time()+20

def read():
	read_data = ser.read(1)
	timeout = time.time() + 300
	if read_data == 'Z':
		feedback(timeout)
	elif read_data == 'C':
		temperature(timeout)
	elif read_data == 'P':
		num_person(timeout)
	elif read_data == 'I':
		energy(timeout)
	connection.commit()

def feedback(timeout):
	feedback = ''
	while True:
		read = ser.read(1)
		if read == 'Q' or time.time()>timeout:
			print feedback
			cursor.execute("UPDATE stats SET feedback = " + str())
			break
		if read:
			feedback = feedback+read

def temperature(timeout):
	temperature = ''
	data = ''
	while True:  
		data = ser.read(1)
		if data:
			if data == 'Q' or time.time()>timeout:
				break
			temperature = temperature + data
	temp = str(temperature)
	print temp
	cursor.execute("UPDATE stats SET temp = " + str(temp) + " WHERE id = '1'")
	cursor.execute("SELECT * FROM stats")
	print cursor.fetchall()
	
def num_person(timeout):
	num_person = ''
	while True:
		num_person = ser.read(2)
		if num_person or time.time()>timeout:
			cursor.execute("UPDATE stats SET people = " + str(num_person))
			break

def energy(timeout):
	energy = ''
	data = ''
	while True:
		data = ser.read(1)
		if data:
			if data == 'Q' or time.time()>timeout:
				break
			energy = energy + data
	power = ast.literal_eval(energy)
	print power
	date_cur = str(datetime.datetime.now().date().year) + '-' + str(datetime.datetime.now().date().month) + '-' + str(datetime.datetime.now().date().day)  
	cursor.execute("UPDATE power SET power = power + " + str(power) + ", date = " + str(date_cur))

timeout = time.time()+10
print timeout
stat = 0


#while True:
# 	try:
# 		read()
#
#	except KeyboardInterrupt:
#		ser.close()
#		print "Goodbye!"
#		raise


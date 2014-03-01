import serial
import time
import sqlite3

connection = sqlite3.connect("magpie.db")
cursor = connection.cursor()

ser = serial.Serial('/dev/ttyAMA0', 9600)
ser.open()

while True:
	try:
		read()
		#write()

	except KeyboardInterrupt:
		ser.close()
		print "Goodbye!"
		raise

ser.close()

def write(switch_type, switch_id, switch_status):
	data = switch_type+switch_id+switch_status
	"""
		Fan = 'F1'
		Bulb = 'F2'
		Button = 'B1, B2, B3, B4'
	"""
	ser.write(data)
	print data

def read():
	timeout = time.time() + 60*10
	read = ser.read(1)
	if read == 'Z':
		feedback(timeout)
	elif read == 'C':
		temperature(timeout)
	elif read == 'P':
		num_person(timeout)
	elif read == 'I':
		current(timeout)

def feedback(timeout):
	feedback = ''
	while True:
		read = ser.read(1)
		if read == 'Q' or time.time()>timeout:
			cursor.execute("UPDATE stats SET feedback = " + str())
			break
		if read:
			feedback = feedback+read

def temperature(timeout):
	temperature = ''
	while True:  
		temperature = ser.read(4)
		if temperature or time.time()>timeout:
			cursor.execute("UPDATE stats SET temp = " + str(temperature))
			break
	
def num_person(timeout):
	num_person = ''
	while True:
		num_person = ser.read(2)
		if num_person or time.time()>timeout:
			cursor.execute("UPDATE stats SET people = " + str(num_person))
			break

def current():
	current = ''
	while True:
		current = ser.read(4)
		if current or time.time()>timeout:
			#Write to DB
			break

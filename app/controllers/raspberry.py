import serial
import time

def sendSignalSwitch(dataType, dataSwitch, dataStatus):
	"""
	ser = serial.Serial('/dev/ttyAMA0', 9600)
	ser.open()

	vartime = time.time();

	while True:
		try:
			timeout = time.time() + 30
			# print time.time()
			read = ''
			temp = ''
			dataTotal = dataType+dataSwitch+'S'+dataStatus
			ser.write(dataTotal)
			print dataTotal
			while True:
				temp=ser.read(1)
				read += temp
				if temp == 'Q' or time.time()>timeout :
					print "Feedback: "+read
					break
	"""
	"""
			# the temperature code
			if(time.time() > vartime+60*5):
			  temperature = ser.read(4)
			  print temperature
				# Code to write to DB 
			  vartime = time.time()
	"""
	"""
		except KeyboardInterrupt:
			ser.close()
			print "Goodbye!"
			raise

	ser.close()
	"""
	dataTotal = dataType+dataSwitch+'S'+dataStatus
	print dataTotal
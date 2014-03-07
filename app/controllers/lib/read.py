import raspberry

while True:
	try:
		raspberry.read()
	except KeyboardInterrupt:
		ser.close()
		print "GoodBye"
		raise

ser.close()
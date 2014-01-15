import json

data = json.load(open('data.json', 'r+'))
nos = len(data) # Number of devices

def changeState(id):
	state = data[id]['status']
	if state == 'on':
		data[id]['status'] = 'off'
	else:
		data[id]['status'] = 'on'

	json.dump(data, open('data.json', 'w'))
	
	return 1
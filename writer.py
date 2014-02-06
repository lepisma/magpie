import json

data = json.load(open('app/models/data.json', 'r+'))
nos = len(data['data']) # Number of devices

def changeState(id,newStatus):
	info = data['data']
	for i in range(0, nos):
		if info[i]['name'] == id:
			state = info[i]['status']
			if state == newStatus:
				print('already the status')
			else:
				info[i]['status'] = newStatus
				print('status changed')
		json.dump(data, open('app/models/data.json', 'w'))

	return 1
import json

def changeFileStatus(name):
	f = open('data.json', 'r+')
	x = json.load(f)
	with open('data.json', 'w') as f :
		print x
		for thing in x :
			if thing['name'] == name :
				thing['status'] = 'on'
				print thing['status']
				print x
		json.dump(x, f)

def main():
	vari = raw_input()
	changeStatus(vari)

main()

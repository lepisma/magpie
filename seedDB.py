import sqlite3

connection = sqlite3.connect('magpie.db')
cursor = connection.cursor()

cursor.execute("""CREATE TABLE IF NOT EXISTS switches
                    (device text, status text, type text, name text)
                 """)

cursor.execute("""CREATE TABLE IF NOT EXISTS power
                (date text, power real)
             """)

# Adding switches
cursor.execute("INSERT INTO switches VALUES ('Fan 1', 'off', 'F', 'B1')")
cursor.execute("INSERT INTO switches VALUES ('Light 1', 'on', 'L', 'B2')")
cursor.execute("INSERT INTO switches VALUES ('Fan 2', 'on', 'F', 'B3')")

# Adding power usage
cursor.execute("INSERT INTO power VALUES ('2014-02-14', 6.05)")
cursor.execute("INSERT INTO power VALUES ('2014-02-15', 12.64)")
cursor.execute("INSERT INTO power VALUES ('2014-02-16', 17.36)")

connection.commit()
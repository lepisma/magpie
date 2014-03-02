import sqlite3

connection = sqlite3.connect('magpie.db')
cursor = connection.cursor()


cursor.execute("""DROP TABLE IF EXISTS switches
					""")
cursor.execute("""DROP TABLE IF EXISTS power
					""")
cursor.execute("""DROP TABLE IF EXISTS temperature
					""")

cursor.execute("""DROP TABLE IF EXISTS stats
					""")

cursor.execute("""CREATE TABLE IF NOT EXISTS switches
                    (name text, device text, status text, type text, slide int, alarm real)
                 """)

cursor.execute("""CREATE TABLE IF NOT EXISTS power
                (date text, power real)
             """)

cursor.execute("""CREATE TABLE IF NOT EXISTS stats
                (temp real, people int, feedback text)
             """)

# Adding switches
cursor.execute("INSERT INTO switches VALUES ('B1', 'Fan 1', 'off', 'F', 12, 23.12)")
cursor.execute("INSERT INTO switches VALUES ('B2', 'Light 1', 'on', 'L', -1, 23.46)")
cursor.execute("INSERT INTO switches VALUES ('B3', 'Fan 2', 'on', 'F', 4, -1)")

# Adding power usage
cursor.execute("INSERT INTO power VALUES ('2014-02-14', 6.05)")
cursor.execute("INSERT INTO power VALUES ('2014-02-15', 12.64)")
cursor.execute("INSERT INTO power VALUES ('2014-02-16', 17.36)")

# Adding sample stats
cursor.execute("INSERT INTO stats VALUES (26.7, 4, 'OverHeating')")

connection.commit()
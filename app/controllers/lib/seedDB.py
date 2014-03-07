import sqlite3

connection = sqlite3.connect('/home/pi/project/magpie/app/controllers/lib/magpie.dbmagpie.db')
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
                    (id text, name text, status text, type text, slide int, alarm real)
                 """)

cursor.execute("""CREATE TABLE IF NOT EXISTS power
                (date text, power real)
             """)

cursor.execute("""CREATE TABLE IF NOT EXISTS stats
                (temp text, people int, feedback text)
             """)

# Adding switches
cursor.execute("INSERT INTO switches VALUES ('B1', 'Light 1', 'off', 'B', -1, 23.12)")
cursor.execute("INSERT INTO switches VALUES ('B2', 'Light 2', 'on', 'B', -1, 23.46)")
cursor.execute("INSERT INTO switches VALUES ('B3', 'Light 3', 'on', 'B', -1, -1)")
cursor.execute("INSERT INTO switches VALUES ('B4', 'Fan 1', 'on', 'F', 11, -1)")

# Adding power usage
cursor.execute("INSERT INTO power VALUES ('2014-02-14', 6.05)")
cursor.execute("INSERT INTO power VALUES ('2014-02-15', 12.64)")
cursor.execute("INSERT INTO power VALUES ('2014-02-16', 17.36)")

# Adding sample stats
cursor.execute("INSERT INTO stats VALUES (26.7, 4, 'OverHeating')")

connection.commit()
import sqlite3

connection = sqlite3.connect('mock.db')
connection.execute("""
    CREATE TABLE IF NOT EXISTS data(
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        desc TEXT NOT NULL
    )
""")

connection.commit()
connection.execute("""
    INSERT INTO data(id, title, desc) VALUES
    (1, 'Entry 1', 'Entry 1 desc'),
    (2, 'Entry 2', 'Entry 2 desc'),
    (3, 'Entry 3', 'Entry 3 desc'),
    (4, 'Entry 4', 'Entry 4 desc'),
    (5, 'Entry 5', 'Entry 5 desc'),
    (6, 'Entry 6', 'Entry 6 desc')
""")

connection.commit()
print('success!')

def create_table(self):
    cursor = self.conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            salary INTEGER NOT NULL,
            pin TEXT NOT NULL UNIQUE,
            balance INTEGER NOT NULL DEFAULT 0,
            transactions TEXT
        )
    ''')
    self.conn.commit()
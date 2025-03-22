import sqlite3
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class BankSystem:
    def __init__(self, db_path):
        self.db_path = db_path
        self.conn = self.connect_to_database()
        if self.conn:
            self.cursor = self.conn.cursor()
            self.create_table()

    def connect_to_database(self):
        if not os.path.exists(self.db_path):
            os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        try:
            conn = sqlite3.connect(self.db_path)
            return conn
        except sqlite3.DatabaseError:
            return None

    def create_table(self):
        try:
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
        except sqlite3.DatabaseError:
            os.remove(self.db_path)

    def create_account(self, name, age, salary, pin):
        if not name or not age or not salary or not pin:
            return {"error": "All fields are required!"}
        if not age.isdigit() or not salary.isdigit() or not pin.isdigit() or len(pin) != 4:
            return {"error": "Invalid input!"}
        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (name, age, salary, pin, balance, transactions)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (name, age, salary, pin, 0, '[]'))
        conn.commit()
        conn.close()
        return {
            "pin": pin,
            "name": name,
            "age": age,
            "salary": salary,
            "balance": 0,
            "transactions": "[]"
        }

    def login(self, name, pin):
        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE pin = ?', (pin,))
        user = cursor.fetchone()

        if user and user[1] == name:
            return {
                "pin": user[0],
                "name": user[1],
                "age": user[2],
                "salary": user[3],
                "balance": user[5],
                "transactions": eval(user[6])
            }
        else:
            return {"error": "Invalid name or PIN!"}

    def deposit(self, pin, amount):
        if not pin or not amount or not amount.isdigit() or int(amount) <= 0:
            return {"error": "Invalid input!"}

        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute(
            'SELECT balance, transactions FROM users WHERE pin = ?', (pin,))
        user = cursor.fetchone()

        if user:
            new_balance = user[0] + int(amount)
            transactions = eval(user[1])
            transactions.append(
                f"Deposit: +{amount}, New Balance: {new_balance}")

            cursor.execute('UPDATE users SET balance = ?, transactions = ? WHERE pin = ?',
                           (new_balance, str(transactions), pin))
            conn.commit()
            return {"success": "Deposit successful!", "new_balance": new_balance}
        else:
            return {"error": "Invalid PIN!"}

    def withdraw(self, pin, amount):
        if not pin or not amount or not amount.isdigit() or int(amount) <= 0:
            return {"error": "Invalid input!"}
        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute(
            'SELECT balance, salary, transactions FROM users WHERE pin = ?', (pin,))
        user = cursor.fetchone()

        if user:
            current_balance = user[0]
            salary = user[1]
            if int(amount) > current_balance:
                remaining_amount = int(amount) - current_balance
                if remaining_amount > salary:
                    return {"error": "Insufficient balance and salary!"}
                salary -= remaining_amount
                transactions = eval(user[2])
                transactions.append(
                    f"Withdraw: -{amount}, New Balance: 0, Salary Deducted: -{remaining_amount}, Remaining Salary: {salary}")
                current_balance = 0
            else:
                current_balance -= int(amount)
                transactions = eval(user[2])
                transactions.append(
                    f"Withdraw: -{amount}, New Balance: {current_balance}")

            cursor.execute('UPDATE users SET balance = ?, salary = ?, transactions = ? WHERE pin = ?',
                           (current_balance, salary, str(transactions), pin))
            conn.commit()
            return {"success": "Withdrawal successful!", "new_balance": current_balance, "remaining_salary": salary}
        else:
            return {"error": "Invalid PIN!"}

    def bill_payment(self, pin, bill_type, amount):
        if not pin or not amount or not amount.isdigit() or int(amount) <= 0:
            return {"error": "Invalid input!"}
        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute(
            'SELECT balance, salary, transactions FROM users WHERE pin = ?', (pin,))
        user = cursor.fetchone()

        if user:
            current_balance = user[0]
            salary = user[1]
            if int(amount) > current_balance:
                remaining_amount = int(amount) - current_balance
                if remaining_amount > salary:
                    return {"error": "Insufficient balance and salary!"}
                salary -= remaining_amount
                transactions = eval(user[2])
                transactions.append(
                    f"Bill Payment ({bill_type}): -{amount}, New Balance: 0, Salary Deducted: -{remaining_amount}, Remaining Salary: {salary}")
                current_balance = 0
            else:
                current_balance -= int(amount)
                transactions = eval(user[2])
                transactions.append(
                    f"Bill Payment ({bill_type}): -{amount}, New Balance: {current_balance}")

            cursor.execute('UPDATE users SET balance = ?, salary = ?, transactions = ? WHERE pin = ?',
                           (current_balance, salary, str(transactions), pin))
            conn.commit()
            return {"success": "Bill payment successful!", "new_balance": current_balance, "remaining_salary": salary}
        else:
            return {"error": "Invalid PIN!"}

    def view_transaction_log(self, pin):
        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute('SELECT transactions FROM users WHERE pin = ?', (pin,))
        user = cursor.fetchone()

        if user:
            transactions = eval(user[0])
            return {"transactions": transactions}
        else:
            return {"error": "Invalid PIN!"}

    def insurance(self, pin, insurance_type, amount):
        if not pin or not amount or not amount.isdigit() or int(amount) <= 0:
            return {"error": "Invalid input!"}

        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute(
            'SELECT balance, transactions FROM users WHERE pin = ?', (pin,))
        user = cursor.fetchone()

        if user:
            new_balance = user[0] + int(amount)
            transactions = eval(user[1])
            transactions.append(
                f"Insurance Get ({insurance_type}): +{amount}, New Balance: {new_balance}")

            cursor.execute('UPDATE users SET balance = ?, transactions = ? WHERE pin = ?',
                           (new_balance, str(transactions), pin))
            conn.commit()
            return {"success": f"{insurance_type.capitalize()} insurance payment successful!", "new_balance": new_balance}
        else:
            return {"error": "Invalid PIN!"}

    def cheque(self, pin, cheque_type, amount):
        if not pin or not amount or not amount.isdigit() or int(amount) <= 0:
            return {"error": "Invalid input!"}

        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute(
            'SELECT balance, salary, transactions FROM users WHERE pin = ?', (pin,))
        user = cursor.fetchone()

        if user:
            current_balance = user[0]
            salary = user[1]
            transactions = eval(user[2])

            if cheque_type == 'issue':
                if int(amount) > current_balance:
                    remaining_amount = int(amount) - current_balance
                    if remaining_amount > salary:
                        return {"error": "Insufficient balance and salary!"}
                    salary -= remaining_amount
                    transactions.append(
                        f"Cheque Issue: -{amount}, New Balance: 0, Salary Deducted: -{remaining_amount}, Remaining Salary: {salary}")
                    current_balance = 0
                else:
                    current_balance -= int(amount)
                    transactions.append(
                        f"Cheque Issue: -{amount}, New Balance: {current_balance}")

            elif cheque_type == 'deposit':
                current_balance += int(amount)
                transactions.append(
                    f"Cheque Deposit: +{amount}, New Balance: {current_balance}")

            cursor.execute('UPDATE users SET balance = ?, salary = ?, transactions = ? WHERE pin = ?',
                           (current_balance, salary, str(transactions), pin))
            conn.commit()
            return {"success": f"Cheque {cheque_type} successful!", "new_balance": current_balance, "remaining_salary": salary}
        else:
            return {"error": "Invalid PIN!"}

    def loan(self, pin, loan_type, amount):
        if not pin or not amount or not amount.isdigit() or int(amount) <= 0:
            return {"error": "Invalid input!"}

        conn = self.connect_to_database()
        cursor = conn.cursor()
        cursor.execute(
            'SELECT balance, transactions FROM users WHERE pin = ?', (pin,))
        user = cursor.fetchone()

        if user:
            new_balance = user[0] + int(amount)
            transactions = eval(user[1])
            transactions.append(
                f"Loan Received ({loan_type}): +{amount}, New Balance: {new_balance}")

            cursor.execute('UPDATE users SET balance = ?, transactions = ? WHERE pin = ?',
                           (new_balance, str(transactions), pin))
            conn.commit()
            return {"success": "Loan received successfully!", "new_balance": new_balance}
        else:
            return {"error": "Invalid PIN!"}


@app.route('/create_account', methods=['POST'])
def create_account():
    data = request.json
    name = data.get('name')
    age = data.get('age')
    salary = data.get('salary')
    pin = data.get('pin')
    result = bank_system.create_account(name, age, salary, pin)
    return jsonify(result)


@app.route('/test', methods=['GET'])
def test_account():
    name = "sagar"
    age = "27"
    salary = "50000"
    pin = "1234"
    result = bank_system.create_account(name, age, salary, pin)
    return jsonify(result)


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    name = data.get('name')
    pin = data.get('pin')
    result = bank_system.login(name, pin)
    return jsonify(result)


@app.route('/deposit', methods=['POST'])
def deposit():
    data = request.json
    pin = data.get('pin')
    amount = data.get('amount')
    result = bank_system.deposit(pin, amount)
    return jsonify(result)


@app.route('/withdraw', methods=['POST'])
def withdraw():
    data = request.json
    pin = data.get('pin')
    amount = data.get('amount')
    result = bank_system.withdraw(pin, amount)
    return jsonify(result)


@app.route('/bill_payment', methods=['POST'])
def bill_payment():
    data = request.json
    pin = data.get('pin')
    bill_type = data.get('type')
    amount = data.get('amount')
    result = bank_system.bill_payment(pin, bill_type, amount)
    return jsonify(result)


@app.route('/view_transaction_log', methods=['POST'])
def view_transaction_log():
    data = request.json
    pin = data.get('pin')
    result = bank_system.view_transaction_log(pin)
    return jsonify(result)


@app.route('/insurance', methods=['POST'])
def insurance():
    data = request.json
    pin = data.get('pin')
    insurance_type = data.get('type')
    amount = data.get('amount')
    result = bank_system.insurance(pin, insurance_type, amount)
    return jsonify(result)


@app.route('/loan', methods=['POST'])
def loan():
    data = request.json
    pin = data.get('pin')
    loan_type = data.get('type')
    amount = data.get('amount')
    result = bank_system.loan(pin, loan_type, amount)
    return jsonify(result)


@app.route('/cheque', methods=['POST'])
def cheque():
    data = request.json
    pin = data.get('pin')
    cheque_type = data.get('type')
    amount = data.get('amount')
    result = bank_system.cheque(pin, cheque_type, amount)
    return jsonify(result)


if __name__ == '__main__':
    db_path = 'backend/database/bank.db'
    bank_system = BankSystem(db_path)
    app.run(debug=True)

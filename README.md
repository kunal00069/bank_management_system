# Bank Management System

## Overview
The Bank Management System is a simple application that allows users to create bank accounts, log in, deposit and withdraw funds, and view transaction logs. The application is built using Python with a Tkinter GUI for the backend and HTML, CSS, and JavaScript for the frontend.

## Project Structure
```
bank-management-system
├── backend
│   ├── main.py                # Main logic of the Bank Management System
│   ├── requirements.txt       # Python dependencies for the backend
│   └── database
│       └── bank.db           # SQLite database for storing user information
├── frontend
│   ├── index.html             # Main HTML document for the frontend
│   ├── styles.css             # CSS styles for the frontend
│   └── scripts.js             # JavaScript code for handling user interactions
├── README.md                  # Documentation for the project
└── .gitignore                 # Files and directories to be ignored by version control
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd bank-management-system
   ```

2. Navigate to the `backend` directory and install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage
1. Run the backend application:
   ```
   python backend/main.py
   ```

2. Open `frontend/index.html` in a web browser to access the user interface.

## Features
- User account creation
- User login
- Deposit and withdrawal functionality
- Transaction logging
- Simple and intuitive user interface

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
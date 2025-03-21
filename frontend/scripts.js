document.addEventListener('DOMContentLoaded', function () {
    const createAccountButton = document.getElementById('create-account-button');
    const loginButton = document.getElementById('login-button');
    const createAccountSection = document.getElementById('create-account');
    const loginSection = document.getElementById('login');
    const userDetails = document.getElementById('user-details');
    const createAccountForm = document.getElementById('create-account-form');
    // const loginForm = document.getElementById('login-form');
    const transactionLogContainer = document.getElementById('transaction-log-container');
    const logo = document.querySelector('.logo');

    const transactionLogModal = document.getElementById('transaction-log-modal');
    const depositModal = document.getElementById('deposit-modal');
    const withdrawModal = document.getElementById('withdraw-modal');
    const billPaymentModal = document.getElementById('bill-payment-modal');
    const loanModal = document.getElementById('loan-modal');
    const insuranceModal = document.getElementById('insurance-modal');
    const chequeModal = document.getElementById('cheque-modal');

    const closeTransactionLog = document.getElementById('close-transaction-log');
    const closeDeposit = document.getElementById('close-deposit');
    const closeWithdraw = document.getElementById('close-withdraw');
    const closeBillPayment = document.getElementById('close-bill-payment');
    const closeLoan = document.getElementById('close-loan');
    const closeInsurance = document.getElementById('close-insurance');
    const closeCheque = document.getElementById('close-cheque');

    let currentBalance = 0;

    // Function to open a modal
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    // Function to close a modal
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    createAccountButton.addEventListener('click', function () {
        createAccountSection.style.display = 'block';
        loginSection.style.display = 'none';
        userDetails.style.display = 'none';
    });

    loginButton.addEventListener('click', function () {
        loginSection.style.display = 'block';
        createAccountSection.style.display = 'none';
        userDetails.style.display = 'none';
    });

    logo.addEventListener('click', function () {
        createAccountSection.style.display = 'none';
        loginSection.style.display = 'none';
        userDetails.style.display = 'none';
    });

    document.getElementById('logout').addEventListener('click', function () {
        userDetails.style.display = 'none';
        loginSection.style.display = 'block';
        createAccountSection.style.display = 'none';
        loginForm.reset();
    });

    document.getElementById('deposit').addEventListener('click', function () {
        depositModal.style.display = 'block';
    });

    document.getElementById('withdraw').addEventListener('click', function () {
        withdrawModal.style.display = 'block';
    });

    document.getElementById('bill-payment').addEventListener('click', function () {
        billPaymentModal.style.display = 'block';
    });

    document.getElementById('loan').addEventListener('click', function () {
        loanModal.style.display = 'block';
    });

    document.getElementById('insurance').addEventListener('click', function () {
        insuranceModal.style.display = 'block';
    });

    document.getElementById('cheque').addEventListener('click', function () {
        chequeModal.style.display = 'block';
    });

    closeTransactionLog.addEventListener('click', function () {
        transactionLogModal.style.display = 'none';
    });

    closeDeposit.addEventListener('click', function () {
        depositModal.style.display = 'none';
    });

    closeWithdraw.addEventListener('click', function () {
        withdrawModal.style.display = 'none';
    });

    closeBillPayment.addEventListener('click', function () {
        billPaymentModal.style.display = 'none';
    });

    closeLoan.addEventListener('click', function () {
        loanModal.style.display = 'none';
    });

    closeInsurance.addEventListener('click', function () {
        insuranceModal.style.display = 'none';
    });

    closeCheque.addEventListener('click', function () {
        chequeModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === transactionLogModal) {
            transactionLogModal.style.display = 'none';
        }
        if (event.target === depositModal) {
            depositModal.style.display = 'none';
        }
        if (event.target === withdrawModal) {
            withdrawModal.style.display = 'none';
        }
        if (event.target === billPaymentModal) {
            billPaymentModal.style.display = 'none';
        }
        if (event.target === loanModal) {
            loanModal.style.display = 'none';
        }
        if (event.target === insuranceModal) {
            insuranceModal.style.display = 'none';
        }
        if (event.target === chequeModal) {
            chequeModal.style.display = 'none';
        }
    });

    document.getElementById('deposit-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const pin = prompt("Enter your PIN:");
        const amount = document.getElementById('deposit-amount').value;

        if (!pin || !amount || isNaN(amount) || amount <= 0) {
            alert("Invalid input!");
            return;
        }

        const userData = JSON.parse(localStorage.getItem(pin));
        if (userData) {
            userData.balance += parseInt(amount);
            userData.transactions.push(`Deposit: +${amount}, New Balance: ${userData.balance}`);
            localStorage.setItem(pin, JSON.stringify(userData));
            document.getElementById('current-balance').textContent = `Current Balance: ${userData.balance}`;
            alert("Deposit successful!");
            depositModal.style.display = 'none';
        } else {
            alert("Invalid PIN!");
        }
    });

    document.getElementById('withdraw-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const pin = prompt("Enter your PIN:");
        const amount = document.getElementById('withdraw-amount').value;

        if (!pin || !amount || isNaN(amount) || amount <= 0) {
            alert("Invalid input!");
            return;
        }

        const userData = JSON.parse(localStorage.getItem(pin));
        if (userData) {
            if (userData.balance < amount) {
                const remainingAmount = amount - userData.balance;
                if (remainingAmount > userData.salary) {
                    alert("Insufficient balance and salary!");
                    return;
                }
                userData.salary -= remainingAmount;
                userData.transactions.push(`Withdraw: -${amount}, New Balance: 0, Salary Deducted: -${remainingAmount}, Remaining Salary: ${userData.salary}`);
                userData.balance = 0;
            } else {
                userData.balance -= parseInt(amount);
                userData.transactions.push(`Withdraw: -${amount}, New Balance: ${userData.balance}`);
            }
            localStorage.setItem(pin, JSON.stringify(userData));
            document.getElementById('current-balance').textContent = `Current Balance: ${userData.balance}`;
            document.getElementById('user-salary').textContent = `Salary: ${userData.salary}`;
            alert("Withdrawal successful!");
            withdrawModal.style.display = 'none';
        } else {
            alert("Invalid PIN!");
        }
    });

    document.getElementById('bill-payment-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const pin = prompt("Enter your PIN:");
        const billType = document.getElementById('bill-type').value;
        const amount = document.getElementById('bill-amount').value;

        if (!pin || !amount || isNaN(amount) || amount <= 0) {
            alert("Invalid input!");
            return;
        }

        const userData = JSON.parse(localStorage.getItem(pin));
        if (userData) {
            if (userData.balance < amount) {
                const remainingAmount = amount - userData.balance;
                if (remainingAmount > userData.salary) {
                    alert("Insufficient balance and salary!");
                    return;
                }
                userData.salary -= remainingAmount;
                userData.transactions.push(`Bill Payment (${billType}): -${amount}, New Balance: 0, Salary Deducted: -${remainingAmount}, Remaining Salary: ${userData.salary}`);
                userData.balance = 0;
            } else {
                userData.balance -= parseInt(amount);
                userData.transactions.push(`Bill Payment (${billType}): -${amount}, New Balance: ${userData.balance}`);
            }
            localStorage.setItem(pin, JSON.stringify(userData));
            document.getElementById('current-balance').textContent = `Current Balance: ${userData.balance}`;
            document.getElementById('user-salary').textContent = `Salary: ${userData.salary}`;
            alert("Bill payment successful!");
            billPaymentModal.style.display = 'none';
        } else {
            alert("Invalid PIN!");
        }
    });

    // Handle form submissions for loan, insurance, and cheque
    document.getElementById('loan-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const pin = prompt("Enter your PIN:");
        const amount = document.getElementById('loan-amount').value;

        if (!pin || !amount || isNaN(amount) || amount <= 0) {
            alert("Invalid input!");
            return;
        }

        const userData = JSON.parse(localStorage.getItem(pin));
        if (userData) {
            userData.balance += parseInt(amount);
            userData.transactions.push(`Loan: +${amount}, New Balance: ${userData.balance}`);
            localStorage.setItem(pin, JSON.stringify(userData));
            document.getElementById('current-balance').textContent = `Current Balance: ${userData.balance}`;
            alert("Loan successful!");
            loanModal.style.display = 'none';
        } else {
            alert("Invalid PIN!");
        }
    });

    document.getElementById('insurance-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const pin = prompt("Enter your PIN:");
        const amount = document.getElementById('insurance-amount').value;

        if (!pin || !amount || isNaN(amount) || amount <= 0) {
            alert("Invalid input!");
            return;
        }

        const userData = JSON.parse(localStorage.getItem(pin));
        if (userData) {
            if (userData.balance < amount) {
                const remainingAmount = amount - userData.balance;
                if (remainingAmount > userData.salary) {
                    alert("Insufficient balance and salary!");
                    return;
                }
                userData.salary -= remainingAmount;
                userData.transactions.push(`Insurance: -${amount}, New Balance: 0, Salary Deducted: -${remainingAmount}, Remaining Salary: ${userData.salary}`);
                userData.balance = 0;
            } else {
                userData.balance -= parseInt(amount);
                userData.transactions.push(`Insurance: -${amount}, New Balance: ${userData.balance}`);
            }
            localStorage.setItem(pin, JSON.stringify(userData));
            document.getElementById('current-balance').textContent = `Current Balance: ${userData.balance}`;
            document.getElementById('user-salary').textContent = `Salary: ${userData.salary}`;
            alert("Insurance payment successful!");
            insuranceModal.style.display = 'none';
        } else {
            alert("Invalid PIN!");
        }
    });

    document.getElementById('cheque-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const pin = prompt("Enter your PIN:");
        const amount = document.getElementById('cheque-amount').value;

        if (!pin || !amount || isNaN(amount) || amount <= 0) {
            alert("Invalid input!");
            return;
        }

        const userData = JSON.parse(localStorage.getItem(pin));
        if (userData) {
            if (userData.balance < amount) {
                const remainingAmount = amount - userData.balance;
                if (remainingAmount > userData.salary) {
                    alert("Insufficient balance and salary!");
                    return;
                }
                userData.salary -= remainingAmount;
                userData.transactions.push(`Cheque: -${amount}, New Balance: 0, Salary Deducted: -${remainingAmount}, Remaining Salary: ${userData.salary}`);
                userData.balance = 0;
            } else {
                userData.balance -= parseInt(amount);
                userData.transactions.push(`Cheque: -${amount}, New Balance: ${userData.balance}`);
            }
            localStorage.setItem(pin, JSON.stringify(userData));
            document.getElementById('current-balance').textContent = `Current Balance: ${userData.balance}`;
            document.getElementById('user-salary').textContent = `Salary: ${userData.salary}`;
            alert("Cheque issued successfully!");
            chequeModal.style.display = 'none';
        } else {
            alert("Invalid PIN!");
        }
    });

    document.getElementById('create-account-button').addEventListener('click', function () {
        document.getElementById('create-account').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('user-details').style.display = 'none';
    });

    document.getElementById('login-button').addEventListener('click', function () {
        document.getElementById('create-account').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        document.getElementById('user-details').style.display = 'none';
    });

    document.getElementById('logout').addEventListener('click', function () {
        // Add logic to logout
        alert('Logged out');
    });
});
document.querySelectorAll('.service-button').forEach(button => {
    button.addEventListener('click', function () {
        const service = this.getAttribute('data-service');
        if (localStorage.getItem('loggedIn') === 'true') {
            window.location.href = `${service}.html`;
        } else {
            document.getElementById('create-account').style.display = 'block';
            document.getElementById('login').style.display = 'block';
            document.getElementById('user-details').style.display = 'none';
        }
    });
});

document.getElementById('create-account-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const salary = document.getElementById('salary').value;
    const pin = document.getElementById('pin').value;

    // localStorage.setItem(pin, JSON.stringify({ name, age, salary, balance: 0, transactions: [] }));
    fetch("http://127.0.0.1:5000/create_account", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, salary, pin })
    }).then(res => res.json()).then(() => {
        alert("Account Created successfully. Please login")
    })
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const loginName = document.getElementById('login-name').value;
    const loginPin = document.getElementById('login-pin').value;

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: loginName, pin: loginPin })
    }).then(res => res.json()).then(res => {
        if (res.error) {
            alert(res.error);
        }
        else {
            const userData = res
            localStorage.setItem('loggedIn', 'true');

            alert('Logged in successfully!');

            document.getElementById('user-name').textContent = `Name: ${userData.name}`;
            document.getElementById('user-age').textContent = `Age: ${userData.age}`;
            document.getElementById('user-salary').textContent = `Salary: ${userData.salary}`;
            document.getElementById('current-balance').textContent = `Current Balance: ${userData.balance}`;

            document.getElementById('login').style.display = 'none';
            document.getElementById('user-details').style.display = 'block';
        }
    })
});

document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('loggedIn');
    alert('Logged out successfully!');
    document.getElementById('user-details').style.display = 'none';
});
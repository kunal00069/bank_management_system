let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(type, amount) {
    const transaction = {
        type,
        amount,
        date: new Date().toLocaleString()
    };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function getTransactions() {
    return transactions;
}
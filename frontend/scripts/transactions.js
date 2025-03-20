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

async function getTransactions(pin) {
    const transactions = await fetch("http://127.0.0.1:5000/view_transaction_log", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin })
    }).then(res => res.json()).then(res => {
        const out = []
        for (r of res.transactions) {
            const [type, amount] = r.split(",")[0].split(":")
            out.push({ type, amount })
        }
        return out
    })

    return transactions
}
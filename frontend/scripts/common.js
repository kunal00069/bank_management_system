function addTransaction(action, amount, pin, type = null) {
    let body = { pin, amount };
    if (type) {
        body.type = type;
    }

    switch (action) {
        case "Deposit":
            fetch("http://127.0.0.1:5000/deposit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(() => fetchTransactionLog(pin));
            break;

        case "Withdraw":
            fetch("http://127.0.0.1:5000/withdraw", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(() => fetchTransactionLog(pin));
            break;

        case "billPayment":
            fetch("http://127.0.0.1:5000/bill_payment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(() => fetchTransactionLog(pin));
            break;

        case "cheque":
            fetch("http://127.0.0.1:5000/cheque", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(() => fetchTransactionLog(pin));
            break;

        case "insurance":
            fetch("http://127.0.0.1:5000/insurance", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(() => fetchTransactionLog(pin));
            break;

        case "loan":
            fetch("http://127.0.0.1:5000/loan", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(() => fetchTransactionLog(pin));
            break;

        case "transactions":
            fetch("http://127.0.0.1:5000/view_transaction_log", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(res => res.json()).then(() => fetchTransactionLog(pin));
            break;

        default:
            break;
    }
}

function fetchTransactionLog(pin) {
    fetch("http://127.0.0.1:5000/view_transaction_log", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin })
    })
    .then(res => res.json())
    .then(data => {
        const transactionLog = document.getElementById('transaction-log');
        transactionLog.innerHTML = '';
        data.transactions.forEach(transaction => {
            const transactionItem = document.createElement('li');
            transactionItem.textContent = transaction;
            transactionLog.appendChild(transactionItem);
        });
    });
}

function goBack() {
    const href= window.location.href;
    const href_split = href.split("/");
    href_split.pop();
    window.location.href = href_split.join("/");
    console.log("href",href, href_split);
}

function addTransaction(action, amount, pin) {
    switch (action) {
        case "Deposit":
            fetch("http://127.0.0.1:5000/deposit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;
        case "Withdraw":
            fetch("http://127.0.0.1:5000/withdraw", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;
        case "billPayment":
            fetch("http://127.0.0.1.5000/billPayment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;
        case "cheque":
            fetch("http://127.0.0.1.5000/cheque", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;
        case "insurance":
            fetch("http://127.0.0.1.5000/insurance", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;
        case "loan":
            fetch("http://127.0.0.1.5000/loan", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;
        case "withdrawal":
            fetch("http://127.0.0.1.5000/withdrawal", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;  
        case "transactions":
            fetch("http://127.0.0.1.5000/transactions", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
        default:
            break;
    }
}
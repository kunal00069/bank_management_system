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
            fetch("http://127.0.0.1:5000/bill_payment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;

        case "cheque":
            fetch("http://127.0.0.1:5000/cheque", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;

        case "insurance":
            fetch("http://127.0.0.1:5000/insurance", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;

        case "loan":
            fetch("http://127.0.0.1:5000/loan", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin, amount })
            }).then(res => res.json())
            break;

        case "transactions":
            fetch("http://127.0.0.1:5000/view_transaction_log", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin })
            }).then(res => res.json())
            break;

        default:
            break;
    }
}

function goBack() {
    const href = window.location.href;
    const href_split = href.split("/");
    href_split.pop();
    window.location.href = href_split.join("/");
    console.log("href",href, href_split)
}
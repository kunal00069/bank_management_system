
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
        default:
            break;
    }
}
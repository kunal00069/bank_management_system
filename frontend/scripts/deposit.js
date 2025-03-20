document.getElementById('deposit-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const amount = document.getElementById('deposit-amount').value;
    addTransaction('Deposit', amount, pin);
    alert(`Deposited: ${amount}`);
});
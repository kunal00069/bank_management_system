document.getElementById('deposit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('deposit-amount').value;
    addTransaction('Deposit', amount);
    alert(`Deposited: ${amount}`);
});
document.getElementById('withdraw-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const amount = document.getElementById('withdraw-amount').value;
    addTransaction('Withdraw', amount,pin);
    alert(`Withdrawn: ${amount}`);
});
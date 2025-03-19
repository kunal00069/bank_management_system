document.getElementById('withdraw-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('withdraw-amount').value;
    addTransaction('Withdraw', amount);
    alert(`Withdrawn: ${amount}`);
});
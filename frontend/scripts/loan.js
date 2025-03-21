document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const amount = document.getElementById('loan-amount').value;
    addTransaction('Loan', amount, pin);
    alert(`Loan applied for: ${amount}`);
});
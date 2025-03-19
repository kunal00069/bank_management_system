document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('loan-amount').value;
    addTransaction('Loan', amount);
    alert(`Loan applied for: ${amount}`);
});
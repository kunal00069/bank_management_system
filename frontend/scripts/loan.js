document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const loanType = document.getElementById('loan-type').value;
    const amount = document.getElementById('loan-amount').value;
    addTransaction('loan', amount, pin, loanType);
    alert(`Applied for ${loanType} loan: ${amount}`);
});
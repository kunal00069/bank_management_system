document.getElementById('cheque-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const amount = document.getElementById('cheque-amount').value;
    addTransaction('Cheque', amount, pin);
    alert(`Cheque issued for: ${amount}`);
});
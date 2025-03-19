document.getElementById('cheque-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('cheque-amount').value;
    addTransaction('Cheque', amount);
    alert(`Cheque issued for: ${amount}`);
});
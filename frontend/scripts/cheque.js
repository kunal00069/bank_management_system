document.getElementById('cheque-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const chequeType = document.getElementById('cheque-type').value;
    const amount = document.getElementById('cheque-amount').value;
    addTransaction('cheque', amount, pin, chequeType);
    alert(`Cheque ${chequeType === 'issue' ? 'issued' : 'deposited'}: ${amount}`);
});
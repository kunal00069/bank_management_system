document.getElementById('bill-payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const billType = document.getElementById('bill-type').value;
    const amount = document.getElementById('bill-amount').value;
    addTransaction('billPayment', amount, pin, billType);
    alert(`Paid ${billType} bill: ${amount}`);
});
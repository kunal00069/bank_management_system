document.getElementById('bill-payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const billType = document.getElementById('bill-type').value;
    const amount = document.getElementById('bill-amount').value;
    addTransaction(`Bill Payment (${billType})`, amount, pin);
    alert(`Paid ${billType} bill: ${amount}`);
});
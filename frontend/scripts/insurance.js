document.getElementById('insurance-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pin = prompt('Enter your pin');
    const insuranceType = document.getElementById('insurance-type').value;
    const amount = document.getElementById('insurance-amount').value;
    addTransaction('insurance', amount, pin, insuranceType);
    alert(`Applied for ${insuranceType} insurance: ${amount}`);
});
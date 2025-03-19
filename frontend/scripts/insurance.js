document.getElementById('insurance-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const insuranceType = document.getElementById('insurance-type').value;
    const amount = document.getElementById('insurance-amount').value;
    addTransaction(`Insurance (${insuranceType})`, amount);
    alert(`Applied for ${insuranceType} insurance: ${amount}`);
});
const input = document.getElementById("howMuch")

function b1(event){
    event.preventDefault();
    input.value="10.00"
}

function b2(event){
    event.preventDefault();
    input.value="20.00"
}

function b3(event){
    event.preventDefault();
    input.value="50.00"
}

function b4(event){
    event.preventDefault();
    input.value="100.00"
}

function b5(event){
    event.preventDefault();
    input.value="250.00"
}

function b6(event){
    event.preventDefault();
    input.value="500.00"
}

const emailInput = document.getElementById("email");
const depositBtn = document.getElementById("submit");
const balanceElem = document.getElementById("balance_amount");

depositBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const howMuch = parseFloat(input.value);

    if (!email) {
        alert("Please enter your email address.");
        return;
    }
    if (isNaN(howMuch) || howMuch <= 1) {
        alert("Please enter an amount greater than 1$.");
        return;
    }

    // Get current saldo
    let currentSaldo = Number(balanceElem.textContent.replace(/,/g, ''));
    let newSaldo = currentSaldo + (howMuch * 414);

    // Update saldo in backend
    fetch('php/update_saldo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'saldo=' + encodeURIComponent(newSaldo)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            balanceElem.textContent = Number(data.saldo).toFixed(2);
            alert("Deposit successful! Please Donate!");
            window.location.href = "https://tipo.live/p/isar";
        } else {
            alert('Failed to update saldo: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(() => {
        alert('Failed to update saldo (network error)');
    });
});
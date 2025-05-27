let stackingrotate = 0

function rotateObject(event){
    const wheel = document.getElementById("wheel")
    const button = document.getElementById("submit")
    const input = document.getElementById("input")
    const bet = Number(document.getElementById("input").value)

    if (bet > window.userSaldo) {
        alert("Not enough balance!");
        return;
    }

    // Decrease saldo and update backend
    let currentSaldo = typeof window.userSaldo !== "undefined" ? window.userSaldo : 0;
    const newSaldo = currentSaldo - bet;
    fetch("../php/update_saldo.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `saldo=${encodeURIComponent(newSaldo)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("balance_amount").textContent = Number(data.saldo).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
            window.userSaldo = data.saldo;
        } else {
            alert("Error updating balance: " + data.error);
        }
    });

    const audio = new Audio('/spin.mp3')
    audio.play()
    button.style.cursor = `default`
    let cyfra = Math.floor(Math.random() * 360)
    if(cyfra>0 && cyfra<15)
        cyfra -= Math.floor(Math.random() * 25)
    if(cyfra>15 && cyfra<30)
        cyfra += Math.floor(Math.random() * 25)
    if(cyfra%30==0){
        cyfra+=1
    }
    
    const rotate = cyfra + 3600
    stackingrotate += rotate
    wheel.style.transform = `rotate(${stackingrotate}deg)`

    const rest =  stackingrotate%360
    let multiplayer

    if(rest>0 && rest<30)
        multiplayer = 5
    else if(rest>30 && rest<60)
        multiplayer = 2
    else if(rest>60 && rest<90)
        multiplayer = 1.5
    else if(rest>90 && rest<120)
        multiplayer = 0.7
    else if(rest>120 && rest<150)
        multiplayer = 1
    else if(rest>150 && rest<180)
        multiplayer = 0.4
    else if(rest>180 && rest<210)
        multiplayer = 2
    else if(rest>210 && rest<240)
        multiplayer = 1.5
    else if(rest>240 && rest<270)
        multiplayer = 0.8
    else if(rest>270 && rest<300)
        multiplayer = 1
    else if(rest>300 && rest<330)
        multiplayer = 0.9
    else
        multiplayer = 0

    button.disabled = true
    input.disabled = true
    setTimeout(() => {
        console.log(multiplayer)
        console.log((bet*multiplayer).toFixed(2)) 
        let reward = (bet*multiplayer).toFixed(2)
        button.disabled = false
        input.disabled = false
        button.style.cursor = `pointer`
        const result = document.getElementById("score")
        result.textContent = `You won: ${reward}`
        result.style.color = `green`
        result.style.height = `100%`
        result.style.width = `100%`
        let rewardValue = Number((bet * multiplayer).toFixed(2));
        let updatedSaldo = (typeof window.userSaldo !== "undefined" ? Number(window.userSaldo) : 0) + rewardValue;
        fetch("../php/update_saldo.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `saldo=${encodeURIComponent(updatedSaldo)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("balance_amount").textContent = Number(data.saldo).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                window.userSaldo = data.saldo;
            } else {
                alert("Error updating balance: " + data.error);
            }
        });
    }, 9500)
}

gameEnds = () => {
    const result = document.getElementById("score")
    result.textContent = ``
    result.style.height = `0%`
    result.style.width = `0%`
}

window.rotateObject = rotateObject;
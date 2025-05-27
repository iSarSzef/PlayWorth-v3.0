const placebet = document.getElementById("input");
const startgameButton = document.getElementById("submit");
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
let q,w,e;
let v1,v2,v3;
let moneywon = 0;
const bet = placebet.value;
let result_sound
let userSaldo = Number(document.getElementById("balance_amount")?.textContent?.replace(/,/g, '') || 0);

function updateSaldo(newSaldo) {
    fetch('/php/update_saldo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'saldo=' + encodeURIComponent(newSaldo)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            userSaldo = data.saldo;
            const balanceAmount = document.getElementById("balance_amount");
            if (balanceAmount) {
                balanceAmount.textContent = Number(userSaldo).toFixed(2);
            }
        } else {
            alert("Failed to update saldo: " + (data.error || "Unknown error"));
        }
    })
    .catch(() => {
        alert("Failed to update saldo (network error)");
    });
}

function startgame(event) {
    event.preventDefault();
    const bet = Number(placebet.value);

    if (bet > userSaldo) {
        alert("Not enough balance!");
        return;
    }

    // Decrease saldo and update DB/UI
    if (typeof userSaldo !== "undefined") {
        const newSaldo = userSaldo - bet;
        updateSaldo(newSaldo);
    }

    startgameButton.disabled = true;
    startgameButton.style.cursor = "not-allowed";
    placebet.disabled = true;
    placebet.style.cursor = "not-allowed";
    spinanimation();
    moneywon = bet;
}

async function spinanimation(){
    const startSound = new Audio('/others/slot/pull.mp3');
    startSound.play();
    await sleep(500);
    const spinSound = new Audio('/others/slot/spin.wav');
    spinSound.play();
    slot1.style.backgroundImage = "url('/others/slot/Bars.jpg')";
    await sleep(80);
    slot1.style.backgroundImage = "url('/others/slot/Bell.jpg')";
    await sleep(70);
    slot1.style.backgroundImage = "url('/others/slot/Cherry.jpg')";
    slot2.style.backgroundImage = "url('/others/slot/Bars.jpg')";
    await sleep(60);
    slot1.style.backgroundImage = "url('/others/slot/Diamond.jpg')";
    slot2.style.backgroundImage = "url('/others/slot/Bell.jpg')";
    for(let i = 0; i < 8; i++){
        await sleep(50);
        slot1.style.backgroundImage = "url('/others/slot/Heart.jpg')";
        slot2.style.backgroundImage = "url('/others/slot/Cherry.jpg')";
        slot3.style.backgroundImage = "url('/others/slot/Bars.jpg')";
        await sleep(50);
        slot1.style.backgroundImage = "url('/others/slot/Melon.jpg')";
        slot2.style.backgroundImage = "url('/others/slot/Diamond.jpg')";
        slot3.style.backgroundImage = "url('/others/slot/Bell.jpg')";
        await sleep(50);
        slot1.style.backgroundImage = "url('/others/slot/Seven.jpg')";
        slot2.style.backgroundImage = "url('/others/slot/Heart.jpg')";
        slot3.style.backgroundImage = "url('/others/slot/Cherry.jpg')";
        await sleep(50);
        slot1.style.backgroundImage = "url('/others/slot/Bars.jpg')";
        slot2.style.backgroundImage = "url('/others/slot/Melon.jpg')";
        slot3.style.backgroundImage = "url('/others/slot/Diamond.jpg')";
        await sleep(50);
        slot1.style.backgroundImage = "url('/others/slot/Bell.jpg')";
        slot2.style.backgroundImage = "url('/others/slot/Seven.jpg')";
        slot3.style.backgroundImage = "url('/others/slot/Heart.jpg')";
        await sleep(50);
        slot1.style.backgroundImage = "url('/others/slot/Cherry.jpg')";
        slot2.style.backgroundImage = "url('/others/slot/Bars.jpg')";
        slot3.style.backgroundImage = "url('/others/slot/Melon.jpg')";
        await sleep(50);
        slot1.style.backgroundImage = "url('/others/slot/Diamond.jpg')";
        slot2.style.backgroundImage = "url('/others/slot/Bell.jpg')";
        slot3.style.backgroundImage = "url('/others/slot/Seven.jpg')";
    }
    q = Math.floor(Math.random() * 7) + 1;
    w = Math.floor(Math.random() * 7) + 1;
    e = Math.floor(Math.random() * 7) + 1;
    console.log(q);
    console.log(w);
    console.log(e);
    q = values(q);
    w = values(w);
    e = values(e);
    console.log(q);
    console.log(w);
    console.log(e);
    v1 = showvalue(q);
    v2 = showvalue(w);
    v3 = showvalue(e);
    console.log(v1);
    console.log(v2);
    console.log(v3);
    await sleep(50);
    slot1.style.backgroundImage = v1;
    slot2.style.backgroundImage = "url('/others/slot/Cherry.jpg')";
    slot3.style.backgroundImage = "url('/others/slot/Bars.jpg')";
    await sleep(50);
    slot2.style.backgroundImage = "url('/others/slot/Diamond.jpg')";
    slot3.style.backgroundImage = "url('/others/slot/Bell.jpg')";
    await sleep(50);
    slot2.style.backgroundImage = v2;
    slot3.style.backgroundImage = "url('/others/slot/Melon.jpg')";
    await sleep(50);
    slot3.style.backgroundImage = "url('/others/slot/Seven.jpg')";
    await sleep(50);
    slot3.style.backgroundImage = v3;
    let results = result(q,w,e)
    result_sound.play();
    await sleep(250);
    const score = document.getElementById("score");
    score.textContent = results;

    score.style.color = "white";
    score.style.height = "100%";
    score.style.width = "100%";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function values(x){
    if(x<6)
        return x
    else if(x==6)
        return (Math.floor(Math.random() * 6) + 1);
    else if(x==7)
        return (Math.floor(Math.random() * 7) + 1);
}

function showvalue(x){
    if(x==1)
        return "url('/others/slot/Bars.jpg')";  
    else if(x==2)
        return "url('/others/slot/Bell.jpg')";
    else if(x==3)
        return "url('/others/slot/Melon.jpg')";
    else if(x==4)
        return "url('/others/slot/Diamond.jpg')";
    else if(x==5)
        return "url('/others/slot/Heart.jpg')";
    else if(x==6)
        return "url('/others/slot/Cherry.jpg')";
    else if(x==7)
        return "url('/others/slot/Seven.jpg')";
}

function result(x,y,z){
    result_sound = new Audio('/others/slot/coin.mp3');
    // Jackpot: Three Sevens
    if (x == y && y == z && z == 7) {
        result_sound = new Audio('/others/slot/jackpot.wav');
        moneywon = moneywon * 500;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Jackpot!!! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Mini Jackpot: Three Cherries
    else if (x == y && y == z && z == 6) {
        moneywon = moneywon * 100;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Mini Jackpot! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Three of a kind (other symbols)
    else if (x == y && y == z && z < 6) {
        moneywon = moneywon * 30;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Three of a kind! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Two of a kind + Cherries
    else if ((x == y && z == 6) || (x == z && y == 6) || (y == z && x == 6)) {
        moneywon = moneywon * 4;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Two of a kind + Cherries! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Two of a kind + Seven
    else if ((x == y && z == 7) || (x == z && y == 7) || (y == z && x == 7)) {
        moneywon = moneywon * 5;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Two of a kind + Seven! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Two of a kind (other symbols)
    else if ((x == y && z < 6 && z != y) || (x == z && y < 6 && y != z) || (y == z && x < 6 && x != z)) {
        moneywon = moneywon * 3;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Two of a kind! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Two Sevens + Cherries
    else if ((x == y && x == 7 && z == 6) || (x == z && x == 7 && y == 6) || (y == z && y == 7 && x == 6)) {
        moneywon = moneywon * 40;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Two Sevens + Cherries! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Two Cherries + Seven
    else if ((x == y && x == 6 && z == 7) || (x == z && x == 6 && y == 7) || (y == z && y == 6 && x == 7)) {
        moneywon = moneywon * 20;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Two Cherries + Seven! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Two Sevens
    else if ((x == y && x == 7 && z < 6) || (x == z && x == 7 && y < 6) || (y == z && y == 7 && x < 6)) {
        moneywon = moneywon * 10;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Two Sevens! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Two Cherries
    else if ((x == y && x == 6 && z < 6) || (x == z && x == 6 && y < 6) || (y == z && y == 6 && x < 6)) {
        moneywon = moneywon * 10;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Two Cherries! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Seven + Cherries
    else if (
        (x == 6 && y == 7 && z < 6) || (x == 7 && y == 6 && z < 6) ||
        (y == 6 && z == 7 && x < 6) || (y == 7 && z == 6 && x < 6) ||
        (z == 6 && x == 7 && y < 6) || (z == 7 && x == 6 && y < 6)
    ) {
        moneywon = moneywon * 8;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Seven + Cherries! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Single Seven
    else if ((x == 7 && x != y && x != z) || (y == 7 && y != x && y != z) || (z == 7 && z != x && z != y)) {
        moneywon = moneywon * 3;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Seven! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Single Cherries
    else if ((x == 6 && x != y && x != z) || (y == 6 && y != x && y != z) || (z == 6 && z != x && z != y)) {
        moneywon = moneywon * 2;
        updateSaldo(userSaldo + (moneywon - Number(placebet.value)));
        return `Cherries! You won ${moneywon - Number(placebet.value)} tokens`;
    }
    // Lose
    else {
        result_sound = new Audio('/others/slot/lose.mp3');
        return `You lose! You lost ${Number(placebet.value)} tokens`;
    }
}

function gameEnds(){
    startgameButton.disabled = false;
    startgameButton.style.cursor = "pointer";
    placebet.disabled = false;
    placebet.style.cursor = "text";
    const score = document.getElementById("score");
    score.textContent = "";
    score.style.height = "0%";
    score.style.width = "0%";
}


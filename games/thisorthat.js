let cards = []
const container = document.getElementById("choice")
const card_container = document.getElementById("parent")
const button = document.getElementById("submit")
const input = document.getElementById("input")
const h1 = document.getElementById("h1")
const restore = document.getElementsByClassName("card")
let moneywon
let stackingrotate = 0
let userSaldo = Number(document.getElementById("balance_amount")?.textContent?.replace(/,/g, '') || 0);

function shufflecardsandstartgame(event){
    cards = []
    for (let i = 1; i <= 52; i++) {
        cards.push(i)
    }

    event.preventDefault()
    const bet = Number(document.getElementById("input").value)

    if (bet > userSaldo) {
        alert("Not enough balance!");
        return;
    }

    moneywon = bet;

    // Update saldo: subtract bet, update DB, and refresh UI
    if (typeof userSaldo !== "undefined") {
        const newSaldo = userSaldo - bet;
        userSaldo = newSaldo;
        updateSaldo(newSaldo);
    }

    let j
    let i = 0
    for (i; i < cards.length; i++) {
        j = Math.floor(Math.random() * (cards.length - i)) + i;
        [cards[i], cards[j]] = [cards[j], cards[i]]
    }
    console.log(cards)
    
    const Red = document.createElement("button")
    Red.textContent = "Red"
    Red.id = "Red"
    Red.className = "button"
    Red.onclick = RedChosen
    
    
    const Black = document.createElement("button")
    Black.textContent = "Black"
    Black.id = "Black"
    Black.className = "button"
    Black.onclick = BlackChosen

    const container = document.getElementById("choice")
    container.innerHTML = "";
    container.appendChild(Red)
    container.appendChild(Black)   
    button.disabled = true
    input.disabled = true
    button.style.cursor = `default` 
}

function RedChosen() {
    container.innerHTML = "";
    if(cards[0]>0 && cards[0]<27){
        ShowCard(0)
        moneywon*=1.5
        roundtwo()
    }
    else
        lose()
}

function BlackChosen() {
    container.innerHTML = "";
    if(cards[0]>0 && cards[0]<27)
        lose()
    else{
        ShowCard(0)
        moneywon*=1.5
        roundtwo()
    }
        
}

function roundtwo(){
    const Higher = document.createElement("button")
    Higher.textContent = "Higher"
    Higher.id = "Higher"
    Higher.className = "button"
    Higher.onclick = HigherChosen
    h1.textContent = "Higher or Lower?"
    const Lower = document.createElement("button")
    Lower.textContent = "Lower"
    Lower.id = "Lower"
    Lower.className = "button"
    Lower.onclick = LowerChosen
    container.appendChild(Higher)   
    SurrenderButton()
    container.appendChild(Lower)
}

function HigherChosen(){
    container.innerHTML = ""
    const previousrank = ((cards[0] - 1) % 13) + 1
    if(((cards[1] - 1) % 13) + 1 >= previousrank){
        ShowCard(1)
        moneywon*=1.5
        roundthree()
    }
    else
        lose()
}

function LowerChosen(){
    container.innerHTML = ""
    const previousrank = ((cards[0] - 1) % 13) + 1
    if(((cards[1] - 1) % 13) + 1 <= previousrank){
        ShowCard(1)
        moneywon*=1.5
        roundthree()
    }
    else
        lose()
}

function roundthree(){
    const Inside = document.createElement("button")
    Inside.textContent = "Inside"
    Inside.id = "Inside"
    Inside.className = "button"
    Inside.onclick = InsideChosen
    let firstrank = ((cards[0] - 1) % 13) + 1
    let secondrank = ((cards[1] - 1) % 13) + 1
    if(firstrank > secondrank){
        const temp = firstrank
        firstrank = secondrank
        secondrank = temp
    }
    h1.textContent = "Inside or Outside?"
    
    const Outside = document.createElement("button")
    Outside.textContent = "Outside"
    Outside.id = "Outside"
    Outside.className = "button"
    Outside.onclick = OutsideChosen
    container.appendChild(Inside)   
    SurrenderButton()
    container.appendChild(Outside)
}

function InsideChosen(){
    container.innerHTML = ""
    const firstrank = ((cards[0] - 1) % 13) + 1
    const secondrank = ((cards[1] - 1) % 13) + 1
    const thirdrank = ((cards[2] - 1) % 13) + 1
    if((thirdrank <= secondrank && thirdrank >= firstrank) || (thirdrank >= secondrank && thirdrank <= firstrank)){
        ShowCard(2)
        moneywon*=1.5
        finalround()
    }
    else
        lose()
}

function OutsideChosen(){
    container.innerHTML = ""
    const firstrank = ((cards[0] - 1) % 13) + 1
    const secondrank = ((cards[1] - 1) % 13) + 1
    const thirdrank = ((cards[2] - 1) % 13) + 1
    if((thirdrank <= secondrank && thirdrank >= firstrank) || (thirdrank >= secondrank && thirdrank <= firstrank))
        lose()
    else{
        ShowCard(2)
        moneywon*=1.5
        finalround()
    }
}

function finalround(){
    h1.textContent = "Choose a suit!"
    const Spades = document.createElement("button")
    Spades.textContent = "Spades"
    Spades.id = "Spades"
    Spades.className = "button"
    Spades.onclick = SpadesChosen

    const Hearts = document.createElement("button")
    Hearts.textContent = "Hearts"
    Hearts.id = "Hearts"
    Hearts.className = "button"
    Hearts.onclick = HeartsChosen

    const Diamonds = document.createElement("button")
    Diamonds.textContent = "Diamonds"
    Diamonds.id = "Diamonds"
    Diamonds.className = "button"
    Diamonds.onclick = DiamondsChosen

    const Clubs = document.createElement("button")
    Clubs.textContent = "Clubs"
    Clubs.id = "Clubs"
    Clubs.className = "button"
    Clubs.onclick = ClubsChosen

    container.appendChild(Hearts)
    container.appendChild(Diamonds)
    container.appendChild(Clubs)
    container.appendChild(Spades)
    SurrenderButton()
}

function HeartsChosen(){
    container.innerHTML = ""
    if(cards[3]>=1 && cards[3]<=13){
        ShowCard(3)
        moneywon*=2
        win()
    }
    else
        lose()
}

function DiamondsChosen(){
    container.innerHTML = ""
    if(cards[3]>=14 && cards[3]<=26){
        ShowCard(3)
        moneywon*=2
        win()
    }
    else
        lose()
}

function ClubsChosen(){
    container.innerHTML = ""
    if(cards[3]>=27 && cards[3]<=39){
        ShowCard(3)
        moneywon*=2
        win()
    }
    else
        lose()
}

function SpadesChosen(){
    container.innerHTML = ""
    if(cards[3]>=40 && cards[3]<=52){
        ShowCard(3)
        moneywon*=2
        win()
    }
    else
        lose()
}

function SurrenderButton(){
    const Surrender = document.createElement("button")
    Surrender.textContent = "Give up"
    Surrender.id = "Surrender"
    Surrender.onclick = SurrenderChosen
    container.appendChild(Surrender)
}

function SurrenderChosen() {
    container.innerHTML = ""
    const result = document.getElementById("score")
    result.textContent = `You gave up, take your ${moneywon} and get out!`
    result.style.color = `orange`
    result.style.height = `100%`
    result.style.width = `100%`
    result.onclick = gameEnds

    if (typeof userSaldo !== "undefined") {
        const newSaldo = userSaldo + moneywon;
        userSaldo = newSaldo;
        updateSaldo(newSaldo);
    }
}

function ShowCard(r){
    const showed_card = document.getElementById("current_card")
    let img_url = "/others/Cards/" + cards[r] + ".png"
    let newID = "shown_card" + (r+1)
    showed_card.id = newID
    const new_card = document.createElement("div")
    new_card.id = "current_card"
    new_card.className = "card"
    if(r+1 != 4){
        card_container.appendChild(new_card)
    }
    const result = document.getElementById("score")
    result.style.height = `100%`
    result.style.width = `100%`
    result.style.backgroundColor = `rgba(0,0,0,0)`
    if(r+1 != 4){
        setTimeout(() => {
            result.style.backgroundColor = `rgba(0,0,0,0.85)`
            result.style.height = `0%`
            result.style.width = `0%`
        },1500)
    }
    stackingrotate+=360
    showed_card.style.transform = `rotateY(${stackingrotate}deg)`
    setTimeout(() => {
        showed_card.style.backgroundImage = `url("${img_url}")`
    }, 1500)    
}
    

function lose(){
    const result = document.getElementById("score")
    result.textContent = `You lost!`
    result.style.color = `red`
    result.style.height = `100%`
    result.style.width = `100%`
    result.onclick = gameEnds
}

function win(){
    const result = document.getElementById("score")
    result.textContent = `You won ${moneywon}!`
    result.style.color = `green`
    result.style.height = `100%`
    result.style.width = `100%`
    result.style.backgroundColor = `rgba(0,0,0,0.85)`
    console.log(result.style.width)
    console.log(result.style.height)
    console.log(result.style.backgroundColor)
    result.onclick = gameEnds
    console.log(result.style.width)
    console.log(result.style.height)
    console.log(result.style.backgroundColor)
    if (typeof userSaldo !== "undefined") {
        const newSaldo = userSaldo + moneywon;
        userSaldo = newSaldo;
        updateSaldo(newSaldo);
    }
    console.log(result.style.width)
    console.log(result.style.height)
    console.log(result.style.backgroundColor)
}

function gameEnds() {
    const result = document.getElementById("score");
    result.textContent = "";
    result.style.height = `0%`;
    result.style.width = `0%`;
    result.style.backgroundColor = `rgba(0,0,0,0)`;

    const parent = document.getElementById("parent");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.id = "current_card";
    newCard.style.transform = "rotateY(0deg)";
    newCard.style.backgroundImage = 'url("/others/Cards/back.png")';
    parent.appendChild(newCard);

    const container = document.getElementById("choice");
    container.innerHTML = "";
    button.disabled = false;
    input.disabled = false;
    button.style.cursor = `pointer`;
    stackingrotate = 0;
    h1.textContent = "Red or Black?";
}

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
            // Update the balance in the header
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
let cards = [];
let current_card = 1;
let player_score = 0, opp_score = 0;
const ur_score = document.getElementById("ur")
const cr_score = document.getElementById("opp")
const croupiers_deck = document.getElementById("croupier_cards")
const ur_deck = document.getElementById("your_cards")
const temp0 = document.getElementById("temp0");
const temp1 = document.getElementById("temp1");
const temp2 = document.getElementById("temp2");
const temp3 = document.getElementById("temp3");
let moneywon;
let aces = 0, opp_aces;
let bet = 0; // <-- Add this line

function startgame(event) {
  cards = [];
  for (let i = 1; i <= 52; i++) {
    cards.push(i);
  }

  event.preventDefault();
  bet = Number(document.getElementById("input").value); // <-- Store bet globally

  // Use saldo from PHP session (set in window.userSaldo)
  let currentSaldo = typeof window.userSaldo !== "undefined" ? window.userSaldo : 0;

  // Check if bet is greater than saldo
  if (bet > currentSaldo) {
      alert("Not enough balance!");
      return;
  }

  // Decrease saldo and update backend
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

  moneywon = bet; // Only the winnings

  const input = document.getElementById("input");
  input.disabled = true;
  input.style.cursor = `not-allowed`;
  const submit = document.getElementById("submit");
  submit.disabled = true;
  submit.style.cursor = `not-allowed`;

  let j;
  let i = 0;
  for (i; i < cards.length; i++) {
    j = Math.floor(Math.random() * (cards.length - i)) + i;
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  console.log(cards);

  const hit = document.createElement("div");
  hit.id = "hit";
  hit.className = "button";
  hit.onclick = hitchosen;
  hit.textContent = "Hit";

  const stand = document.createElement("div");
  stand.id = "stand";
  stand.className = "button";
  stand.onclick = standchosen;
  stand.textContent = "Stand";

  const controls = document.getElementById("controls");
  controls.appendChild(hit);
  controls.appendChild(stand);

  ur_deck.appendChild(addcard(0));
  croupiers_deck.appendChild(addcard(1));
  ur_deck.appendChild(addcard(0));

  temp0.remove();
  temp1.remove();
  temp2.remove();
  temp3.remove();

  croupiers_deck.appendChild(temp0);

  if (player_score > 21 && aces > 0) {
    player_score -= 10;
    aces -= 1;
  }

  ur_score.textContent = `You: ${player_score}`;
  cr_score.textContent = `Dealer: ${opp_score}`;
  if(player_score==21){
    standchosen()
    if(opp_score<21 || opp_score>21)
        win()
    else
        lose()
  }
}

function hitchosen() {
    ur_deck.appendChild(addcard())
    if (player_score > 21 && aces > 0) {
        player_score -= 10;
        aces -= 1;
    }
  ur_score.textContent = `You: ${player_score}`;
    if(player_score>21)
        lose()
    else if(player_score==21){
        standchosen()
    }
}

async function standchosen() {
  const hit = document.getElementById("hit");
  const stand = document.getElementById("stand");
  hit.disabled = true;
  hit.style.cursor = `not-allowed`;
  stand.disabled = true;
  stand.style.cursor = `not-allowed`;
    show_hidden()
    do{
        await sleep(900);

        if(opp_score<17){
            croupiers_deck.appendChild(addcard(1))
        }
        if(opp_score==21){
            cr_score.textContent = `Dealer: ${opp_score}`;
            lose()
            break
        }
        if(opp_score>16 && opp_aces>0){
            opp_aces-=1
            opp_score-=10
        }
        if(opp_score>16){
            cr_score.textContent = `Dealer: ${opp_score}`;
            break
        }
    }while(opp_score<17)
    if(opp_score>player_score && opp_score<=21)
        lose()
    else if(opp_score>16)
        win()
    else if(opp_score==player_score){
        alert("push!")
    }
}

function lose(){
    const score = document.getElementById("score");
    score.textContent = `You lost! Better Luck Next Time!`;
    score.style.color = "red";
    score.style.height = `100%`;
    score.style.width = `100%`;
    const controls = document.getElementById("controls");
    const hit = document.getElementById("hit");
    const stand = document.getElementById("stand");
    controls.removeChild(hit);
    controls.removeChild(stand);
    const input = document.getElementById("input");
    input.disabled = false;
    input.style.cursor = `default`;
    const submit = document.getElementById("submit");
    submit.disabled = false;
    submit.style.cursor = `pointer`;
}

function win(){
    const score = document.getElementById("score");
    score.textContent = `You won! You earned ${moneywon}`;
    score.style.color = `lime`;
    score.style.height = `100%`;
    score.style.width = `100%`;
    const controls = document.getElementById("controls");
    const hit = document.getElementById("hit");
    const stand = document.getElementById("stand");
    controls.removeChild(hit);
    controls.removeChild(stand);
    const input = document.getElementById("input");
    input.disabled = false;
    input.style.cursor = `default`;
    const submit = document.getElementById("submit");
    submit.disabled = false;
    submit.style.cursor = `pointer`;

    // Add bet*2 to the current saldo (which is already reduced by bet)
    let currentSaldo = typeof window.userSaldo !== "undefined" ? window.userSaldo : 0;
    const newSaldo = currentSaldo + bet * 2;
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
}

function addcard(x) {
  let value = ((cards[current_card] - 1) % 13) + 2;
  if (value == 11 || value == 12 || value == 13) value = 10;
  if (value == 14) {
    value = 11;
  }

  if (x==1) {
    opp_score += value
    console.log(value)
  }
  else {
    player_score += value;
    if (value == 11) {
      aces += 1;
    }
  }

  const newcard = document.createElement("div");
  newcard.className = "card";
  let img_url = "../others/Cards/" + cards[current_card] + ".png";
  current_card += 1;

  setTimeout(() => {
    newcard.style.transform = `rotateY(360deg)`
    newcard.style.backgroundImage = `url("${img_url}"`
  }, 0)

  return newcard;
}

function show_hidden(){
  let value = ((cards[0] - 1) % 13) + 2;
  if (value == 11 || value == 12 || value == 13) value = 10;
  if (value == 14) {
    value = 11;
    opp_aces+=1;
  }
  opp_score += value;

  const temp0 = document.getElementById("temp0");
  temp0.remove();
  
  const newcard2 = document.createElement("div");
  newcard2.className = "card";
  let img_url2 = "../others/Cards/" + cards[0] + ".png"
  setTimeout(() => {
    newcard2.style.transform = `rotateY(360deg)`
    newcard2.style.backgroundImage = `url("${img_url2}"`
  }, 0)
  croupiers_deck.appendChild(newcard2)

  cr_score.textContent = `Dealer: ${opp_score}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function gameEnds(){
  const score = document.getElementById("score");
  score.textContent = ``;
  score.style.height = `0%`;
  score.style.width = `0%`;
  ur_score.textContent = `You:`;
  cr_score.textContent = `Dealer:`;
  croupiers_deck.innerHTML = "";
  croupiers_deck.appendChild(temp1);
  croupiers_deck.appendChild(temp0);
  ur_deck.innerHTML = "";
  ur_deck.appendChild(temp2);
  ur_deck.appendChild(temp3);
  player_score = 0;
  opp_score = 0;
  aces = 0;
  opp_aces = 0;
  current_card = 1;
  moneywon = 0;
}


const targetSequence = 'steve'
let inputSequence = ''
document.addEventListener('keydown', function(event) {

  if (/^[a-zA-Z]$/.test(event.key)) {
    inputSequence += event.key.toLowerCase()
    if (inputSequence.length > targetSequence.length) {
      inputSequence = inputSequence.slice(-targetSequence.length)
    }
    if (inputSequence === targetSequence) {
      easterEgg()
      inputSequence = ''
    }
  }
});

function easterEgg() {
  const steve = new Audio('/others/lava_chicken.mp3')
  steve.play()
  const img = document.createElement('img');
  img.src = '/others/steve.png';
  img.style.position = 'fixed';
  img.style.left = '50%';
  img.style.top = '50%';
  img.style.transform = 'translate(-50%, -50%) scale(2)';
  img.style.zIndex = 9999;
  img.style.transition = 'transform 17s';
  document.body.appendChild(img);

  let angle = 0;
  const spin = setInterval(() => {
    angle += 270;
    img.style.transform = `translate(-50%, -50%) scale(2) rotate(${angle}deg)`;
    if(angle >= 15*17*20.5*9){
      clearInterval(spin);
      img.remove()
    }
  }, 100);
}


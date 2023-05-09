

var dealerSum = 0
var spielerSum = 0
var hidden = 0
var karteZiehen = true

var deckWerte = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "D", "K"];
var type = ["Karo", "Herz", "Pik", "Kreuz"]
var deck = []

var siege = []
var siege1 = []

window.onload=function() {
    alleKarten()
    mischen()
    starten()
}

function weiter() {
    alleKarten()
    mischen()
    starten()
    updatePunkte()
}

function getValue(card){
    let data = card.split("-");
    let value = data[1];

    if(isNaN(value)){
        if(value=="A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function alleKarten(){
    for(let i=0; i < type.length; i++){
        for(let j=0; j < deckWerte.length; j++){
            deck.push(type[i]+"-"+deckWerte[j]);
        }
    }
}

function starten(){
    
    hidden = deck.pop()
    // console.log(deck)
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="bilder/"+card+".png";
        dealerSum += getValue(card);
        // dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg)
        document.getElementById("ergebnis-dealer").innerText="Summe: " + dealerSum
        
    }
    //console.log(dealerSum)
    
    for(let i=0; i<2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="bilder/"+card+".png";
        spielerSum += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg)
        document.getElementById("ergebnis-spieler").innerText="Summe: " + spielerSum
    }
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("halt").addEventListener("click", halt);
}

function mischen(){
    for( let i=0; i<deck.length;i++){
        let j=Math.floor(Math.random()*deck.length)
        let temp = deck[i]
        deck[i]=deck[j]
        deck[j]=temp
    }
}

function hit(){
    if(!karteZiehen){
        return;
    }
    /* Bug fix */
  /*   if(yourSum == 21){
        return
    } */
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src="bilder/"+card+".png";
    spielerSum += getValue(card);
    // yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg)
    document.getElementById("ergebnis-spieler").innerText="Summe: " + spielerSum
    if(spielerSum >= 21){
        karteZiehen = false
    
    }

    // if(reduceAce(yourSum, yourAceCount)>21){
    //     canHit = false;
    // }
}


function halt(){
    let nachicht = ""
    if(spielerSum > 21){
        nachicht = "Dealer Gewinnt"
        siege.push(1)
    }else if(dealerSum > 21 ){
        nachicht = "Spieler Gewinnt"
        siege1.push(1)
    }else if(spielerSum == dealerSum){
        nachicht = "Unentschieden"
    }else if(spielerSum > dealerSum){
        nachicht = "Spieler Gewinnt"
        siege1.push(1)
    }else if(spielerSum < dealerSum){
        nachicht = "Dealer Gewinnt"
        siege.push(1)
    }
    document.getElementById("results").innerText = nachicht
    karteZiehen = false
}

function updatePunkte(){
    const siegedealer = siege.length
    var siegespieler = siege1.length

    const siege0 = document.getElementById("SiegeSpieler");
    siege0.innerText = ("Siege : ") + siegedealer

    const niederlage0 = document.getElementById("SiegeDealer");
    niederlage0.innerText = ("Siege : ") + siegespieler
}

function neustart(){
    location.reload();
}
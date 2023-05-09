
var dealerScore = 0
var spielerScore = 0
var dealerSum = 0
var spielerSum = 0
var hidden = 0
var karteZiehen = true

var deckWerte = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "D", "K"];
var type = ["Karo", "Herz", "Pik", "Kreuz"]
var deck = []



window.onload=function() {
    alleKarten()
    mischen()
    starten()
}

// Neue Runde, Score bleibt
function weiter() {
    dealerSum = 0
    spielerSum = 0
    hidden = 0
    karteZiehen = true
    document.getElementById("results").innerHTML = "";
    starten()
    alleKarten()
    mischen()
}

// Wertigkeiten der Karten werden vergeben
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

// Fügt alle Karten zusammen in deck  (Werte + Farbe) 
function alleKarten(){
    for(let i=0; i < type.length; i++){
        for(let j=0; j < deckWerte.length; j++){
            deck.push(type[i]+"-"+deckWerte[j]);
        }
    }
}

// mischt unser deck Array
function mischen(){
    for( let i=0; i<deck.length;i++){
        let j=Math.floor(Math.random()*deck.length)
        let temp = deck[i]
        deck[i]=deck[j]
        deck[j]=temp
    }
}


// Erstellt die Karten vom Dealer und Spieler
function starten(){
    // bereinigt die angezeigten Karten nach jeder Runde
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("your-cards").innerHTML = "";
    
    // Entzieht deck eine Karte
    hidden = deck.pop()
    // Erstellt Dealer Karten so oft bist er mehr als 16 Punkte hat
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="bilder/"+card+".png"; //fügt bei dem erstellen img den link der Ressurce
        dealerSum += getValue(card);
        // dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg)
        document.getElementById("ergebnis-dealer").innerText="Summe: " + dealerSum
        
    }
    
    // Erstellt Spieler Karten
    for(let i=0; i<2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="bilder/"+card+".png";
        spielerSum += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg)
        document.getElementById("ergebnis-spieler").innerText="Summe: " + spielerSum
    }
    // Butten Event immer neu Aauslösbar
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("halt").addEventListener("click", halt);
}

// Erstellt neue Karte wenn vom Spieler der HIT Button benutzt wird
function hit(){
    if(!karteZiehen){
        return;
    }
    
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src="bilder/"+card+".png";
    spielerSum += getValue(card);
    // yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg)
    document.getElementById("ergebnis-spieler").innerText="Summe: " + spielerSum
    // Spieler kann keine Karten ziehen wenn über 21 Punkten
    if(spielerSum >= 21){
        karteZiehen = false
    
    }

    // if(reduceAce(yourSum, yourAceCount)>21){
    //     canHit = false;
    // }
}

// ist der stay butten und vergleicht die Ergebnisse wer gewonnen hat 
function halt(){

    
    let nachicht = ""
    if(spielerSum > 21){
        nachicht = "Dealer Gewinnt"
        dealerScore += 1
        document.getElementById("SiegeDealer").innerText = (dealerScore)
        
    }else if(dealerSum > 21 ){
        nachicht = "Spieler Gewinnt"
        spielerScore += 1
        document.getElementById("SiegeSpieler").innerText = (spielerScore)
        
    }else if(spielerSum == dealerSum){
        nachicht = "Unentschieden"
        
    }else if(spielerSum > dealerSum){
        nachicht = "Spieler Gewinnt"
        spielerScore += 1
        document.getElementById("SiegeSpieler").innerText = (spielerScore)
        
    }else if(spielerSum < dealerSum){
        nachicht = "Dealer Gewinnt"
        dealerScore += 1
        document.getElementById("SiegeDealer").innerText = (dealerScore)
        
    }
    // spielt geht automatisch weiter nach 3 Sekunden
    setTimeout(automatischWeiter, 3000)
    document.getElementById("results").innerText = nachicht
    karteZiehen = false
}

// Funktion, die nach einer bestimmten Zeit ausgeführt wird
function automatischWeiter() {
    weiter()
  }
  
  

// Spiel Neustart Webseite wird neu geladen
function neustart(){
    location.reload();
}
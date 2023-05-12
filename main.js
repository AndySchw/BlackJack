var dealerSum = 0
var dealerScore = 0
var dealerAceCount = 0

var spielerScore = 0
var spielerSum = 0
var spielerAceCount = 0

var karteZiehenDE = true
var karteZiehenSP = true

var deckWerte = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "D", "K"];
var type = ["Karo", "Herz", "Pik", "Kreuz"]
var deck = []
var dealerCard = []

// Variablen für den Mute Button
var audio = document.getElementById("myAudio");
var muteButton = document.getElementById("bildAnders");

window.onload=function() {
    alleKarten()
    mischen()
    starten()
}

// Neue Runde, Score bleibt
function weiter() {
    dealerSum = 0
    spielerSum = 0
    karteZiehenDE = true
    karteZiehenSP = true
    spielerAceCount = 0
    dealerAceCount = 0
    deck.length = 0
    document.getElementById("results").innerHTML = "";
    alleKarten()
    mischen()
    starten()
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

    
    let card = 0

    // Erstellt Dealer Karten so oft bist er mehr als 16 Punkte hat
    while(dealerSum < 17){
        card = deck.pop(); 
        dealerCard.push(card)
        var cardImg = document.createElement("img");
        cardImg.src="bilder/back.png";
        cardImg.id = card;
        document.getElementById("dealer-cards").append(cardImg)

        dealerSum += getValue(card);
        dealerAceCount += checkAce(card); //Zählt Ass
       

        // reduceAce aktuallisiert das Ass nach wertigkeit beim ersten erstellen der Dealerkarten
        var tempDealer = reduceAce(dealerSum, dealerAceCount)
        dealerSum = tempDealer[0]
        dealerAceCount = tempDealer[1]
        document.getElementById("ergebnis-dealer").innerText="Summe: *"
    }   
    cardImg.src="bilder/"+dealerCard[dealerCard.length - 1]+".png";
    
    
    
    // Erstellt Spieler Karten
    for(let i=0; i<2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="bilder/"+card+".png";
        document.getElementById("your-cards").append(cardImg)

        spielerSum += getValue(card);
        spielerAceCount += checkAce(card); //Zählt Ass
        
        // reduceAce aktuallisiert das Ass nach wertigkeit beim ersten erstellen
        let tempSpieler = reduceAce(spielerSum, spielerAceCount)
        spielerSum = tempSpieler[0]
        spielerAceCount = tempSpieler[1]

        
        document.getElementById("ergebnis-spieler").innerText="Summe: " + spielerSum
    }
    // Butten Event immer neu Aauslösbar
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("halt").addEventListener("click", halt);
}

// Erstellt neue Karte wenn vom Spieler der HIT Button benutzt wird
function hit(){
    if(!karteZiehenSP){
        return;
    }
    
    if(spielerSum == 21){
        karteZiehenSP = false;
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src="bilder/"+card+".png";
    document.getElementById("your-cards").append(cardImg)

    spielerAceCount += checkAce(card);
    spielerSum += getValue(card);

    // reduceAce aktuallisiert das Ass nach wertigkeit beim benutzen von hit 
    let tempSpieler = reduceAce(spielerSum, spielerAceCount)
    spielerSum = tempSpieler[0]
    spielerAceCount = tempSpieler[1]

    if(spielerSum > 21){
        karteZiehenSP = false;
    }
    document.getElementById("ergebnis-spieler").innerText="Summe: " + spielerSum
}

// ist der stay butten und vergleicht die Ergebnisse wer gewonnen hat 

function halt(){ 
    karteZiehenSP = false
    let nachicht = ""
    if(spielerSum > 21){
        nachicht = "Dealer Gewinnt"
        dealerScore += 1
        var audio = document.getElementById("lose-sound");
        audio.play();
        document.getElementById("SiegeDealer").innerText = (dealerScore)
        
    }else if(dealerSum > 21 ){
        nachicht = "Spieler Gewinnt"
        spielerScore += 1
        var audio = document.getElementById("win-sound");
        audio.play();
        document.getElementById("SiegeSpieler").innerText = (spielerScore)
        
    }else if(spielerSum == dealerSum){
        nachicht = "Unentschieden"
        
    }else if(spielerSum > dealerSum){
        nachicht = "Spieler Gewinnt"
        spielerScore += 1
        var audio = document.getElementById("win-sound");
        audio.play();
        document.getElementById("SiegeSpieler").innerText = (spielerScore)
        
    }else if(spielerSum < dealerSum){
        nachicht = "Dealer Gewinnt"
        dealerScore += 1
        var audio = document.getElementById("lose-sound");
        audio.play();
        document.getElementById("SiegeDealer").innerText = (dealerScore)   
    }

    document.getElementById("ergebnis-dealer").innerText="Summe: " + dealerSum

    // Spiel geht automatisch weiter nach 4 Sekunden
    setTimeout(automatischWeiter, 4000)
    document.getElementById("results").innerText = nachicht
    
    // Dealer Karten werden aufgedeckt
    for (let i = 0; i < dealerCard.length; i++) {
        let cardImg = document.getElementById(dealerCard[i]);
        if (cardImg) {
          cardImg.src = "bilder/" + dealerCard[i] + ".png";
        }
      } 
}

// Funktion, die nach einer bestimmten Zeit ausgeführt wird
function automatischWeiter() {
    var audio = document.getElementById("hit-sound");
    audio.play();
    weiter()  
  }

// Spiel Neustart Webseite wird neu geladen
function neustart(){
    location.reload();
}

// sucht nach einem Ass beim Spieler 
function checkAce(card){
    let data = card.split("-");
    if (data[1] == "A"){
        return 1
    }
    return 0  
}

// zieht 10 für Spieler ab für jedes Ass nud rechnet die gezählten Asse wieder ab
function reduceAce(spSum, spAceCount){
    
    while(spSum > 21 && spAceCount > 0){
        spSum = spSum - 10
        spAceCount = spAceCount - 1
    }
    
    return [spSum, spAceCount]
}



var audioPlayer = document.getElementById('myAudio');
  var sources = audioPlayer.getElementsByTagName('source');
  var currentSong = 0;


//   Audio Sachen

// Lautstärke


  var audio = document.getElementById("myAudio");
  audio.volume = 0.02; // Setze die Lautstärke
  audio.play(); // Starte die Wiedergabe


// Seitenmusik
  audioPlayer.addEventListener('ended', function() {
    currentSong++;
    if (currentSong >= sources.length) {
      currentSong = 0;
      
    }
    audioPlayer.src = sources[currentSong].src;
  });

  // Start playing the first song
  audioPlayer.src = sources[currentSong].src;
  audioPlayer.play();
  

//Button musik 
// Hit
  document.getElementById("hit").addEventListener("click", function() {
    var audio = document.getElementById("hit-sound");
    audio.play();
  });

//   Stay
  document.getElementById("halt").addEventListener("click", function() {
    var audio = document.getElementById("stay-sound");
    audio.play();
  });
  //   Stay
  
  // weiter
  document.getElementById("weiter-sound").addEventListener("click", function() {
    var audio = document.getElementById("hit-sound");
    audio.play();
  });

// Mute Button
  function toggleMute() {
    
      if (audio.paused) {
          audio.play();
          muteButton.src = "bilder/an.png";
      } else {
          audio.pause();
          muteButton.src = "bilder/aus.png";
      }
      
  }
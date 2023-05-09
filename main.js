

var dealerSum = 0
var spielerSum = 0

var deckWerte = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var type = ["Karo", "Herz", "Pik", "Kreuz"]
var deck = []

function getValue(card){
    let data = card.split("-");
    let value = data[0];

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
    alleKarten()
    // console.log(deck)
    mischen()
    // console.log(deck)
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="bilder/"+card+".png";
        dealerSum += getValue(card);
        // dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg)
    }
    //console.log(dealerSum)
    
    for(let i=0; i<2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src="./cards/"+card+".png";
        yourSum += getValue(card);
        // yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg)
    }
}

function mischen(){
    for( let i=0; i<deck.length;i++){
        let j=Math.floor(Math.random()*deck.length)
        let temp = deck[i]
        deck[i]=deck[j]
        deck[j]=temp
    }
}

// alleKarten()
// console.log(deck)
// mischen()
// console.log(deck)
// create card array  
let card_names = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];


// assign var to create cards
const deck = $('#cardBoard') [0];


// Start Game
startGame();


// Displays Deck on page; clearing it first.
function createDeck() {
    // Remove existing deck (children) - https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript 
    while(deck.hasChildNodes() ){
        deck.removeChild(deck.firstChild);
    }

    // Loop adding class card,i, and adding card names
    for (let i = 0; i < card_names.length; i++) {

        const newCard = document.createElement('li');
        newCard.className = "card";
        const newCardData = document.createElement('i');
        newCardData.className = card_names[i];

        const addNewCardData = newCard.appendChild(newCardData);
        const addNewCard = deck.appendChild(newCard);
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function to play game.
function startGame() {
  shuffle(card_names);
  createDeck();
}
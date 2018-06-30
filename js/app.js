// create card array  
let card_names = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"],
    open_cards = [],
    shown_cards = [],
    matched_cards =[],
    move_count = 0,
    total_clicks = 0,
    game_started = false;

stars=3;

//time vars
let timer = 0,
    timeStart; 



// assign varibles from index.html
const deck = $('#cardBoard')[0],
    moves = document.querySelector('.moves'),
    show_score = $('.show-score').children(),
    
    stars1 = document.getElementById('stars1'),
    stars2 = document.getElementById('stars2'),
    stars3 = document.getElementById('stars3');


// reset functions
const reset_game = document.querySelector('.restart');
reset_game.addEventListener('click',restartPlay);



// Start Game
play();


// Displays Deck on page; clearing it first.
function createDeck() {
    // Remove  Children - while statement to not remove after restart
    while (deck.hasChildNodes()){
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

// Shuffle function from http://stackoverflow.com/a/2450976 - udacity provdied 
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// function to add open and show css classes 
function flipOver() {
    event.target.classList.add('open');
    event.target.classList.add('show');
}


// Main function to monitor clicks, prevent single card match, add defined animations from css

deck.addEventListener('click', function(event) {
    if (event.target.classList.contains('open')) {
        return;

    }
    if (total_clicks < 2) {
        if (event.target.className === "card") {
            total_clicks += 1;
            flipOver();
             if (total_clicks === 2) {
                increaseMoveCount();
            }
        }

        if (open_cards.length != 2 && event.target.className === "card open show" && shown_cards.length != 2) {
            open_cards.push(event.target.childNodes[0].className);
            shown_cards.push(event.target);
        }
        // Checks cards after 2 cards have been select, adds animations from given css 
        if (open_cards.length > 1) {
            if (open_cards[0] === open_cards[1]) {
                setTimeout(function() {
                    open_cards = [];
                    shown_cards = [];
                    total_clicks = 0;
                }, 100);

            } else if (open_cards[0] != open_cards[1]) {
             
                setTimeout(function() {
                    shown_cards[0].classList.remove('open');
                    shown_cards[0].classList.remove('show');
                    shown_cards[1].classList.remove('open');
                    shown_cards[1].classList.remove('show');
                    open_cards = [];
                    shown_cards = [];
                    total_clicks = 0;
                }, 1000);
            }
        }
        //win condition 
        if (matched_cards === 8) {
            clearTimeout(timeStart);
        }
    }
});

// function to decrease score based on move count, star starts at 3
function increaseMoveCount() {
    move_count += 1;
    moves.innerHTML = move_count;

    if (move_count === 10) {
        stars1.style.display = "none";
        stars -= 1;
    } else if (move_count === 20) {
        stars2.style.display = "none";
        stars -= 1;
    }
}


// Function to play game.
function play() {
    createDeck();
    shuffle(card_names);
    startTimer();
    moves.innerHTML=move_count;


}

// Function to start game timer.
function startTimer() {
    timer += 1;
    $("#timer").html(timer);
    timeStart = setTimeout(startTimer, 1000);
}

// Restart Game 
function restartPlay() {
    timer = 0;
    stars = 3;
    clearTimeout(timeStart);
    document.getElementById('timer').innerHTML = 0;
    play();
    move_count= 0;
    moves.innerHTML = 0;
    matched_cards = 0;
    stars1.style.display = "block";
    stars2.style.display = "block";
    stars3.style.display = "block";
}
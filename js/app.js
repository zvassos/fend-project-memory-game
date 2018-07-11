/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cardDeck = document.getElementById("card-list");
const deckFrag = document.createDocumentFragment();
const listItems = document.getElementsByClassName("card");
 const modal = document.getElementById("myModal");

const arrowTwo = document.getElementById("two");
const arrowThree = document.getElementById("three");
const arrowOne = document.getElementById("one");

// Shuffle function from http://stackoverflow.com/a/2450976
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
/* The array declaration */
const arr = ["<i class='fa fa-diamond'></i>",
             "<i class='fa fa-diamond'></i>",
             "<i class='fa fa-paper-plane-o'></i>",
             "<i class='fa fa-paper-plane-o'></i>",
             "<i class='fa fa-anchor'></i>",
             "<i class='fa fa-anchor'></i>",
             "<i class='fa fa-leaf'></i>",
             "<i class='fa fa-leaf'></i>",
             "<i class='fa fa-bicycle'></i>",
             "<i class='fa fa-bicycle'></i>",
             "<i class='fa fa-cube'></i>",
             "<i class='fa fa-cube'></i>",
             "<i class='fa fa-bomb'></i>",
             "<i class='fa fa-bomb'></i>",
             "<i class='fa fa-bolt'></i>",
             "<i class='fa fa-bolt'></i>"];

/* Put each array item in an li */

function shareArrayItems() {

    for (let i = 0; i < listItems.length; i++) {
        listItems[i].innerHTML = arr[i];
    }

}

/* Make the list */

function makeList() {

    for (let i = 1; i <= 16; i++) {
        const newLi = document.createElement("li");
        newLi.className = "card";
        deckFrag.appendChild(newLi);

    }

    cardDeck.appendChild(deckFrag);
    shuffle(arr);
    shareArrayItems();

}

makeList();
var clickCount = 0;
/* Add class visible on click */
for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener("click", function () {
        
        listItems[i].classList.add("clicked");
        
        const hasClassClicked = document.getElementsByClassName("clicked");
        
        if ((hasClassClicked.length > 0) && (hasClassClicked.length < 3)) {
            
            for (let i = 0; i < hasClassClicked.length; i++) {
                hasClassClicked[i].classList.add("open");
            }

            const hasClassOpen = document.getElementsByClassName("open");
            if (hasClassOpen.length > 1) {
                if (hasClassOpen[0].innerHTML == hasClassOpen[1].innerHTML) {
                    for (let i = 0; i < hasClassOpen.length; i++) {
                        if (hasClassOpen[i].innerHTML == hasClassOpen[i].innerHTML) {
                            hasClassOpen[i].classList.add("matched");
                            
                        }
                    }

                    const hasClassMatched = document.getElementsByClassName("matched");
                    if (hasClassMatched.length > 0) {

                        for (let i = 0; i < hasClassMatched.length; i++) {
                            hasClassMatched[i].classList.remove("clicked");
                            hasClassMatched[i].classList.remove("open");
                        }
                        
                    }

                } else if (hasClassOpen[0].innerHTML != hasClassOpen[1].innerHTML) {
                    
                    hasClassOpen[0].classList.add("no-match");
                    hasClassOpen[1].classList.add("no-match");

                    for (let i = 0; i < listItems.length; i++) {
                        setTimeout(function() {
                           listItems[i].classList.remove("clicked", "open", "no-match");
                        }, (1000)); 
                        
                    }
                }
                clickCount++;
                const totalMoves = document.getElementById("moves-total");
                totalMoves.innerHTML = clickCount;
                
                
            }
            
        }
        
                if (clickCount <= 8) {
                    
                   
                } else if (clickCount <= 16) {
                    arrowThree.style.color = "#b2b0b0";
                } else if (clickCount <= 25){
                    arrowTwo.style.color = "#b2b0b0";
                    arrowThree.style.color = "#b2b0b0";
                } else {
                    arrowThree.style.color = "#b2b0b0";
                    arrowTwo.style.color = "#b2b0b0";
                    arrowOne.style.color = "#b2b0b0";
                    
                }
        
        const movesCounter = document.getElementById("moves");
        
        if (clickCount==1) {
            movesCounter.innerHTML = clickCount + " Move";
        } else {
            movesCounter.innerHTML  = clickCount + " Moves";
        }
        
        const matchedCards = document.getElementsByClassName("matched");
        if( matchedCards.length >= 16 ){
           
             setTimeout(function() {
                modal.style.display = "block";                 
                modal.style.opacity = "1";
             }, (1000));
            
        }
        
        
        const modalClose = document.getElementsByClassName("close")[0];
        modalClose.onclick = function() {
            modal.style.display = "none";
        }
        
        
            
    }, false);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

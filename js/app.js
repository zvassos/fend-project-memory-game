const cardDeck = document.getElementById("card-list");
const deckFrag = document.createDocumentFragment();
const listItems = document.getElementsByClassName("card");
const modal = document.getElementById("myModal");

const starOne = document.getElementsByClassName("one");
const starTwo = document.getElementsByClassName("two");
const starThree = document.getElementsByClassName("three");


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
                const totalMoves = document.getElementById("totalMoves");
                totalMoves.innerHTML = clickCount;
                
                
            }
            
        }
        
        if (clickCount <= 20) {
                
            //do nothing
                   
        } else if (clickCount <= 30) {
            
            starThree[0].style.color = "#b2b0b0";
            
        } else if (clickCount <= 40){
            
            starTwo[0].style.color = "#b2b0b0";
            
        } else {
            
            starOne[0].style.color = "#b2b0b0";
            
        }
        
        const movesCounter = document.getElementsByClassName("moves");
        
        if (clickCount==1) {
            
            movesCounter[0].innerHTML = clickCount + " Move";
            
        } else {
            
            movesCounter[0].innerHTML  = clickCount + " Moves";
            
        }
        
        const matchedCards = document.getElementsByClassName("matched");
        if( matchedCards.length >= 16 ){
           
             setTimeout(function() {
                modal.style.display = "block";                 
                modal.style.opacity = "1";
                
             }, (500));
            
            st.stop(); /* Stops timer */
            const stopWatch = document.getElementById("stopWatch");

            stopWatch.innerHTML = st.getSeconds(); /* prints seconds passed timer */
            console.log(st.getSeconds());
            
        }
        
        
        const modalClose = document.getElementsByClassName("close")[0];
        modalClose.onclick = function() {
            modal.style.display = "none";
        }
        
        
            
    }, false);
}



const restartButton = document.getElementById("restart-game");
restartButton.addEventListener("click", function(){
    location.reload();
})

const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", function(){
    location.reload();
})

/* Stopwatch from https://stackoverflow.com/questions/1210701/compute-elapsed-time */

const st = new Stopwatch();
st.start(); //Start the stopwatch



function Stopwatch(){
  var startTime, endTime, instance = this;

  this.start = function (){
    startTime = new Date();
  };

  this.stop = function (){
    endTime = new Date();
  }

  this.clear = function (){
    startTime = null;
    endTime = null;
  }

  this.getSeconds = function(){
    if (!endTime){
    return 0;
    }
    return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }

  this.getMinutes = function(){
    return instance.getSeconds() / 60;
  }      
  this.getHours = function(){
    return instance.getSeconds() / 60 / 60;
  }    
  this.getDays = function(){
    return instance.getHours() / 24;
  }   
}

/* Stars on final score */
const finalStar = document.getElementById("one-final");

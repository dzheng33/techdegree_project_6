const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const ul = document.querySelector("ul");
const overlay = document.querySelector("#overlay");
const startButton = document.querySelector(".btn__reset");
const lives = document.querySelector("#scoreboard");
const ol = lives.querySelector("ol");
const hearts = ol.children;
const msg = document.createElement("H2");
let missed = 0;

const retry = document.createElement("BUTTON");
retry.textContent = "Play Again?";
retry.className = "btn__reset";

const phrases = ["Hello World",
                "JavaScript is Hard",
                "CSS Stylings",
                "Hypertext Markup Language",
                "React Framework"
                ];

//return a random phrase from an array
function getRandomPhraseAsArray(arr){
    const arrSize = arr.length;
    const ranNum = Math.floor(Math.random() * arrSize);
    const index = arr[ranNum];
    return index;
}

//adds the letters of a string to the display
function addPhraseToDisplay(arr){

    for(let i = 0; i < arr.length; i++){
        const li = document.createElement("LI");
        li.textContent = arr[i];

        if(arr[i] !== " "){
            li.className = "letter";
        }
        else {
            li.className = "space";
        }
        ul.appendChild(li);
    }
}

addPhraseToDisplay(getRandomPhraseAsArray(phrases));


//check if a letter is in the phrase
function checkLetter(button){
    let match = false;
    const li = phrase.querySelectorAll("ul li");
    for(let i = 0; i < li.length; i++){
        if(button === li[i].textContent.toLowerCase()){
            li[i].classList.add("show");
            match = true;
        }
    }
    return match;
}

//check if the game has been won or lost
function checkWin(){
    const letters = phrase.querySelectorAll(".letter");
    const numberofLetters = letters.length;
    const shown = phrase.querySelectorAll(".show");
    const numberShown = shown.length;

    if(numberShown === numberofLetters){
        overlay.className = "win";
        overlay.style.display = "flex";
        msg.textContent = "YOU WIN!!!";
        overlay.appendChild(msg);
        overlay.appendChild(retry);
    }

    if(missed === 5){
        overlay.className = "lose";
        overlay.style.display = "flex";
        msg.textContent = "YOU LOSE!!!";
        overlay.appendChild(msg);
        overlay.appendChild(retry);
    }
}

//listen for the start game button to be pressed
startButton.addEventListener("click", function(){
    overlay.style.display = "none";
    overlay.removeChild(startButton);
});

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener("click", function(event){
   
    if(event.target.tagName == "BUTTON" && event.target.className != "chosen"){
        event.target.className = "chosen";
        event.target.setAttribute("disabled", true);
        const guess = checkLetter(event.target.textContent);
    
        if(guess !== true){
            hearts[missed].firstElementChild.src = "images/lostHeart.png";
            missed++;
            checkWin();
        }
        else {
            checkWin();
        }
        
    }
    
});


//restart game
retry.addEventListener("click", function(){
    overlay.style.display = "none";
    missed = 0;

    for(let i = 0; i < 5; i++){
        hearts[i].firstElementChild.src = "images/liveHeart.png";
    }

    const numberOfLi = ul.children.length;
    for(let i = 0; i < numberOfLi; i++){
        ul.removeChild(ul.lastElementChild);
    }

    addPhraseToDisplay(getRandomPhraseAsArray(phrases));

    const keyrows = qwerty.children;
    const numberOfKeyrows = keyrows.length;

    for(let i = 0; i < numberOfKeyrows; i++){

        const keys = keyrows[i].children;
        const numberOfKeys = keys.length;
            for(let j = 0; j < numberOfKeys; j++){
                keys[j].className = "";
                keys[j].disabled = false;
            }
    }
    
});

    
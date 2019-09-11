// Dice timer.
let diceTimer; 
// Sætter antal af terninger
let num_dices = 1;
// Array til terninger
let array_dices = [];
// Sætter array til engelske tal - skal bruges til font awesome ikoner
let array_dice_names = ["", "one", "two", "three", "four", "five", "six"];
// Sætter var til html element der skal vise resultater
let display_result = document.getElementById("display_result");
// Sætter addEventListener til klik på knap
document.getElementById("rollthedice").addEventListener("click", rollTheDice);

//Question section.
let answerBtn = document.getElementById('answerBtn');
let answer = null;


//Players.
let playerOne = document.getElementById('playerOne');
let playerTwo = document.getElementById('playerTwo');

//which Turn to play.
playerOneTurn = 1;
playerTwoTurn = 0;

//Count moves.
let playerOneMoves = 0
let playerTwoMoves = 0

//generates a random number for the question.
let questionNumber = null;

//Board layout. (Hver tal over 0 generer en div med farve.)
let map = [
            3,3,3,3,3,3,3,3,3,3,
            2,0,0,0,0,0,0,0,0,4,
            2,0,0,0,0,0,0,0,0,4,
            2,0,0,0,0,0,0,0,0,4,
            2,0,0,0,0,0,0,0,0,4,
            2,0,0,0,0,0,0,0,0,4,
            2,0,0,0,0,0,0,0,0,4,
            2,0,0,0,0,0,0,0,0,4,
            1,1,1,1,1,1,1,1,1,1];
/**
 * Funktion til at hente tilfældigt nummer
 * @param num_eyes
 * @returns {number}
 */
function getRandomNumber(num_eyes = 6) {
    return Math.ceil(Math.random() * num_eyes)
}

/**
 * Funktion der nulstiller gameboard
 */
function initGame() {
    array_dices = [];
    gameboard.innerHTML = "";

    //Bygger array med terninger - hver terning får et tilfældigt nummer
    for(let i = 1; i <= num_dices; i++) {
        array_dices.push(getRandomNumber());        
    }
}

/**
 * Funktion til at kaste terninger med
 */
let moves = null;
function rollTheDice() {
    // Nulstiller spil
    initGame();
    // Lopper array
    for(let num of array_dices) {
        // Opretter <i> element til font awesome ikon
        let elm = document.createElement("i");
        // Tilføjer class attribute med font awesome klasser til element
        elm.setAttribute("class", "dice fas fa-dice-" + array_dice_names[num]);
        gameboard.appendChild(elm);

        // console.log(currentPosition.parentElement);

    }
    

    //Switch between player. (if the playerOneTurn = 1 then is is player one's turn.) then resets the playerOnevar
    if (playerOneTurn == 1) {
        // increases player one's moves  count.
        playerOneMoves += Number(array_dices);
        // resets player one's turn.
        playerOneTurn = 0;
        // Sets the turn to player two.
        playerTwoTurn = 1;
    //Switch between player. (if the playerTwoTurn = 1 then is is player one's turn.)
    } else if(playerTwoTurn == 1) {
        // increases player two's moves  count.
        playerTwoMoves += Number(array_dices);
        // resets player two's turn.
        playerTwoTurn = 0;
        // Sets the turn to player one.
        playerOneTurn = 1;
    }

    //For loop that recognise whitch turn it is (Sætter en border omkring det felt spilleren skal rykke til) 
    for (let i = 0; i < tileArray().length; i++) {
        tileArray()[i].style.border = "2px solid rgba(0, 0, 0, 0.185)";
        if (playerOneTurn == 1) {
            if (playerOneMoves >= tileArray().length -1) {
                playerOneMoves = 0;
                //!!Skal måske bruges senere!!
                // playerOneMoves = tileArray().length - parseInt(playerOneMoves) + parseInt(array_dices);
                
                } else {
                    //applies border.
                    tileArray()[playerTwoMoves].style.border = "5px solid blue";
                }
            }
            console.log(tileArray().length -1);
            
        if (playerTwoTurn == 1) {
            if (playerTwoMoves >= tileArray().length) {
                playerTwoMoves = 0;
                //!!Skal måske bruges senere!!
                // playerTwoMoves = tileArray().length - parseInt(playerTwoMoves) + parseInt(array_dices);
                
                } else {
                    //applies border.
                    tileArray()[playerOneMoves].style.border = "5px solid black";
                }
            }
    }
}

let playArea = document.getElementById("playArea")
//The numbers mening, in the map variable.
// 0 = Non moveable area.
// 1 = Moveable area.
// 2 = Moveable area.
// 3 = Moveable area.
// 4 = Moveable area.
// 6 = Question field.


//Generates the map, by looking at the number in the map variable.
for (let i = 0; i < map.length; i++) {
    //If the number in the map variable is 0 insert a div with the class black.
    if(map[i] == 0) {
        playArea.insertAdjacentHTML("afterbegin", '<div class=" block"></div>');
    } else 
    //If the number in the map variable is 1 insert a div with the class greenBlock.
    if(map[i] == 1) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" data-blockId="playAbleArea" ondragover="allowDop(event)" class="playAbleArea greenBlock"></div>');
    } else 
    //If the number in the map variable is 2 insert a div with the class greenBlockTwo.
    if(map[i] == 2) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" data-blockId="playAbleArea" ondragover="allowDop(event)" class="playAbleArea greenBlockTwo"></div>');
    } else 
        //If the number in the map variable is 3 insert a div with the class greenBlockThree.
    if(map[i] == 3) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" data-blockId="playAbleArea" ondragover="allowDop(event)" class="playAbleArea greenBlockThree"></div>');
    }
        //If the number in the map variable is 4 insert a div with the class greenBlockFour.
    if(map[i] == 4) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" data-blockId="playAbleArea" ondragover="allowDop(event)" class="playAbleArea greenBlockFour"></div>');
    }
        //If the number in the map variable is 6 insert a div with the class qustion.
    if(map[i] == 6) {
        playArea.insertAdjacentHTML("afterbegin", '<div class="qustion"></div>');
    }
}

//This function allows an element to be draged and placed in a div.
function allowDop(ev) { 
    ev.preventDefault();
}

//This function allows an element to be draged.
function drag(ev) {
    let data = ev.dataTransfer.setData("text", ev.target.id);

}

//array of questions.
let questions = [
    {
      question: "Hvordan start man et html document?",
      answer1: "&lt;!DOCTYPE html&gt;",
      answer2: "&lt;html !DOCTYPE&gt;",
      answer3: "&lt;html&gt;",
      answer: "answer1",
      price: 200
    },
    {
        question: "Hvordan laver man en variable i javascript?",
        answer1: 'navn = "String"',
        answer2: 'let navn = "String"',
        answer3: 'let = "string"',
        answer: "answer2"
    },
    {
        question: "Hvad står html for?",
        answer1: 'Hyper Tag Markup Language',
        answer2: 'Hyper Text Markup Language',
        answer3: 'Hyperlinking Text Marking Language',
        answer: "answer2"
    },
    {
        question: "Hvad er det korrekte tag for en line break?",
        answer1: '&lt;line /&gt;',
        answer2: '&lt;brk /&gt;',
        answer3: '&lt;br /&gt;',
        answer: "answer3"
    },
    {
        question: "Hvad står css for",
        answer1: 'Cascading Style Sheet',
        answer2: 'Computing Style Sheet',
        answer3: 'Creative Styling Sheet',
        answer: "answer1"
    }
    
  ];

  //This function checks with have been draged to an element, to get information that is used to check player moves.
function drop(ev) {
    playArea.classList = "playArea"; 
        //This is to check if an element have the notStackable class on it (this is used on the player. So that when a player is draged on top of the other player, the other player returns to home.)
        if (ev.target.classList[1] == "notStackable") {
            let greenBlock = document.getElementsByClassName("greenBlock");
                let data = ev.dataTransfer.getData("text");
                ev.target.parentElement.parentElement.appendChild(document.getElementById(data));
                greenBlock[0].appendChild(ev.target.parentElement);
                if (ev.target.parentElement.id === "playerOne") {
                    playerOneMoves = 0;
                }
                if (ev.target.parentElement.id === "playerTwo") {
                    playerTwoMoves = 0;
                }
                
        } else {
            ev.preventDefault();
            let data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
        }
        
    if(ev.target.classList[2] == "question") {
        questionNumber = Math.floor(Math.random(0, ) * 6);
        document.body.insertAdjacentHTML("afterbegin", `<form id="qustion-box" class="qustion-box"><h2>${questions[questionNumber].question}</h2><input type="radio" class="answer" name="answer" value="answer1" /><span>${questions[questionNumber].answer1}</span><br /><input type="radio" class="answer"name="answer" value="answer2" /><span>${questions[questionNumber].answer2}</span><br /><input type="radio" class="answer" name="answer" value="answer3" /><span>${questions[questionNumber].answer3}</span><br /> <button id="answerBtn" onclick="answerFunc()" type="button">Svar</button></form>`);
        answerBtn = document.getElementById('answerBtn');
        answer = document.getElementsByName('answer');

    }
}


//This is the function that checks if the answer to one of the questions is right. (Virker ikke helt endnu)(Der kommer kommentare når den virker)
function answerFunc() {
    answer = document.forms[0];
    for (let i = 0; i < answer.length; i++) {
            if (answer[i].checked) {
                if (questions[questionNumber].answer === answer[i].value) {
                    
                playArea.classList = " playArea green-border";
                document.getElementById('rightOrWrong').innerHTML = "Rigtig! Slå igen og ryk frem."
                document.getElementById("qustion-box").remove();
            } else {
                console.error("%cWRONG NOOB", 'color: blue; font-family: cursive; font-size: 5em;');
                
                playArea.classList = "playArea red-border";
                document.getElementById('rightOrWrong').innerHTML = "Forkert! Vent til det er din tur."
                document.getElementById("qustion-box").remove();
            }
        }
    }
}

//This fucntion assembles all the playable objects into an array, and returns the array.
function tileArray() {
    let greenBlock = Array.from(document.getElementsByClassName('greenBlock'));
    let greenBlockTwo = Array.from(document.getElementsByClassName('greenBlockTwo'));
    let greenBlockThree = Array.from(document.getElementsByClassName('greenBlockThree'));
    let greenBlockFour = Array.from(document.getElementsByClassName('greenBlockFour'));
    let tileArr = [].concat(greenBlock, greenBlockTwo, greenBlockThree.reverse(), greenBlockFour.reverse());

    return tileArr;
}
// console.log(tileArray());


//This is used to decides which fields is a question field.
tileArray()[0].style.backgroundImage = "url(images/start.jpg)";
tileArray()[0].style.backgroundSize = "cover";
tileArray()[2].classList += " question";
tileArray()[5].classList += " question";
tileArray()[12].classList += " question";
tileArray()[15].classList += " question";
tileArray()[20].classList += " question";
tileArray()[24].classList += " question";
tileArray()[28].classList += " question";
tileArray()[31].classList += " question";
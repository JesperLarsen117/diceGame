// Dice timer.
let diceTimer;
// SÃ¦tter antal af terninger
let num_dices = 1;
// Array til terninger
let array_dices = [];
// SÃ¦tter array til engelske tal - skal bruges til font awesome ikoner
let array_dice_names = ["", "one", "two", "three", "four", "five", "six"];
// SÃ¦tter var til html element der skal vise resultater
let display_result = document.getElementById("display_result");
// SÃ¦tter addEventListener til klik pÃ¥ knap
document.getElementById("rollthedice").addEventListener("click", rollTheDice);

let answerBtn = document.getElementById('answerBtn');
let answer = document.getElementsByName('answer');

let playerOne = document.getElementById('playerOne');

playerOneTurn = 1;
playerTwoTurn = 0;

let playerOneMoves = 0
let playerTwoMoves = 0

let map = [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    2, 0, 0, 6, 0, 6, 0, 0, 0, 4,
    2, 0, 0, 0, 0, 0, 0, 0, 0, 4,
    2, 6, 0, 0, 0, 0, 0, 0, 0, 4,
    2, 0, 0, 0, 0, 0, 0, 0, 6, 4,
    2, 0, 0, 0, 0, 0, 0, 0, 0, 4,
    2, 6, 0, 0, 0, 0, 0, 0, 6, 4,
    2, 0, 6, 0, 0, 6, 0, 0, 0, 4,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
/**
 * Funktion til at hente tilfÃ¦ldigt nummer
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

    //Bygger array med terninger - hver terning fÃ¥r et tilfÃ¦ldigt nummer
    for (let i = 1; i <= num_dices; i++) {
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
    for (let num of array_dices) {
        // Opretter <i> element til font awesome ikon
        let elm = document.createElement("i");
        // TilfÃ¸jer class attribute med font awesome klasser til element
        elm.setAttribute("class", "dice fas fa-dice-" + array_dice_names[num]);
        gameboard.appendChild(elm);

        // console.log(currentPosition.parentElement);

    }

    if (playerOneTurn == 1) {
        playerOneMoves += Number(array_dices);
        playerOneTurn = 0;
        playerTwoTurn = 1;
    } else if (playerTwoTurn == 1) {
        playerTwoMoves += Number(array_dices);
        playerTwoTurn = 0;
        playerOneTurn = 1;
    }

    console.log(playerOneMoves);
    console.log(playerTwoMoves);
    for (let i = 0; i < tileArray().length; i++) {
        tileArray()[i].style.border = "2px solid rgba(0, 0, 0, 0.185)";
        if (playerOneTurn == 1) {
            if (playerOneMoves >= tileArray().length) {

                playerOneMoves = tileArray().length - parseInt(playerOneMoves) + parseInt(array_dices);

            } else {
                tileArray()[playerTwoMoves].style.border = "5px solid blue";
            }
        }

        if (playerTwoTurn == 1) {
            if (playerTwoMoves >= tileArray().length) {

                playerTwoMoves = tileArray().length - parseInt(playerTwoMoves) + parseInt(array_dices);

            } else {
                tileArray()[playerOneMoves].style.border = "5px solid black";
            }
        }
    }
}


// Kaster terningerne nÃ¥r siden loades

let playArea = document.getElementById("playArea")
    // 0 = redblock
    // 1 = greenblocks
    // 2 = qustion
    // 3 = ladder

for (let i = 0; i < map.length; i++) {
    if (map[i] == 0) {
        playArea.insertAdjacentHTML("afterbegin", '<div class=" block"></div>');
    } else
    if (map[i] == 1) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" data-blockId="playAbleArea" ondragover="allowDop(event)" class="playAbleArea greenBlock"></div>');
    } else
    if (map[i] == 2) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" data-blockId="playAbleArea" ondragover="allowDop(event)" class="playAbleArea greenBlockTwo"></div>');
    } else
    if (map[i] == 3) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" data-blockId="playAbleArea" ondragover="allowDop(event)" class="playAbleArea greenBlockThree"></div>');
    }
    if (map[i] == 4) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" data-blockId="playAbleArea" ondragover="allowDop(event)" class="playAbleArea greenBlockFour"></div>');
    }
    if (map[i] == 6) {
        playArea.insertAdjacentHTML("afterbegin", '<div class="qustion"></div>');
    }
}

function allowDop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    let data = ev.dataTransfer.setData("text", ev.target.id);

}

let questions = [{
        question: "Hvordan starter man et html document?",
        answer1: "&lt;!DOCTYPE html&gt;",
        answer2: "&lt;html !DOCTYPE&gt;",
        answer3: "&lt;html&gt;",
        answer: "answer1",
        price: 100
    },
    {
        question: "Hvordan laver man en variable i javascript?",
        answer1: 'navn = "String"',
        answer2: 'let navn = "String"',
        answer3: 'let = "string"',
        answer: "answer2",
        price: 100
    },
    {
        question: "Hvad står html for?",
        answer1: 'Hyper Tag Markup Language',
        answer2: 'Hyper Text Markup Language',
        answer3: 'Hyperlinking Text Marking Language',
        answer: "answer2",
        price: 100
    },
    {
        question: "Hvad er det korrekte tag for en line break?",
        answer1: '&lt;line /&gt;',
        answer2: '&lt;brk /&gt;',
        answer3: '&lt;br /&gt;',
        answer: "answer3",
        price: 100
    },
    {
        question: "Vælg det korrekte HTML tag for den største overskrift?",
        answer1: '&lt;heading&gt;',
        answer2: '&lt;h1&gt;',
        answer3: '&lt;h6&gt;',
        answer: "answer2",
        price: 100
    },
    {

        question: "BONUS SPØRGSMÅL!!!  Hvordan laver man et link i HTML?",
        answer1: '&lt;a href="http://www.w3schools.com"&gt;W3Schools&lt;/a&gt;',
        answer2: '&lt;a url="http://www.w3schools.com"&gt;W3Schools&lt;/a&gt;',
        answer3: '&lt;a name="http://www.w3schools.com"&gt;W3Schools&lt;/a&gt;',
        answer: "answer1",
        price: 200
    },
    {
        question: "Hvordan insætter man et billede i HTML?",
        answer1: '&lt;img href="image.gif" alt="MyImage"&gt;',
        answer2: '&lt;img src="image.gif" alt="MyImage"&gt;',
        answer3: '&lt;image src="image.gif" alt="MyImage"&gt;',
        answer: "answer2",
        price: 100

    },

    {
        question: "Hvad er den korrekte måde at lave en checkbox i HTML?",
        answer1: '&lt;input type="check"&gt;',
        answer2: '&lt;checkbox&gt;',
        answer3: '&lt;input type="checkbox"&gt;',
        answer: "answer3",
        price: 100

    },

    {
        question: "Hvordan tilføjer man en baggrunds farve til alle &lt;h1&gt;?",
        answer1: 'h1 {background-color:#FFFFFF;}',
        answer2: 'h1.all {background-color:#FFFFFF;}',
        answer3: 'all.h1 {background-color:#FFFFFF;}',
        answer: "answer1",
        price: 100

    },

    {
        question: "BONUS SPØRGSMÅL!!!&lt;h2/&gt;&lt;h2&gt;Hvilket tegn bruger jQuery som genvej til jQuery?",
        answer1: '?',
        answer2: '#',
        answer3: '$',
        answer: "answer2",
        price: 200

    },
    {
        question: "Hvilket tegn bruges foran dit class navn i css?",
        answer1: ',',
        answer2: '#',
        answer3: '.',
        answer: "answer3",
        price: 100

    },

    {
        question: "Hvilket tegn bruges foran dit id navn i css?",
        answer1: ',',
        answer2: '#',
        answer3: '.',
        answer: "answer2",
        price: 100

    },
    {
        question: "Hvor mange h1 tag er korrekt at bruge?",
        answer1: '1',
        answer2: '5',
        answer3: 'bestemmer man selv',
        answer: "answer1",
        price: 100

    },
    {
        question: "Hvad står SEO for?",
        answer1: 'Search Optimization',
        answer2: 'Search Engine Optimization',
        answer3: 'Search Engine',
        answer: "answer2",
        price: 100

    },


];

function drop(ev) {
    playArea.classList = "playArea";
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

    if (ev.target.classList[2] == "question") {
        let questionNumber = Math.floor(Math.random(0, ) * 6);
        document.body.insertAdjacentHTML("afterbegin", `<div id="qustion-box" class="qustion-box"><h2>${questions[questionNumber].question}</h2><input type="radio" name="answer" value="answer1" /><span>${questions[questionNumber].answer1}</span><br /><input type="radio" name="answer" value="answer2" /><span>${questions[questionNumber].answer2}</span><br /><input type="radio" name="answer" value="answer3" /><span>${questions[questionNumber].answer3}</span><br /> <button id="answerBtn" onclick="answerFunc()" type="button">Svar</button></div>`);
        answerBtn = document.getElementById('answerBtn');
        answer = document.getElementsByName('answer');

    }
}

function answerFunc() {
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].checked) {
            if (questions[questionNumber].answer == answer[i].value) {
                playArea.classList = " playArea green-border";

                document.getElementById("qustion-box").remove();
                document.getElementById('rightOrWrong').innerHTML = "Rigtig! Slå igen og ryk frem."
            }
        } else {
            playArea.classList = "playArea red-border";

            document.getElementById('rightOrWrong').innerHTML = "Forkert! Vent til det er din tur."
            document.getElementById("qustion-box").remove();

        }
    }
}

function tileArray() {
    let greenBlock = Array.from(document.getElementsByClassName('greenBlock'));
    let greenBlockTwo = Array.from(document.getElementsByClassName('greenBlockTwo'));
    let greenBlockThree = Array.from(document.getElementsByClassName('greenBlockThree'));
    let greenBlockFour = Array.from(document.getElementsByClassName('greenBlockFour'));
    let tileArr = [].concat(greenBlock, greenBlockTwo, greenBlockThree.reverse(), greenBlockFour.reverse());

    return tileArr;
}
// console.log(tileArray());

tileArray()[2].classList += " question";
tileArray()[5].classList += " question";
tileArray()[12].classList += " question";
tileArray()[15].classList += " question";
tileArray()[20].classList += " question";
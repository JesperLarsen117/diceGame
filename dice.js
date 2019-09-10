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

let currentPosition = document.getElementById('playerOne');

let map = [1,1,1,1,1,1,1,1,1,2,
    0,0,0,0,0,0,0,0,0,1,
    3,1,1,1,1,1,2,1,1,1,
    1,0,0,0,0,0,0,0,0,0,
    1,1,2,1,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,2,1,3,1,
    1,0,0,0,0,0,0,0,0,0,
    1,1,1,1,2,1,1,1,1,1];
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
    for(let i = 1; i <= num_dices; i++) {
        array_dices.push(getRandomNumber());        
    }
}

/**
 * Funktion til at kaste terninger med
 */
function rollTheDice() {
    // Nulstiller spil
    initGame();
    // Lopper array
    for(let num of array_dices) {
        // Opretter <i> element til font awesome ikon
        let elm = document.createElement("i");
        // TilfÃ¸jer class attribute med font awesome klasser til element
        elm.setAttribute("class", "dice fas fa-dice-" + array_dice_names[num]);
        gameboard.appendChild(elm);

        console.log(currentPosition.parentElement);
        

    }

}



// Kaster terningerne nÃ¥r siden loades

let playArea = document.getElementById("playArea")
// 0 = redblock
// 1 = greenblocks
// 2 = qustion
// 3 = ladder

for (let i = 0; i < map.length; i++) {
    if(map[i] == 0) {
        playArea.insertAdjacentHTML("afterbegin", '<div class=" block"></div>');
    } else 
    if(map[i] == 1) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" ondragover="allowDop(event)" class="greenBlock"></div>');
    } else 
    if(map[i] == 2) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" ondragover="allowDop(event)" class="qustion"></div>');
    } else 
    if(map[i] == 3) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" ondragover="allowDop(event)" class="ladder"></div>');
    }
    if(map[i] == 5) {
        playArea.insertAdjacentHTML("afterbegin", '<div ondrop="drop(event)" ondragover="allowDop(event)" class="goTo"></div>');
    }
}
function allowDop(ev) { 
    ev.preventDefault();
}

function drag(ev) {
    let data = ev.dataTransfer.setData("text", ev.target.id);

}
let questions = [
    {
      question: "Hvordan start man et html document?",
      answer1: "&lt;!DOCTYPE html&gt;",
      answer2: "&lt;html !DOCTYPE&gt;",
      answer3: "&lt;html&gt;",
      answer: "answer1"
    }
  ];
function drop(ev) {
    playArea.classList = "playArea"; 
        if (ev.target.classList[1] == "notStackable") {
            let greenBlock = document.getElementsByClassName("greenBlock");
                let data = ev.dataTransfer.getData("text");
                ev.target.parentElement.parentElement.appendChild(document.getElementById(data));
                greenBlock[0].appendChild(ev.target.parentElement);
        } else {
            ev.preventDefault();
            let data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
        }

    if(ev.target.classList == "qustion") {

        document.body.insertAdjacentHTML("afterbegin", `<div id="qustion-box" class="qustion-box"><h2>${questions[0].question}</h2><input type="radio" name="answer" value="answer1" /><span>${questions[0].answer1}</span><br /><input type="radio" name="answer" value="answer2" /><span>${questions[0].answer2}</span><br /><input type="radio" name="answer" value="answer3" /><span>${questions[0].answer3}</span><br /> <button id="answerBtn" onclick="answerFunc()" type="button">Svar</button></div>`);
        answerBtn = document.getElementById('answerBtn');
        answer = document.getElementsByName('answer');
    }
}

function answerFunc() {
    for (let i = 0; i < answer.length; i++) {
        if(answer[i].checked ) {
            if (questions[0].answer == answer[i].value) {
                playArea.classList = " playArea green-border";

                document.getElementById("qustion-box").remove();
                document.getElementById('rightOrWrong').innerHTML = "Rigtig! Slå igen og ryg frem."
            }
        } else {
            playArea.classList = "playArea red-border";

            document.getElementById('rightOrWrong').innerHTML = "Forkert! Slå igen og ryg tilbage."
            document.getElementById("qustion-box").remove();

        }
    }
}
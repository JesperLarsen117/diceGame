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
        // TilfÃ¸jer element til div id gameboard
       
        // let holeNumber = null;
        // for (let i = 0; i < array_dices.length; i++) {
        //     // Number(array_dices.join(""));
        //     // holeNumber = array_dices[i];
        //     console.log(rollTheDice());
        // }
        // display_result.innerText = holeNumber;

        // display_result.innerText = Number(array_dices.join(""));
        gameboard.appendChild(elm);
    }
}

// Kaster terningerne nÃ¥r siden loades
rollTheDice();

let playArea = document.getElementById("playArea")
// 0 = redblock
// 1 = greenblocks
// 2 = qustion
// 3 = ladder
let map = [1,1,1,1,2,1,1,1,1,1,
           0,0,0,0,0,0,0,0,0,1,
           3,1,1,1,1,1,2,1,1,1,
           1,0,0,0,0,0,0,0,0,0,
           1,1,2,1,1,1,1,1,1,1,
           0,0,0,0,0,0,0,0,0,1,
           1,1,1,1,1,1,2,1,3,1,
           1,0,0,0,0,0,0,0,0,0,
           1,1,1,1,1,1,1,1,2,1];

for (let i = 0; i < map.length; i++) {
    if(map[i] == 0) {
        playArea.insertAdjacentHTML("afterbegin", '<div class="block"></div>');
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
}
function allowDop(ev) { 
    ev.preventDefault();
}

function drag(ev) {
    let data = ev.dataTransfer.setData("text", ev.target.id);

}

// questions = { "question":"Hvordan starter et HTML dokument?","svar1":"<!DOCTYPE html>","svar2":"<!doctype>","svar3":"<Head>"}
questions = { "question":"Hvordan starter et HTML dokument?", "svar1":'&lt;!DOCTYPE html&gt;', "svar2":'&lt;Head&gt;', "svar3":"&lt;body&gt;"};
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    if(ev.target.classList == "qustion") {
        document.body.insertAdjacentHTML("afterbegin", '<div class="qustion-box"><h2>'+questions.question+'</h2><input type="radio" value="1">'+questions.svar1+'</input><input type="radio" value="2">'+questions.svar2+'</input><input type="radio" value="3">'+questions.svar3+'</input></div>');
        console.dir(questions.svarone);
        
    }
}
let text = ["A fost odata ca-n povesti. A fost ca niciodata",
    "Tu esti Mircea? Da-mparate! Am venit sa mi te-nchini",
    "Pe-un picior de plai, Pe-o gura de rai, Iata vin în cale",
    "Pe langa plopii fara sot. Adesea am trecut;"
];

let myText;
let index = 0;
let seconds = 60;
let gameStatus = false;
let accuraty = 0

function timer () {
    if (gameStatus) {
        --seconds;
        if (seconds === 0) {
            gameStatus = false;
            accuraty = accuraty / myText.length * 100;
            showRezult();
        }
    }
}

function showRezult() {
    let showText = document.getElementById("text");
    let element = document.getElementById("typedText");
    let time = 60 - seconds;
    element.innerHTML = "";
    showText.innerHTML = "<span class='green'>" + "Your accuraty is: " + accuraty +
     "% in " + time + " seconds" + "</span>";
     if (accuraty === 100) {
        element.innerHTML = "<span class='green'>" + "✨🎉 PERFECT 🎉✨" + "</snap>";
     }
     if (accuraty >= 88 && accuraty <= 99) {
        element.innerHTML = "<span class='green'>" + "🔥⭐ALMOST PERFECT⭐🔥" + "</snap>";
     }
     if (accuraty >= 75 && accuraty <= 87) {
        element.innerHTML = "<span class='green'>" + "👏GOOD👏" + "</snap>";
     }
     if (accuraty >= 55 && accuraty <= 74) {
        element.innerHTML = "<span class='green'>" + "👍NICE👍" + "</snap>";
     } else  if (accuraty < 54) {
        element.innerHTML = "<span class='green'>" + "🤏✍️YOU NEED TO PRACTICE MORE✍️" + "</snap>";
     }
}

function showDetalis() {
    let left = document.getElementById("detalis");
    left.innerHTML = "<span class='yellow'>" + index + " / " + myText.length + "</span>";
    let time = document.getElementById("timeDiv");
    time.innerHTML = "<span class='yellow'>" + seconds + "</span>";
}

function redisplayColors(text) {
    let element = document.getElementById("typedText");
    for (let i = 0; i < text.length; ++i) {
        if (text[i] == myText[i]) {
            element.innerHTML += "<span class='green'>" + text[i] + "</span>";
        } else {
            element.innerHTML += "<span class='red'>" + text[i] + "</span>";
        }
    }
}

function showLetter(e) {
    if (gameStatus) {
        let element = document.getElementById("typedText");
        if (e.key === "Backspace" && index) {
            --index;
            let context = element.textContent; 
            context = context.slice(0, -1); 
            element.textContent = "";
            redisplayColors(context);
            return;
        }
        if (index < myText.length && myText[index] === e.key && e.key.length == 1) {
            element.innerHTML += "<span class='green'>" + e.key + "</span>";
            ++index;
            ++accuraty;
        } else  if (index < myText.length && myText[index] !== e.key && e.key.length == 1) {
            element.innerHTML += "<span class='red'>" + e.key + "</span>";
            ++index;
        }
        if (index === myText.length) {
            gameStatus = false;
            accuraty = accuraty / myText.length * 100;
            showRezult();
        }
    }
}

function resumeGame() {
    gameStatus = true;
    let button = document.getElementById("startGame");
    button.textContent = "PAUSE";
    button.setAttribute('onclick',
        `pauseGame()`);
        isJumping = false;
}

function pauseGame() {
    gameStatus = false;
    let button = document.getElementById("startGame");
    button.textContent = "RESUME";
    button.setAttribute('onclick',
        `resumeGame()`);
}

function startGame() {
    gameStatus = true;
    myText = text[Math.floor(Math.random() * text.length)];
    let showText = document.getElementById("text");
    showText.innerHTML = "<span class='purple'>" + myText + "</span>";;
    setInterval(timer, 1000);
    setInterval(showDetalis, 200)
    document.addEventListener("keydown", showLetter);
    let startButton = document.getElementById("startGame");
    startButton.textContent = "PAUSE";
    startButton.setAttribute('onclick',
        `pauseGame()`);
}

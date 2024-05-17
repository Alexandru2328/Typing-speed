let text = ["ana are 4 mere", "corina este in oras", "ana este la deal"];
let myText;
let index = 0;
let seconds = 0;
let minutes = 0;
let status = false;
let accuraty = 0

function timer () {
    if (status) {
        ++seconds;
        if (seconds === 60) {
            ++minutes;
            seconds = 0;
        }
    }
}

function showRezult() {
    let showText = document.getElementById("text");
    let element = document.getElementById("typedText");
    element.innerHTML = "";
    showText.innerHTML = "<span class='green'>" + "Your accuraty is: " + accuraty +
     "% in " + minutes + " minutes " + " and " + seconds + " seconds" + "</span>";
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
    time.innerHTML = "<span class='yellow'>" + minutes + " : " + seconds + "</span>";
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
    if (status) {
        let element = document.getElementById("typedText");
        if (e.key === "Backspace") {
            --index;
            let context = element.textContent; 
            context = context.slice(0, -1); 
            element.textContent = "";
            redisplayColors(context);
            return;
        }
        if (index < myText.length && myText[index] === e.key) {
            element.innerHTML += "<span class='green'>" + e.key + "</span>";
            ++index;
            ++accuraty;
        } else  if (index < myText.length && myText[index] !== e.key) {
            element.innerHTML += "<span class='red'>" + e.key + "</span>";
            ++index;
        }
        if (index === myText.length) {
            status = false;
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
    status = true;
    myText = text[Math.floor(Math.random() * text.length)];
    let showText = document.getElementById("text");
    showText.innerHTML = "<span class='purple'>" + myText + "</span>";;
    setInterval(timer, 1000);
    setInterval(showDetalis, 200)
    document.addEventListener("keyup", showLetter);
    let startButton = document.getElementById("startGame");
    startButton.textContent = "PAUSE";
    startButton.setAttribute('onclick',
        `pauseGame()`);
}

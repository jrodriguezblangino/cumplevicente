const words = ["anticonstitucionalmente", "murcielago", "esternocleidomastoideo", "paralelepipedo", "otorrinolaringologo", "desoxirribonucleico", "electroencefalografista", "hipopotomonstrosesquipedalio", "inconstitucionalidad", "desinteresadamente"];
let word = "";
let guessedLetters = [];
let incorrectLetters = []; // Array para letras incorrectas
let attempts = 6;
let timer;
let timeLeft = 300; // 5 minutos en segundos
let blockTime = 180; // 3 minutos en segundos
let lastIncorrectTime = 0; // Tiempo del último intento incorrecto

function startGame() {
    const currentTime = Math.floor(Date.now() / 1000); // Obtener el tiempo actual en segundos
    if (currentTime < lastIncorrectTime + blockTime) {
        const remainingTime = (lastIncorrectTime + blockTime) - currentTime;
        alert(`No puedes jugar aún. Espera ${remainingTime} segundos.`);
        return; // Salir de la función si no ha pasado el tiempo de bloqueo
    }

    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    incorrectLetters = []; // Reiniciar letras incorrectas
    attempts = 6;
    timeLeft = 300; // Reiniciar el tiempo
    document.getElementById("whatsappLogo").style.display = "none"; // Ocultar el logo de WhatsApp
    displayWord();
    drawHangman();
    document.getElementById("playAgainButton").style.display = "none"; // Ocultar botón de volver a jugar
    document.getElementById("playAgainButton").disabled = true; // Deshabilitar el botón
    document.getElementById("waitMessage").style.display = "none"; // Ocultar mensaje de espera
    document.getElementById("timerContainer").style.display = "none"; // Ocultar el contenedor del reloj
}

function displayWord() {
    const wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.innerHTML = word.split('').map(letter => {
        if (guessedLetters.includes(letter)) {
            return `<span class="letter">${letter}</span>`; // Añadir clase para animación
        }
        return '_';
    }).join(' ');
    document.getElementById("errorList").textContent = incorrectLetters.join(', '); // Mostrar letras incorrectas
}

function checkLetter() {
    const letterInput = document.getElementById("letterInput");
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (guessedLetters.includes(letter) || incorrectLetters.includes(letter) || letter.length !== 1) {
        // Animación para letras incorrectas
        document.getElementById("message").textContent = `¡Error! La letra "${letter}" ya fue intentada.`;
        document.getElementById("message").classList.add("error-animation");
        setTimeout(() => {
            document.getElementById("message").classList.remove("error-animation");
        }, 1000);
        return; // No permitir letras repetidas
    }

    guessedLetters.push(letter);

    if (!word.includes(letter)) {
        attempts--;
        incorrectLetters.push(letter); // Agregar letra incorrecta
        lastIncorrectTime = Math.floor(Date.now() / 1000); // Guardar el tiempo del último intento incorrecto
        drawHangman();
    }

    if (attempts <= 0) {
        document.getElementById("message").textContent = `¡Perdiste! La palabra era "${word}".`;
        document.getElementById("guessButton").disabled = true;
        document.getElementById("timerContainer").style.display = "block"; // Mostrar el contenedor del reloj
        startTimer(); // Iniciar el reloj
        document.getElementById("playAgainButton").style.display = "block"; // Mostrar botón de volver a jugar
        document.getElementById("playAgainButton").disabled = true; // Deshabilitar el botón hasta que el tiempo se agote
        document.getElementById("waitMessage").style.display = "block"; // Mostrar mensaje de espera
    } else if (word.split('').every(letter => guessedLetters.includes(letter))) {
        document.getElementById("message").textContent = "¡Ganaste! Has adivinado la palabra.Haz click en el logo de Whatsapp!";
        document.getElementById("whatsappLogo").style.display = "block"; // Mostrar el logo de WhatsApp
        document.getElementById("guessButton").disabled = true;
        clearInterval(timer);
    }

    displayWord();
}

function drawHangman() {
    const canvas = document.getElementById("hangmanCanvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujo del ahorcado
    context.beginPath();
    context.moveTo(50, 150); // Base
    context.lineTo(150, 150);
    context.moveTo(100, 150); // Poste
    context.lineTo(100, 20);
    context.lineTo(150, 20); // Techo
    context.moveTo(150, 20);
    context.lineTo(150, 40); // Gancho
    context.stroke();

    // Dibujo del cuerpo según los intentos
    if (attempts < 6) {
        context.beginPath();
        context.arc(150, 60, 20, 0, Math.PI * 2); // Cabeza
        context.stroke();
    }
    if (attempts < 5) {
        context.moveTo(150, 80);
        context.lineTo(150, 120); // Cuerpo
        context.stroke();
    }
    if (attempts < 4) {
        context.moveTo(150, 90);
        context.lineTo(130, 100); // Brazo izquierdo
        context.stroke();
    }
    if (attempts < 3) {
        context.moveTo(150, 90);
        context.lineTo(170, 100); // Brazo derecho
        context.stroke();
    }
    if (attempts < 2) {
        context.moveTo(150, 120);
        context.lineTo(130, 140); // Pierna izquierda
        context.stroke();
    }
    if (attempts < 1) {
        context.moveTo(150, 120);
        context.lineTo(170, 140); // Pierna derecha
        context.stroke();
    }
}

function startTimer() {
    const timeDisplay = document.getElementById("time");
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("message").textContent = "¡Tiempo agotado! La palabra era " + word + ".";
            document.getElementById("guessButton").disabled = true;
            document.getElementById("playAgainButton").style.display = "block"; // Mostrar botón de volver a jugar
            document.getElementById("playAgainButton").disabled = false; // Habilitar el botón
            document.getElementById("waitMessage").style.display = "block"; // Mostrar mensaje de espera
        }
    }, 1000);
}

function sendWhatsAppMessage() {
    const phoneNumber = "+5493541332530";
    const message = "Dame la pista final";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

document.getElementById("guessButton").addEventListener("click", checkLetter);
document.getElementById("restart").addEventListener("click", startGame);
document.getElementById("playAgainButton").addEventListener("click", () => {
    location.reload(); // Recargar la página al volver a jugar
});

// Inicializar el juego
startGame();
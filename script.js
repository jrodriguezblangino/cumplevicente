const questions = [
    { question: "¿Cuál es la capital de Argentina?", answer: "Buenos Aires" },
    { question: "¿En qué año ganó Argentina su primer Mundial de Fútbol?", answer: "1978" },
    { question: "¿Qué río es el más ancho del mundo y está en Argentina?", answer: "Rio de la Plata" },
    { question: "¿Cuántos campeonatos locales ganó Talleres?", answer: "0" },
    { question: "¿Cuántas Copas LIBERTADORES ganó River?", answer: "4" },
    { question: "¿Qué música identifica a Argentina?", answer: "Tango" }
];

let currentQuestion = 0;

function showQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("question").textContent = questions[currentQuestion].question;
        document.getElementById("answer").value = '';
        document.getElementById("feedback").textContent = '';
    } else {
        // Redirigir a la nueva página del juego
        window.location.href = "ahorcado.html";
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
        currentQuestion++;
        showQuestion();
    } else {
        document.getElementById("feedback").textContent = 'Respuesta incorrecta. Intenta de nuevo.';
    }
}

// Inicializar el cuestionario
showQuestion();

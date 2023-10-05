const questions = [
    { 
        question: 'What is HTML?',
        options: ['Hypertext Markup Language', 'Hyper Transfer Markup Language', 'Hyperlink and Text Markup Language', 'Hypertext Transfer Mode Language'],
        correctIndex: 0
    },
    { 
        question: 'What is CSS?',
        options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
        correctIndex: 1
    },
    { 
        question: 'What is JavaScript?',
        options: ['A programming language', 'A style sheet language', 'A markup language', 'A database language'],
        correctIndex: 0
    },
    { 
        question: 'HTML elements primarily do what?',
        options: ['Attract viruses', 'Style the content on a webpage', 'Handle user interactions on a webpage', 'Structure and organize content on a webpage.'],
        correctIndex: 3
    },
    { 
        question: 'What data type is created when a word becomes enclosed by double quotes?',
        options: ['A boolean', 'Integer', 'String', 'Float'],
        correctIndex: 2
    },
    { 
        question: 'Which answer best describes an array?',
        options: ['Stores information about a webpage layout', 'Function used to manipulate data','Data structure that can store multipe values', 'A master code that overrides most other types of data'],
        correctIndex: 2
    },
//    Questions for array
];

let currentQuestion = 0;
let score = 0;
let timer = 600; // 10 minutes in seconds
let interval;

function displayQuestion() {
    if (currentQuestion < questions.length) {
        const questionObj = questions[currentQuestion];
        document.getElementById('question-text').textContent = questionObj.question;
        const options = document.querySelectorAll('.option');
        for (let i = 0; i < 4; i++) {
            options[i].textContent = questionObj.options[i];
        }
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedIndex) {
    const questionObj = questions[currentQuestion];
    if (selectedIndex === questionObj.correctIndex) {
        score++;
    } else {
        timer -= 60; // Subtract 60 seconds for a wrong answer
    }
    currentQuestion++;
    displayQuestion();
}

function endQuiz() {
    clearInterval(interval);
    document.getElementById('question-text').textContent = `Quiz Over! Your score: ${score}`;
    document.getElementById('timer').textContent = 'Time: 0:00';
    const options = document.querySelectorAll('.option');
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = 'none';
    }
    document.querySelector('.quiz-score').style.display = 'block';
}

function saveScore() {
    const initials = document.getElementById('initials').value;
    const highScoresList = document.getElementById('high-scores');
    const scoreItem = document.createElement('li');
    scoreItem.textContent = `${initials}: ${score}`;
    highScoresList.appendChild(scoreItem);
}

interval = setInterval(function () {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById('timer').textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    timer--;

    if (timer < 0) {
        endQuiz();
    }
}, 1000);

displayQuestion();

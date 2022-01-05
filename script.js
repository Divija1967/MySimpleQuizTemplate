const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerBtnElement = document.getElementById('answer-buttons');

let shuffledQuestions, correctQuestionIndex;
let quizScore = 0;
let questionNumber = 0;

// click to start game
startBtn.addEventListener('click', startGame);

// click Next to go to next question
nextBtn.addEventListener('click', ()=>{
    correctQuestionIndex++;
    setNextQuestion();
})


// start the game
function startGame(){
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(()=> Math.random() - 0.5);
    correctQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
    document.getElementById('right-answers').innerText = `Current Score: 0 / 0`; 
    questionNumber = 1; 
}

// which question is being shown??
function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[correctQuestionIndex]);
    questionNumber++;
}

// view the questions
function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach((answer)=>{
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBtnElement.appendChild(button);
    })
}

// to reset
function resetState(){
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while(answerBtnElement.firstChild){
        answerBtnElement.removeChild(answerBtnElement.firstChild);
    }
}


// select answers, change score
function selectAnswer(e){
    const selectBtn = e.target;
    const correct = selectBtn.dataset.correct;

    setStatusClass(document.body,correct);
    Array.from(answerBtnElement.children).forEach((btn)=> {
        setStatusClass(btn, btn.dataset.correct);
    })
    if(shuffledQuestions.length > correctQuestionIndex + 1){
        nextBtn.classList.remove('hide');
    } else{
        startBtn.innerText = "Restart";
        startBtn.classList.remove('hide');
    }
    if(selectBtn.dataset = correct){
        quizScore++;
    }   
    document.getElementById('right-answers').innerText = `Current Score: ${quizScore} / ${questionNumber}`;  
  
}

// set
function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// clear all
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// provide questions and answers here
const questions = [
    {
        question: 'What is a duel between three people called?',
        answers: [
            {text: 'truel', correct: true},
            {text: 'thruel', correct: false},
            {text: 'three-way-duel', correct: false},
            {text: 'does not exist', correct: false},        
        ],
    },

    {
        question: 'What is the national animal of Scotland?',
        answers: [
            {text: 'Seahorse', correct: false},
            {text: 'Badger', correct: false},
            {text: 'Unicorn', correct: true},
            {text: 'Red Squirrel', correct: false},        
        ],
    },
    {
        question: 'What is the longest running Cirque de Soleil show?',
        answers: [
            {text: 'Volta', correct: false},
            {text: 'Mystère', correct: true},
            {text: 'Alegria', correct: false},
            {text: 'Crystal', correct: false},        
        ],
    },
    {
        question: 'What is Taylor Swifts lucky number?',
        answers: [
            {text: '9', correct: false},
            {text: '13', correct: true},
            {text: '21', correct: false},
            {text: '52', correct: false},        
        ],
    },
]
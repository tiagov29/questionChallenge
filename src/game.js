const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2 + 27',
        choice1: '2',
        choice2: '29',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 10 + 27',
        choice1: '2',
        choice2: '29',
        choice3: '21',
        choice4: '37',
        answer: 4,
    },
    {
        question: 'What is 2 + 40',
        choice1: '2',
        choice2: '42',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'What is 3 + 27',
        choice1: '2',
        choice2: '4',
        choice3: '30',
        choice4: '17',
        answer: 3,
    },
    {
        question: 'What is 54 + 27',
        choice1: '83',
        choice2: '85',
        choice3: '81',
        choice4: '79',
        answer: 3,
    },
    {
        question: 'What is the name of the longest river in the world',
        choice1: 'Amazonas',
        choice2: 'Nilo',
        choice3: 'Yangtze River',
        choice4: 'Yellow River',
        answer: 1,
    },
    {
        question: 'What is the capital of Lithuania',
        choice1: 'Montevideo',
        choice2: 'Paris',
        choice3: 'City of Victoria',
        choice4: 'Vilna',
        answer: 4,
    },
    {
        question: 'What is the name of the longest desert in the world',
        choice1: 'Arctic Desert',
        choice2: 'Sahara Desert',
        choice3: 'Antarctic Desert',
        choice4: 'Russian Arctic',
        answer: 3,
    },
    {
        question: 'What is the name of the city more populated in the world',
        choice1: 'Shanghai',
        choice2: 'Tokyo',
        choice3: 'Delhi',
        choice4: 'Sao Pablo',
        answer: 2,
    },
    {
        question: 'What is the name of the city that is the capital of washington',
        choice1: 'Olympia',
        choice2: 'Seattle',
        choice3: 'Tacoma',
        choice4: 'Spokane',
        answer: 1,
    },
    {
        question: 'Person with most gold olympic medals',
        choice1: 'Marit Bjorgen',
        choice4: 'Usain Bolt',
        choice3: 'Michael Phelps',
        choice4: 'Edoardo Mangiarotti',
        answer: 3,
    },
    {
        question: 'Who has the most races in f1',
        choice1: 'Michael Schumacher',
        choice4: 'Lewis Hamilton',
        choice3: 'Alain Prost',
        choice4: 'Ayrton Senna',
        answer: 2,
    },
    {
        question: 'Who has the best time in a official Dakar race',
        choice1: 'Daniel Sanders',
        choice4: 'Kevin Benavides',
        choice3: 'Sam Sunderland',
        choice4: 'Lorenzo Santolino',
        answer: 2,
    },
    {
        question: 'fotball player with most trophies',
        choice1: 'Lionel Messi',
        choice4: 'Cristiano Ronaldo',
        choice3: 'Daniel Alves',
        choice4: 'Pele',
        answer: 3,
    },
    {
        question: 'Who has more tennis grand Slam',
        choice1: 'Novak Djokovic',
        choice4: 'Rafael Nadal',
        choice3: 'Peter Sampras',
        choice4: 'Roger Federer',
        answer: 4,
    },
    {
        question: 'Most Poisonous Animal',
        choice1: 'spanish fly',
        choice4: 'Pufferfish',
        choice3: 'Asian tiger snake',
        choice4: 'Poison Dart Frog',
        answer: 2,
    },
    {
        question: 'Strongest Animal in the world',
        choice1: 'Gorilla',
        choice4: 'Rhinoceros Beetle',
        choice3: 'Dung Beetle',
        choice4: 'Elephant',
        answer: 3,
    },
    {
        question: 'the most agressive Animal in the world',
        choice1: 'Nile crocodile',
        choice4: 'Hippopotamus',
        choice3: 'African Buffalo',
        choice4: 'Chimpanzee',
        answer: 1,
    },
    {
        question: 'the most dangerous Animal in the world',
        choice1: 'Scorpions',
        choice4: 'Assassin Bugs',
        choice3: 'African Buffalo',
        choice4: 'Mosquitoes',
        answer: 4,
    },
    {
        question: 'the most dangerous shark in the world',
        choice1: 'blue shark',
        choice4: 'Blacktip Shark',
        choice3: 'white shark',
        choice4: 'whitetip shark',
        answer: 3,
    },
    {
        question: 'the quietest place on earth',
        choice1: 'Landmannalaugar, Iceland',
        choice4: 'Kelso Dunes, Mojave Desert',
        choice3: 'Building 87, Whashington',
        choice4: 'Antartica',
        answer: 3,
    },
    {
        question: 'the coldest place on earth',
        choice1: 'Dome Fuji, Antartica',
        choice4: 'Oymyakon, Russia',
        choice3: 'Dome Argus, Antartic Plateau',
        choice4: 'Denali, Alaska',
        answer: 1,
    },
    {
        question: 'true + true',
        choice1: 'NaN',
        choice4: 'false',
        choice3: '2',
        choice4: 'true',
        answer: 3,
    },
    {
        question: 'in javascript : 2 + "2"',
        choice1: '4',
        choice4: '22',
        choice3: 'undefined',
        choice4: 'NaN',
        answer: 2,
    },
    {
        question: 'undefined happen in javascript when',
        choice1: 'a variable is not defined',
        choice4: 'a variable is defined two times',
        choice3: 'a variable is defined by = ""',
        choice4: 'a variable is NaN',
        answer: 1,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter= 0
    score= 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


startGame();
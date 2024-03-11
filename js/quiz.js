const quizData = [
  {
    question: 'What type of scale does PageRank use?',
    options: ['Logarithmic', 'Linear', 'Semi-log', 'Nonlinear'],
    answer: 'Logarithmic',
  },
  {
    question: 'What is the range of the scale?',
    options: ['0-10', '0-100', '0-50', '0-1'],
    answer: '0-10',
  },
  {
    question: 'Which feature is more important in the score calculation?',
    options: ['Quality Backlinks', 'Quality Hyperlinks', 'Quantity of Hyperlinks', 'Quantity of Backlinks'],
    answer: 'Quality Backlinks',
  },
  {
    question: 'Which backlink would be more valuable when calculating a PageRank score?',
    options: ['Wikipedia', 'Minerva', 'The Guardian', 'Yahoo Answers'],
    answer: 'Wikipedia',
  },
  {
    question: 'Which area of mathematics is not used in algorithm?',
    options: ['Geometry','Linear Algebra','Graph Theory','Probability'],
    answer: 'Geometry',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  resultContainer.innerHTML = `<p>You scored ${score} out of ${quizData.length}</p><br>`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  if (incorrectAnswers.length != 0) {
    for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
    }

  resultContainer.innerHTML = `
    <p><inline>You scored ${score} out of ${quizData.length}</inline</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
  }
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);


displayQuestion();
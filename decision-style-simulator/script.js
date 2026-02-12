const questions = [
  {
    question: "You must choose a college major. What do you do?",
    options: [
      { text: "Research job market trends deeply", type: "analytical" },
      { text: "Follow your gut feeling", type: "intuitive" },
      { text: "Ask friends and decide quickly", type: "impulsive" },
      { text: "Delay decision until last moment", type: "avoidant" }
    ]
  },
  {
    question: "You receive two job offers. How do you decide?",
    options: [
      { text: "Compare salary, growth, and data", type: "analytical" },
      { text: "Choose what feels exciting", type: "intuitive" },
      { text: "Pick randomly to save time", type: "impulsive" },
      { text: "Avoid choosing and feel stressed", type: "avoidant" }
    ]
  },
  {
    question: "A conflict arises in a team project.",
    options: [
      { text: "Analyze problem and create solution plan", type: "analytical" },
      { text: "Go with what feels right emotionally", type: "intuitive" },
      { text: "React immediately without thinking", type: "impulsive" },
      { text: "Stay silent and withdraw", type: "avoidant" }
    ]
  }
];

let currentQuestion = 0;
let scores = {
  analytical: 0,
  intuitive: 0,
  impulsive: 0,
  avoidant: 0
};

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.onclick = () => selectOption(option.type);
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function selectOption(type) {
  scores[type]++;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  let dominantStyle = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const descriptions = {
    analytical: "You rely on logic, data, and structured thinking.",
    intuitive: "You trust instincts and emotional intelligence.",
    impulsive: "You act quickly and prefer fast decisions.",
    avoidant: "You tend to delay decisions under pressure."
  };

  document.getElementById("result-title").textContent =
    dominantStyle.toUpperCase();

  document.getElementById("result-description").textContent =
    descriptions[dominantStyle];
}

function restartQuiz() {
  currentQuestion = 0;
  scores = { analytical: 0, intuitive: 0, impulsive: 0, avoidant: 0 };
  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  loadQuestion();
}

loadQuestion();

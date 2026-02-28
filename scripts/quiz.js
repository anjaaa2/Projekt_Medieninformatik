const quizData = [ 

  { 
    question: "Wann wurde die Bäckerei Schmidt gegründet?", 
    answers: ["1930", "1962", "1948", "1992"], 
    correct: 2 
  }, 

  { 
    question: "Wie viele Filialen hat sie mittlerweile?", 
    answers: ["3", "7", "2", "4"], 
    correct: 3 
  }, 
  
  { 
    question: "Wie hieß der Gründer?", 
    answers: ["Wilhelm", "Daniel", "Karl", "Robert"], 
    correct: 0 
  },

  { 
    question: "Was darf bei einem klassischen Schmidt Frühstück nicht fehlen?", 
    answers: ["Ein Spiegelei", "Ein Stück Käse", "Ein Crossaint", "Pfannkuchen"], 
    correct: 2 
  },
     
  { 
    question: "Um was hat Anna die Bäckerei erweitert?", 
    answers: ["Einen Zuckerwattestand", "Eine Konditorei", "Eine Spielecke für Kinder", "Einen Garten in der Bäckerei"], 
    correct: 1 
  },  

]; 

 

let currentQuestion = 0; 
let score = 0; 
const questionEl = document.getElementById("question"); 
const answersEl = document.getElementById("answers"); 
const nextBtn = document.getElementById("next-btn"); 
const progressEl = document.getElementById("progress"); 

 

function loadQuestion() { 
  nextBtn.disabled = true; 
  answersEl.innerHTML = ""; 

 
  const q = quizData[currentQuestion]; 
  questionEl.textContent = q.question; 
  progressEl.textContent = `Frage ${currentQuestion + 1} von ${quizData.length}`; 

 

  q.answers.forEach((answer, index) => { 
    const btn = document.createElement("button"); 
    btn.textContent = answer; 
    btn.addEventListener("click", () => selectAnswer(index)); 
    answersEl.appendChild(btn); 
  }); 

} 

 

function selectAnswer(index) { 
  const q = quizData[currentQuestion]; 
  const answerButtons = answersEl.querySelectorAll("button"); 

 

  // Buttons deaktivieren 

  answerButtons.forEach(btn => btn.disabled = true); 

 

  // Richtig/Falsch markieren 

  if (index === q.correct) { 
    answerButtons[index].classList.add("correct"); 
    score++; 

  } else { 
    answerButtons[index].classList.add("wrong"); 
    answerButtons[q.correct].classList.add("correct"); 
  } 

 
  nextBtn.disabled = false; 
} 

 

nextBtn.addEventListener("click", () => { 
  currentQuestion++; 

  if (currentQuestion < quizData.length) { 
    loadQuestion(); 
  } else { 
    showResult(); 
  } 

}); 

 

function showResult() {

  const quizCard = document.querySelector(".quiz-card");

  quizCard.innerHTML = `
    <div class="result-screen">
      <h2 class="result-title">Ergebnis</h2>
      
      <p class="result-score">
        Du hast <strong>${score}</strong> von 
        <strong>${quizData.length}</strong> Fragen richtig beantwortet.
      </p>

      <div class="result-bar">
        <div class="result-progress" 
             style="width: ${(score / quizData.length) * 100}%">
        </div>
      </div>

      <button class="result-btn" onclick="location.reload()">
        Nochmal spielen
      </button>
    </div>
  `;
} 

// Quiz starten 

loadQuestion(); 
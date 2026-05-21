// =========================================================
//  QUIZ LOGIC
//  ✏️  REPLACE the SCRIPT_URL below with your deployed
//      Google Apps Script Web App URL (see SETUP.md)
// =========================================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5udOacDlLf66tawdDIfb2EW26J1TKtxg_3z3NRSuV5ZMP03XFiLMtDyQOdF3RCsCk/exec";

// ── State ────────────────────────────────────────────────
let currentIndex = 0;
let userAnswers = new Array(QUESTIONS.length).fill(null);
let timerInterval = null;
let secondsLeft = 20 * 60; // 20 minutes
let studentInfo = {};

// ── Start Quiz ───────────────────────────────────────────
function startQuiz() {
  const name  = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  const batch = document.getElementById("studentBatch").value.trim();

  if (!name || !email || !batch) {
    shakeForm();
    return;
  }
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  studentInfo = { name, email, batch, startTime: new Date().toISOString() };

  switchScreen("quiz");
  renderQuestion(0);
  startTimer();
}

function shakeForm() {
  const form = document.querySelector(".student-form");
  form.classList.add("shake");
  setTimeout(() => form.classList.remove("shake"), 500);
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

// ── Timer ────────────────────────────────────────────────
function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    secondsLeft--;
    updateTimerDisplay();
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
    if (secondsLeft <= 120) {
      document.getElementById("timer").classList.add("timer-urgent");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `⏱ ${m}:${s}`;
}

// ── Render Question ──────────────────────────────────────
function renderQuestion(index) {
  const q = QUESTIONS[index];
  currentIndex = index;

  document.getElementById("qCategory").textContent = q.category;
  document.getElementById("qNumber").textContent = `Question ${index + 1}`;
  document.getElementById("qText").textContent = q.question;
  document.getElementById("questionCounter").textContent = `Q ${index + 1} / ${QUESTIONS.length}`;

  // Progress bar
  const pct = ((index + 1) / QUESTIONS.length) * 100;
  document.getElementById("progressFill").style.width = pct + "%";

  // Options
  const grid = document.getElementById("optionsGrid");
  grid.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn" + (userAnswers[index] === i ? " selected" : "");
    btn.innerHTML = `<span class="opt-letter">${["A","B","C","D"][i]}</span><span class="opt-text">${opt}</span>`;
    btn.onclick = () => selectOption(i);
    grid.appendChild(btn);
  });

  // Nav buttons
  document.getElementById("prevBtn").style.display = index === 0 ? "none" : "inline-flex";
  document.getElementById("nextBtn").style.display = index === QUESTIONS.length - 1 ? "none" : "inline-flex";
  document.getElementById("submitBtn").style.display = index === QUESTIONS.length - 1 ? "inline-flex" : "none";

  // Animate card
  const card = document.getElementById("questionCard");
  card.classList.remove("slide-in");
  void card.offsetWidth;
  card.classList.add("slide-in");
}

function selectOption(i) {
  userAnswers[currentIndex] = i;
  document.querySelectorAll(".option-btn").forEach((b, idx) => {
    b.classList.toggle("selected", idx === i);
  });
}

// ── Navigation ───────────────────────────────────────────
function nextQuestion() {
  if (currentIndex < QUESTIONS.length - 1) renderQuestion(currentIndex + 1);
}

function prevQuestion() {
  if (currentIndex > 0) renderQuestion(currentIndex - 1);
}

// ── Submit ───────────────────────────────────────────────
function submitQuiz() {
  clearInterval(timerInterval);

  const timeTaken = 20 * 60 - secondsLeft; // seconds spent
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const timeStr = `${minutes}m ${seconds}s`;

  // Score
  let score = 0;
  QUESTIONS.forEach((q, i) => { if (userAnswers[i] === q.answer) score++; });

  // Build detailed answer log
  const details = QUESTIONS.map((q, i) => ({
    question: q.question,
    category: q.category,
    selected: userAnswers[i] !== null ? q.options[userAnswers[i]] : "Not answered",
    correct: q.options[q.answer],
    isCorrect: userAnswers[i] === q.answer
  }));

  showResult(score, timeStr, details);
  sendToSheets(score, timeStr, details);
}

// ── Result Screen ─────────────────────────────────────────
function showResult(score, timeStr, details) {
  switchScreen("result");

  const pct = Math.round((score / QUESTIONS.length) * 100);
  document.getElementById("scoreNum").textContent = score;
  document.getElementById("scorePct").textContent = pct + "%";

  // Animate ring
  const circumference = 327;
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    document.getElementById("ringFill").style.strokeDashoffset = offset;
  }, 300);

  // Emoji & message
  let emoji, title, msg;
  if (pct >= 80) { emoji = "🏆"; title = "Excellent!"; msg = "Outstanding Salesforce knowledge!"; }
  else if (pct >= 60) { emoji = "🎯"; title = "Good Job!"; msg = "Solid understanding — keep it up!"; }
  else if (pct >= 40) { emoji = "📚"; title = "Keep Studying!"; msg = "Review the topics you missed."; }
  else { emoji = "💪"; title = "Don't Give Up!"; msg = "More practice will get you there."; }

  document.getElementById("resultEmoji").textContent = emoji;
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultMsg").textContent = msg;

  // Breakdown
  const cats = {};
  details.forEach(d => {
    if (!cats[d.category]) cats[d.category] = { correct: 0, total: 0 };
    cats[d.category].total++;
    if (d.isCorrect) cats[d.category].correct++;
  });

  const breakdown = document.getElementById("resultBreakdown");
  breakdown.innerHTML = "<h4>Category Breakdown</h4>";
  Object.entries(cats).forEach(([cat, v]) => {
    const p = Math.round((v.correct / v.total) * 100);
    breakdown.innerHTML += `
      <div class="breakdown-row">
        <span class="cat-name">${cat}</span>
        <div class="cat-bar"><div class="cat-fill" style="width:${p}%"></div></div>
        <span class="cat-score">${v.correct}/${v.total}</span>
      </div>`;
  });
}

// ── Send to Google Sheets ─────────────────────────────────
async function sendToSheets(score, timeStr, details) {
  const statusEl = document.getElementById("submitStatus");

  // Build per-question columns
  const perQ = {};
  details.forEach((d, i) => {
    perQ[`Q${i + 1}_Question`]  = d.question;
    perQ[`Q${i + 1}_YourAnswer`] = d.selected;
    perQ[`Q${i + 1}_Correct`]   = d.correct;
    perQ[`Q${i + 1}_Result`]    = d.isCorrect ? "✓" : "✗";
  });

  const payload = {
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name:  studentInfo.name,
    email: studentInfo.email,
    batch: studentInfo.batch,
    score: `${score} / ${QUESTIONS.length}`,
    percentage: Math.round((score / QUESTIONS.length) * 100) + "%",
    timeTaken: timeStr,
    ...perQ
  };

  try {
    if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      // Demo mode — no real URL set yet
      setTimeout(() => {
        statusEl.innerHTML = `<span class="status-warn">⚠️ Demo mode: Set your Google Apps Script URL in quiz.js to enable sheet logging.</span>`;
      }, 1500);
      return;
    }

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    statusEl.innerHTML = `<span class="status-ok">✅ Results saved to Google Sheets!</span>`;
  } catch (err) {
    statusEl.innerHTML = `<span class="status-warn">⚠️ Could not save online. Check your Apps Script URL.</span>`;
    console.error("Sheet submit error:", err);
  }
}

// ── Retry ────────────────────────────────────────────────
function retryQuiz() {
  currentIndex = 0;
  userAnswers = new Array(QUESTIONS.length).fill(null);
  secondsLeft = 20 * 60;
  studentInfo = {};
  document.getElementById("timer").classList.remove("timer-urgent");
  switchScreen("landing");
}

// ── Screen Switch ─────────────────────────────────────────
function switchScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

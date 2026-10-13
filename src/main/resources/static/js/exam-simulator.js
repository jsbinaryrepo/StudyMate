// ⭐ UNIQUE FEATURE: AI EXAM SIMULATOR & EVALUATION SYSTEM
window.StudyMateExamSimulator = (function() {

  let currentExam = null;
  let currentQuestionIndex = 0;
  let timerInterval = null;
  let remainingSeconds = 90 * 60; // 90 minutes

  const defaultQuestions = [
    {
      num: 1,
      marks: 10,
      topic: "Virtual Memory",
      text: "Explain the concept of virtual memory and discuss its advantages in modern OS architectures.",
      answer: "Virtual memory creates an abstraction between logical and physical addresses using MMU and page tables...",
      markedForReview: false,
      answered: true
    },
    {
      num: 2,
      marks: 10,
      topic: "Deadlock Avoidance",
      text: "State the 4 Coffman conditions for deadlock. How does the Banker's algorithm achieve deadlock avoidance?",
      answer: "The four conditions are Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait...",
      markedForReview: false,
      answered: true
    },
    {
      num: 3,
      marks: 10,
      topic: "CPU Scheduling",
      text: "Given process burst times P1=6ms, P2=2ms, P3=8ms with arrival time 0, calculate average waiting time using SJF.",
      answer: "SJF order: P2 (2ms) -> P1 (6ms) -> P3 (8ms). Average waiting time is 2.66ms...",
      markedForReview: true,
      answered: false
    },
    {
      num: 4,
      marks: 10,
      topic: "Memory Management",
      text: "Compare and contrast Paging versus Segmentation with respect to memory allocation, sharing, and fragmentation.",
      answer: "",
      markedForReview: false,
      answered: false
    },
    {
      num: 5,
      marks: 10,
      topic: "TLB & Page Tables",
      text: "Explain the working of the Translation Lookaside Buffer (TLB) and derive the formula for Effective Access Time (EAT).",
      answer: "",
      markedForReview: false,
      answered: false
    },
    {
      num: 6,
      marks: 10,
      topic: "Thrashing",
      text: "Write short notes on: (a) Thrashing and Working Set Model, (b) Belady's Anomaly in FIFO page replacement.",
      answer: "",
      markedForReview: false,
      answered: false
    }
  ];

  function startExam(subjectName, totalMarks, durationMinutes) {
    totalMarks = totalMarks || 60;
    durationMinutes = durationMinutes || 90;
    remainingSeconds = durationMinutes * 60;
    currentQuestionIndex = 0;

    currentExam = {
      subject: subjectName || "Operating Systems",
      totalMarks: totalMarks,
      durationMinutes: durationMinutes,
      questions: JSON.parse(JSON.stringify(defaultQuestions))
    };

    // Render viewport
    let viewport = document.getElementById('exam-simulator-viewport');
    if (!viewport) {
      viewport = document.createElement('div');
      viewport.id = 'exam-simulator-viewport';
      viewport.className = 'exam-viewport';
      document.body.appendChild(viewport);
    }
    viewport.style.display = 'flex';

    renderExamInterface();
    startTimer();

    if (window.StudyMateApp) {
      window.StudyMateApp.showToast("Exam Mode Started. Good luck!", "info");
    }
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        submitExam();
      } else {
        updateTimerDisplay();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const el = document.getElementById('exam-timer');
    if (!el) return;
    const hrs = Math.floor(remainingSeconds / 3600);
    const mins = Math.floor((remainingSeconds % 3600) / 60);
    const secs = remainingSeconds % 60;
    el.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    if (remainingSeconds < 600) {
      el.classList.add('urgent');
    }
  }

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  function renderExamInterface() {
    const vp = document.getElementById('exam-simulator-viewport');
    if (!vp || !currentExam) return;

    const q = currentExam.questions[currentQuestionIndex];

    vp.innerHTML = `
      <div class="exam-topbar">
        <div class="exam-brand">
          <span class="exam-mode-badge">EXAM MODE</span>
          <span class="exam-subject-title">${currentExam.subject} Midterm Examination</span>
        </div>
        <div class="exam-timer-box">
          <span class="timer-icon">⏱️</span>
          <span class="exam-timer-display" id="exam-timer">01:29:59</span>
        </div>
      </div>

      <div class="exam-workspace">
        <div class="exam-question-pane">
          <div class="question-meta-bar">
            <span class="q-number-pill">Question ${q.num} of ${currentExam.questions.length}</span>
            <span class="q-marks-pill">${q.marks} Marks • ${q.topic}</span>
          </div>

          <div class="question-statement">${q.text}</div>

          <textarea id="exam-student-answer" class="exam-answer-editor" placeholder="Write your exam answer here. Use clear points, formulas, and headings...">${q.answer || ''}</textarea>
        </div>

        <div class="exam-nav-sidebar">
          <div class="nav-grid-title">Question Palette</div>
          <div class="question-grid" id="exam-q-grid">
            ${currentExam.questions.map((item, idx) => {
              let cls = '';
              let symbol = idx + 1;
              if (idx === currentQuestionIndex) cls += ' current';
              if (item.markedForReview) {
                cls += ' review';
                symbol += ' ?';
              } else if (item.answered) {
                cls += ' answered';
                symbol += ' ✓';
              }
              return `<button class="grid-q-btn ${cls}" onclick="StudyMateExamSimulator.jumpToQuestion(${idx})">${symbol}</button>`;
            }).join('')}
          </div>

          <div class="exam-legend">
            <div class="legend-item"><span class="legend-dot" style="background:#065f46"></span> Answered (✓)</div>
            <div class="legend-item"><span class="legend-dot" style="background:#78350f"></span> Marked for Review (?)</div>
            <div class="legend-item"><span class="legend-dot" style="background:#1a2c4e"></span> Not Attempted (—)</div>
          </div>
        </div>
      </div>

      <div class="exam-bottombar">
        <button class="exam-btn exam-btn-prev" onclick="StudyMateExamSimulator.prevQuestion()">← Previous</button>
        <div style="display:flex; gap:12px;">
          <button class="exam-btn exam-btn-review" onclick="StudyMateExamSimulator.toggleReview()">Mark for Review</button>
          <button class="exam-btn exam-btn-next" onclick="StudyMateExamSimulator.nextQuestion()">Next Question →</button>
        </div>
        <button class="exam-btn exam-btn-submit" onclick="StudyMateExamSimulator.submitExam()">Submit Exam</button>
      </div>
    `;

    // Bind real-time input
    const ta = document.getElementById('exam-student-answer');
    if (ta) {
      ta.addEventListener('input', (e) => {
        currentExam.questions[currentQuestionIndex].answer = e.target.value;
        currentExam.questions[currentQuestionIndex].answered = e.target.value.trim().length > 0;
        updateNavGrid();
      });
    }
  }

  function updateNavGrid() {
    const grid = document.getElementById('exam-q-grid');
    if (!grid || !currentExam) return;
    grid.innerHTML = currentExam.questions.map((item, idx) => {
      let cls = '';
      let symbol = idx + 1;
      if (idx === currentQuestionIndex) cls += ' current';
      if (item.markedForReview) {
        cls += ' review';
        symbol += ' ?';
      } else if (item.answered) {
        cls += ' answered';
        symbol += ' ✓';
      }
      return `<button class="grid-q-btn ${cls}" onclick="StudyMateExamSimulator.jumpToQuestion(${idx})">${symbol}</button>`;
    }).join('');
  }

  function saveCurrentAnswer() {
    const ta = document.getElementById('exam-student-answer');
    if (ta && currentExam) {
      const val = ta.value;
      currentExam.questions[currentQuestionIndex].answer = val;
      currentExam.questions[currentQuestionIndex].answered = val.trim().length > 0;
    }
  }

  function jumpToQuestion(idx) {
    saveCurrentAnswer();
    currentQuestionIndex = idx;
    renderExamInterface();
  }

  function nextQuestion() {
    saveCurrentAnswer();
    if (currentQuestionIndex < currentExam.questions.length - 1) {
      currentQuestionIndex++;
      renderExamInterface();
    }
  }

  function prevQuestion() {
    saveCurrentAnswer();
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderExamInterface();
    }
  }

  function toggleReview() {
    saveCurrentAnswer();
    const q = currentExam.questions[currentQuestionIndex];
    q.markedForReview = !q.markedForReview;
    renderExamInterface();
  }

  function submitExam() {
    clearInterval(timerInterval);
    saveCurrentAnswer();

    // Hide viewport
    const vp = document.getElementById('exam-simulator-viewport');
    if (vp) vp.style.display = 'none';

    // Award +50 XP
    if (window.StudyMateDemo && window.StudyMateDemo.user) {
      window.StudyMateDemo.user.xp += 50;
    }

    // Show Exam Results
    if (window.StudyMateApp) {
      window.StudyMateApp.navigateTo('exam-results');
      window.StudyMateApp.showToast("Exam Submitted Successfully! (+50 XP)", "success");
    }
  }

  return {
    startExam: startExam,
    jumpToQuestion: jumpToQuestion,
    nextQuestion: nextQuestion,
    prevQuestion: prevQuestion,
    toggleReview: toggleReview,
    submitExam: submitExam
  };
})();

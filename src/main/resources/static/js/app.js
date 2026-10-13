// Master Application Controller for StudyMate AI
window.StudyMateApp = (function() {

  let currentView = 'dashboard';
  let activeSubject = 'sub_os';
  let flashcardIndex = 0;
  let quizIndex = 0;
  let quizAnswers = {};

  function init() {
    bindNavigation();
    initTheme();
    renderCurrentView();
    updateHeaderStats();
  }

  function initTheme() {
    const saved = localStorage.getItem('studymate_theme') || 'light';
    setTheme(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('studymate_theme', theme);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  function bindNavigation() {
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route');
        navigateTo(route);
      });
    });
  }

  function navigateTo(route) {
    currentView = route;
    // Update active nav link
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-route') === route) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderCurrentView() {
    const container = document.getElementById('view-container');
    if (!container) return;

    // Toggle sidebar visibility for landing page
    const sidebar = document.getElementById('sidebar');
    const header = document.getElementById('top-header');

    if (currentView === 'landing') {
      if (sidebar) sidebar.style.display = 'none';
      if (header) header.style.display = 'none';
      if (container.parentElement) container.parentElement.style.marginLeft = '0';
    } else {
      if (sidebar) sidebar.style.display = 'flex';
      if (header) header.style.display = 'flex';
      if (container.parentElement) container.parentElement.style.marginLeft = '270px';
    }

    switch (currentView) {
      case 'landing': renderLanding(container); break;
      case 'dashboard': renderDashboard(container); break;
      case 'subjects': renderSubjects(container); break;
      case 'materials': renderMaterials(container); break;
      case 'ask-notes': renderAskNotes(container); break;
      case 'summary': renderSummary(container); break;
      case 'priority': renderPriority(container); break;
      case 'questions': renderQuestions(container); break;
      case 'flashcards': renderFlashcards(container); break;
      case 'quiz': renderQuiz(container); break;
      case 'exam-simulator': renderExamConfig(container); break;
      case 'exam-results': renderExamResults(container); break;
      case 'mistakes': renderMistakes(container); break;
      case 'revision': renderRevision(container); break;
      case 'planner': renderPlanner(container); break;
      case 'answer-generator': renderAnswerGenerator(container); break;
      case 'image-solver': renderImageSolver(container); break;
      case 'coding-assistant': renderCodingAssistant(container); break;
      case 'voice-assistant': renderVoiceAssistant(container); break;
      case 'analytics': renderAnalytics(container); break;
      case 'profile': renderProfile(container); break;
      case 'settings': renderSettings(container); break;
      default: renderDashboard(container); break;
    }
  }

  // -------------------------------------------------------------
  // Views Implementation
  // -------------------------------------------------------------

  function renderLanding(container) {
    container.innerHTML = `
      <div style="background:linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%); color:#ffffff; min-height:100vh; padding:40px 24px;">
        <nav style="max-width:1200px; margin:0 auto 60px auto; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="brand-icon">🎓</div>
            <span style="font-size:22px; font-weight:800;">StudyMate AI</span>
          </div>
          <div style="display:flex; gap:14px;">
            <button class="btn btn-secondary" onclick="StudyMateApp.navigateTo('dashboard')">Try Demo</button>
            <button class="btn btn-primary" onclick="StudyMateApp.navigateTo('dashboard')">Start Studying Free</button>
          </div>
        </nav>

        <header style="max-width:880px; margin:0 auto; text-align:center; padding:40px 0 60px 0;">
          <div style="display:inline-block; background:rgba(79,70,229,0.3); border:1px solid #6366f1; padding:6px 16px; border-radius:999px; font-size:13px; font-weight:700; margin-bottom:20px; color:#c7d2fe;">
            ✨ THE INTELLIGENT PERSONAL LEARNING SYSTEM FOR COLLEGE STUDENTS
          </div>
          <h1 style="font-size:48px; font-weight:900; line-height:1.2; margin-bottom:20px;">
            Your Personal AI Learning & Exam Preparation System
          </h1>
          <p style="font-size:19px; color:#cbd5e1; max-width:700px; margin:0 auto 36px auto; line-height:1.6;">
            Upload your study material, understand difficult concepts, practice intelligently, simulate your exam, and discover exactly what you need to improve.
          </p>
          <div style="display:flex; gap:16px; justify-content:center;">
            <button class="btn btn-primary btn-lg" onclick="StudyMateApp.navigateTo('dashboard')">Start Studying Free</button>
            <button class="btn btn-secondary btn-lg" style="color:white; border-color:#475569;" onclick="StudyMateApp.navigateTo('dashboard')">Explore Features</button>
          </div>
        </header>

        <section style="max-width:1100px; margin:40px auto; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:40px;">
          <h2 style="text-align:center; font-size:28px; margin-bottom:32px;">Why StudyMate?</h2>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
            <div style="background:rgba(255,255,255,0.05); padding:24px; border-radius:16px;">
              <div style="font-size:32px; margin-bottom:12px;">📚</div>
              <h3 style="font-size:18px; margin-bottom:8px;">Learn from Your Own Notes</h3>
              <p style="color:#94a3b8; font-size:14px;">Upload PDFs, PPTs, or handwritten scans directly from your laptop. AI references your exact syllabus.</p>
            </div>
            <div style="background:rgba(255,255,255,0.05); padding:24px; border-radius:16px;">
              <div style="font-size:32px; margin-bottom:12px;">🎯</div>
              <h3 style="font-size:18px; margin-bottom:8px;">Exam-Focused Priority</h3>
              <p style="color:#94a3b8; font-size:14px;">Identifies High, Medium, and Low frequency exam topics so you never study the wrong chapter.</p>
            </div>
            <div style="background:rgba(255,255,255,0.05); padding:24px; border-radius:16px;">
              <div style="font-size:32px; margin-bottom:12px;">🧠</div>
              <h3 style="font-size:18px; margin-bottom:8px;">Mistake Memory</h3>
              <p style="color:#94a3b8; font-size:14px;">Tracks recurring conceptual and numerical mistakes, converting them into recovery revision sessions.</p>
            </div>
            <div style="background:rgba(255,255,255,0.05); padding:24px; border-radius:16px;">
              <div style="font-size:32px; margin-bottom:12px;">🎓</div>
              <h3 style="font-size:18px; margin-bottom:8px;">Realistic Exam Simulator</h3>
              <p style="color:#94a3b8; font-size:14px;">Experience real university exam pressure with timed mock exams, navigation grids, and AI evaluation.</p>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  function renderDashboard(container) {
    const data = window.StudyMateDemo;
    container.innerHTML = `
      <div class="content-view">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px;">
          <div>
            <h1 style="font-size:28px; font-weight:800; color:var(--text-main);">Good Morning, ${data.user.name} 👋</h1>
            <p style="color:var(--text-muted); font-size:15px;">You have <strong>Operating Systems</strong> exam coming up in 6 days. Let's practice!</p>
          </div>
          <button class="btn btn-primary" onclick="StudyMateApp.navigateTo('materials')">
            <span>➕</span> Upload Study Material
          </button>
        </div>

        <!-- Metric Stat Cards -->
        <div class="grid-4">
          <div class="card stat-card">
            <div class="stat-icon" style="background:#e0e7ff; color:#4338ca;">📚</div>
            <div>
              <div class="stat-value">${data.subjects.length}</div>
              <div class="stat-label">Active Subjects</div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:#ede9fe; color:#7c3aed;">📄</div>
            <div>
              <div class="stat-value">24</div>
              <div class="stat-label">Study Materials</div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:#fef3c7; color:#d97706;">🧠</div>
            <div>
              <div class="stat-value">320</div>
              <div class="stat-label">Flashcards</div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:#d1fae5; color:#059669;">🔥</div>
            <div>
              <div class="stat-value">${data.user.streakDays} Days</div>
              <div class="stat-label">Study Streak</div>
            </div>
          </div>
        </div>

        <!-- Middle Section: Today's Progress & Exam Readiness -->
        <div class="grid-2">
          <div class="card">
            <div class="card-header">
              <span class="card-title">Today's Progress</span>
              <span style="font-weight:700; color:var(--accent);">${data.user.todayProgress}% Completed</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width:${data.user.todayProgress}%;"></div>
            </div>
            <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:14px;">
                <span>✅ Revise Memory Management notes</span>
                <span class="badge badge-low">Done</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:14px;">
                <span>✅ Practice 8 Deadlock flashcards</span>
                <span class="badge badge-low">Done</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:14px;">
                <span>⏳ Take 10-Question OS Mini Quiz</span>
                <span class="badge badge-med">Pending</span>
              </div>
            </div>
            <button class="btn btn-secondary" style="width:100%; margin-top:20px;" onclick="StudyMateApp.navigateTo('quiz')">Continue Studying →</button>
          </div>

          <!-- ⭐ Novelty: Exam Readiness Gauge -->
          <div class="card" style="text-align:center;">
            <div class="card-header">
              <span class="card-title">🎓 Exam Readiness Score</span>
              <span class="badge badge-high">6 Days Left</span>
            </div>
            <div class="readiness-gauge">
              <svg viewBox="0 0 36 36" style="width:100%; height:100%;">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-color)" stroke-width="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4f46e5" stroke-width="3" stroke-dasharray="${data.readiness.overall}, 100" />
              </svg>
              <div class="readiness-number">${data.readiness.overall}%</div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:16px; font-size:13px; text-align:left;">
              <div>Concept Mastery: <strong>${data.readiness.concept}%</strong></div>
              <div>Question Accuracy: <strong>${data.readiness.accuracy}%</strong></div>
              <div>Time Management: <strong>${data.readiness.time}%</strong></div>
              <div>Revision Coverage: <strong>${data.readiness.revision}%</strong></div>
            </div>
            <p style="font-size:11px; color:var(--text-light); margin-top:12px;">${data.readiness.disclaimer}</p>
          </div>
        </div>

        <!-- Upcoming Exams & Weak Areas -->
        <div class="grid-2">
          <div class="card">
            <div class="card-header">
              <span class="card-title">📅 Upcoming Exams</span>
              <button class="btn btn-secondary" style="padding:4px 10px; font-size:12px;" onclick="StudyMateApp.navigateTo('subjects')">View All</button>
            </div>
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-surface-alt); border-radius:var(--radius-sm);">
                <div>
                  <strong>Operating Systems (CS501)</strong>
                  <div style="font-size:12px; color:var(--text-muted);">5 Units • Comprehensive</div>
                </div>
                <span class="badge badge-high">6 days left</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-surface-alt); border-radius:var(--radius-sm);">
                <div>
                  <strong>Database Systems (CS502)</strong>
                  <div style="font-size:12px; color:var(--text-muted);">5 Units • SQL & Transactions</div>
                </div>
                <span class="badge badge-med">12 days left</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-surface-alt); border-radius:var(--radius-sm);">
                <div>
                  <strong>Artificial Intelligence (CS503)</strong>
                  <div style="font-size:12px; color:var(--text-muted);">4 Units • Heuristics & ML</div>
                </div>
                <span class="badge badge-low">18 days left</span>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <span class="card-title">⚠️ Identified Weak Areas (Mistake Memory)</span>
              <button class="btn btn-secondary" style="padding:4px 10px; font-size:12px;" onclick="StudyMateApp.navigateTo('mistakes')">Review Mistakes</button>
            </div>
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="padding:12px; border-left:4px solid var(--danger); background:var(--danger-light); border-radius:4px;">
                <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--danger);">
                  <span>🔴 Memory Management</span>
                  <span>5 Mistakes</span>
                </div>
                <div style="font-size:13px; color:var(--text-main); margin-top:4px;">Page fault rate & FIFO Belady's Anomaly calculations</div>
              </div>
              <div style="padding:12px; border-left:4px solid var(--warning); background:var(--warning-light); border-radius:4px;">
                <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--warning);">
                  <span>🟡 DBMS Normalization</span>
                  <span>3 Mistakes</span>
                </div>
                <div style="font-size:13px; color:var(--text-main); margin-top:4px;">Distinguishing 3NF transitive dependency vs BCNF superkey requirement</div>
              </div>
              <button class="btn btn-primary" style="margin-top:8px;" onclick="StudyMateApp.navigateTo('revision')">⚡ Start Personalized Recovery Session</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderMaterials(container) {
    const materials = window.StudyMateDemo.materials;
    container.innerHTML = `
      <div class="content-view">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <div>
            <h1 style="font-size:26px; font-weight:800;">Study Materials & Laptop Upload</h1>
            <p style="color:var(--text-muted); font-size:14px;">Upload your course notes, slides, and textbooks directly from your laptop.</p>
          </div>
        </div>

        <!-- Upload Dropzone for Laptop Files -->
        <div class="card" style="margin-bottom:32px;">
          <input type="file" id="laptop-file-picker" style="display:none;" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,image/*" />
          <div class="upload-dropzone" id="laptop-dropzone">
            <div class="upload-icon">📁</div>
            <h3 style="font-size:18px; margin-bottom:8px;">Drop your study material here</h3>
            <p style="color:var(--text-muted); font-size:14px; margin-bottom:16px;">
              Supports <strong>PDF, DOCX, PPTX, TXT, and Images</strong> directly from your laptop.
            </p>
            <button class="btn btn-primary" type="button">Select File from Laptop</button>
          </div>

          <!-- Animated Progress Sequence Container -->
          <div id="upload-progress-box" style="display:none; margin-top:20px;">
            <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:600; margin-bottom:6px;">
              <span class="progress-status-text">Uploading from laptop...</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width:0%;"></div>
            </div>
          </div>
        </div>

        <!-- Materials Table -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Your Uploaded Materials (${materials.length})</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${materials.map(m => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:16px; border:1px solid var(--border-color); border-radius:var(--radius-sm); background:var(--bg-surface-alt);">
                <div style="display:flex; align-items:center; gap:16px;">
                  <span style="font-size:26px;">${m.type === 'PDF' ? '📕' : m.type === 'DOCX' ? '📘' : '📄'}</span>
                  <div>
                    <strong style="font-size:15px; color:var(--text-main);">${m.name}</strong>
                    <div style="font-size:12px; color:var(--text-muted);">
                      ${m.subject} • ${m.size} • Uploaded ${m.date}
                    </div>
                    <div style="display:flex; gap:6px; margin-top:6px;">
                      ${m.topics.map(t => `<span class="badge badge-low" style="font-size:11px;">${t}</span>`).join('')}
                    </div>
                  </div>
                </div>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="StudyMateApp.navigateTo('ask-notes')">🤖 Ask Notes</button>
                  <button class="btn btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="StudyMateApp.navigateTo('summary')">📖 Summary</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Initialize the real laptop file uploader
    const dropzone = document.getElementById('laptop-dropzone');
    const filePicker = document.getElementById('laptop-file-picker');
    const progressBox = document.getElementById('upload-progress-box');

    if (window.StudyMateFileUploader) {
      window.StudyMateFileUploader.initDropzone(dropzone, filePicker, progressBox, (newMat) => {
        renderMaterials(container);
      });
    }
  }

  function renderAskNotes(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:20px;">
          <h1 style="font-size:26px; font-weight:800;">Ask My Notes</h1>
          <p style="color:var(--text-muted); font-size:14px;">AI answers strictly grounded in your uploaded materials.</p>
        </div>

        <div class="chat-container">
          <div class="chat-messages" id="chat-messages-box">
            <div class="chat-bubble ai">
              <span class="chat-citation">According to your uploaded Operating Systems material (Unit 3 Notes, Page 14):</span>
              <p>Hi Nivish! I am ready to help you study. I have fully indexed your notes on <strong>Virtual Memory</strong>, <strong>CPU Scheduling</strong>, and <strong>Deadlocks</strong>. What would you like to understand?</p>
            </div>
          </div>

          <!-- Suggested prompts -->
          <div style="padding:10px 24px; display:flex; gap:8px; overflow-x:auto; background:var(--bg-surface-alt); border-top:1px solid var(--border-color);">
            <button class="btn btn-secondary" style="font-size:12px; padding:4px 10px;" onclick="StudyMateApp.sendPrompt('What is virtual memory and how does address translation work?')">Explain Virtual Memory</button>
            <button class="btn btn-secondary" style="font-size:12px; padding:4px 10px;" onclick="StudyMateApp.sendPrompt('State the four Coffman conditions for Deadlock.')">Deadlock Coffman Conditions</button>
            <button class="btn btn-secondary" style="font-size:12px; padding:4px 10px;" onclick="StudyMateApp.sendPrompt('Give me a 10-mark exam answer for CPU Scheduling.')">10-Mark Exam Answer</button>
          </div>

          <div class="chat-input-bar">
            <input type="text" id="chat-user-input" class="chat-input" placeholder="Ask a question from your notes..." onkeydown="if(event.key==='Enter') StudyMateApp.submitUserChat()" />
            <button class="btn btn-primary" onclick="StudyMateApp.submitUserChat()">Send</button>
          </div>
        </div>
      </div>
    `;
  }

  function sendPrompt(text) {
    const input = document.getElementById('chat-user-input');
    if (input) {
      input.value = text;
      submitUserChat();
    }
  }

  function submitUserChat() {
    const input = document.getElementById('chat-user-input');
    const box = document.getElementById('chat-messages-box');
    if (!input || !box || !input.value.trim()) return;

    const query = input.value.trim();
    input.value = '';

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble user';
    userMsg.textContent = query;
    box.appendChild(userMsg);
    box.scrollTop = box.scrollHeight;

    // Call Java backend
    fetch('/api/ai/ask-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: query, subjectId: 'sub_os' })
    })
    .then(r => r.json())
    .then(data => {
      renderAiResponse(box, data.citation, data.answer);
    })
    .catch(() => {
      // Graceful local engine response
      renderAiResponse(box, "According to your uploaded Operating Systems material (Unit 3 Notes, Page 14):",
        "Virtual memory decouples user logical memory from physical RAM. The Memory Management Unit (MMU) translates logical addresses (page number + offset) into physical frames using page tables. When a page isn't in memory, a Page Fault is raised, triggering disk swap.");
    });
  }

  function renderAiResponse(box, citation, answer) {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-bubble ai';
    aiMsg.innerHTML = `<span class="chat-citation">${citation}</span><p>${answer.replace(/\n/g, '<br/>')}</p>`;
    box.appendChild(aiMsg);
    box.scrollTop = box.scrollHeight;
  }

  function renderSummary(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">AI Smart Summary</h1>
          <p style="color:var(--text-muted); font-size:14px;">Instant multi-tier summaries with key formulas and exam points.</p>
        </div>

        <div class="card" style="margin-bottom:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <strong>Document:</strong> OS_Unit_3_Virtual_Memory_Complete_Notes.pdf
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary" onclick="StudyMateApp.showToast('Generating Quick Summary...', 'info')">⚡ Quick Summary</button>
              <button class="btn btn-primary" onclick="StudyMateApp.showToast('Standard Summary active', 'info')">📖 Standard Summary</button>
              <button class="btn btn-secondary" onclick="StudyMateApp.showToast('Generating Detailed Summary...', 'info')">📚 Detailed Summary</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">📖 Standard Summary Output</span>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary" style="font-size:12px;" onclick="StudyMateApp.showToast('Copied to clipboard!', 'success')">📋 Copy</button>
              <button class="btn btn-secondary" style="font-size:12px;" onclick="StudyMateApp.showToast('Saved to your Notes!', 'success')">💾 Save</button>
            </div>
          </div>
          <div style="line-height:1.8;">
            <h3 style="font-size:18px; margin-bottom:8px; color:var(--accent);">1. Core Overview</h3>
            <p style="color:var(--text-main); margin-bottom:16px;">Virtual memory enables the execution of processes that may not be completely in memory. It abstracts main memory into an extremely large, uniform array of storage, separating logical memory as viewed by the user from physical memory.</p>

            <h3 style="font-size:18px; margin-bottom:8px; color:var(--accent);">2. High-Yield Revision Points</h3>
            <ul style="padding-left:20px; margin-bottom:16px;">
              <li><strong>MMU & Page Table:</strong> Hardware translation maps page numbers to physical frames.</li>
              <li><strong>Page Fault Rate (p):</strong> Must be close to 0 to prevent severe system slowdown.</li>
              <li><strong>Belady's Anomaly:</strong> FIFO page replacement can exhibit more faults with additional physical frames.</li>
              <li><strong>Thrashing:</strong> High paging activity resulting in low CPU utilization.</li>
            </ul>

            <h3 style="font-size:18px; margin-bottom:8px; color:var(--accent);">3. Key Exam Formulas</h3>
            <div style="background:var(--bg-surface-alt); padding:16px; border-radius:8px; font-family:monospace; margin-bottom:16px;">
              Effective Access Time (EAT) = (1 - p) * ma + p * (Page Fault Overhead)<br/>
              Page Number = Logical Address / Page Size<br/>
              Offset = Logical Address % Page Size
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPriority(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">Exam Priority AI</h1>
          <p style="color:var(--text-muted); font-size:14px;">AI topic classification based on university exam patterns and your syllabus.</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;">
          <div class="card" style="border-left:5px solid var(--danger);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span class="badge badge-high">🔴 HIGH PRIORITY</span>
                <h3 style="font-size:18px; margin-top:6px;">Virtual Memory & Page Fault Calculations</h3>
              </div>
              <button class="btn btn-primary" onclick="StudyMateApp.navigateTo('ask-notes')">Study This Topic →</button>
            </div>
            <p style="margin-top:12px; color:var(--text-main);"><strong>Why?</strong> Core numerical problem appears in 90% of past semester examination papers (10 Marks).</p>
            <div style="font-size:13px; color:var(--text-muted); margin-top:8px;">Estimated study time: <strong>45 mins</strong> • Related: TLB Hit Ratio, Belady's Anomaly</div>
          </div>

          <div class="card" style="border-left:5px solid var(--danger);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span class="badge badge-high">🔴 HIGH PRIORITY</span>
                <h3 style="font-size:18px; margin-top:6px;">CPU Scheduling (SJF, Round Robin with Gantt Charts)</h3>
              </div>
              <button class="btn btn-primary" onclick="StudyMateApp.navigateTo('answer-generator')">Study This Topic →</button>
            </div>
            <p style="margin-top:12px; color:var(--text-main);"><strong>Why?</strong> Mandatory question in Section B. Requires calculating Average Waiting Time and Turnaround Time.</p>
            <div style="font-size:13px; color:var(--text-muted); margin-top:8px;">Estimated study time: <strong>40 mins</strong> • Related: Preemptive SJF, Convoy Effect</div>
          </div>

          <div class="card" style="border-left:5px solid var(--warning);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span class="badge badge-med">🟡 MEDIUM PRIORITY</span>
                <h3 style="font-size:18px; margin-top:6px;">Deadlock Avoidance (Banker's Algorithm)</h3>
              </div>
              <button class="btn btn-secondary" onclick="StudyMateApp.navigateTo('flashcards')">Review Flashcards →</button>
            </div>
            <p style="margin-top:12px; color:var(--text-main);"><strong>Why?</strong> Frequently asked 5-mark matrix problem checking allocation state safety.</p>
            <div style="font-size:13px; color:var(--text-muted); margin-top:8px;">Estimated study time: <strong>30 mins</strong> • Related: Resource Allocation Graph</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFlashcards(container) {
    const cards = window.StudyMateDemo.flashcards;
    const card = cards[flashcardIndex];

    container.innerHTML = `
      <div class="content-view">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <div>
            <h1 style="font-size:26px; font-weight:800;">AI Flashcards Drill</h1>
            <p style="color:var(--text-muted); font-size:14px;">Card ${flashcardIndex + 1} of ${cards.length} • Mastery: ${card.mastery}%</p>
          </div>
        </div>

        <div class="flashcard-wrapper" onclick="this.querySelector('.flashcard').classList.toggle('flipped')">
          <div class="flashcard" id="active-flashcard">
            <div class="flashcard-face flashcard-front">
              <span class="badge badge-low" style="margin-bottom:16px;">${card.topic}</span>
              <h2 style="font-size:22px; font-weight:700;">${card.q}</h2>
              <div style="margin-top:28px; font-size:13px; color:var(--text-light);">Click or Tap to Flip 🔄</div>
            </div>
            <div class="flashcard-face flashcard-back">
              <span class="badge badge-high" style="margin-bottom:16px;">Explanation</span>
              <p style="font-size:17px; line-height:1.6; color:var(--text-main);">${card.a.replace(/\n/g, '<br/>')}</p>
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:16px; margin-top:24px;">
          <button class="btn btn-danger" onclick="StudyMateApp.nextCard(false)">🔄 Review Again</button>
          <button class="btn btn-success" onclick="StudyMateApp.nextCard(true)">✅ Know (+20 XP)</button>
        </div>
      </div>
    `;
  }

  function nextCard(known) {
    if (known) {
      window.StudyMateDemo.user.xp += 20;
      showToast("Card Mastered! (+20 XP)", "success");
    }
    flashcardIndex = (flashcardIndex + 1) % window.StudyMateDemo.flashcards.length;
    renderCurrentView();
    updateHeaderStats();
  }

  function renderQuiz(container) {
    const questions = window.StudyMateDemo.quiz;
    const q = questions[quizIndex];

    container.innerHTML = `
      <div class="content-view">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <div>
            <h1 style="font-size:26px; font-weight:800;">AI Interactive Quiz</h1>
            <p style="color:var(--text-muted); font-size:14px;">Question ${quizIndex + 1} of ${questions.length} • Operating Systems</p>
          </div>
          <div class="streak-pill">⏱️ Timer: 04:32</div>
        </div>

        <div class="card" style="max-width:750px; margin:0 auto;">
          <div class="card-header">
            <span class="badge badge-low">${q.topic}</span>
            <span style="font-size:13px; color:var(--text-muted);">Points: 1 Mark</span>
          </div>

          <h2 style="font-size:20px; font-weight:700; margin-bottom:24px;">${q.q}</h2>

          <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px;">
            ${q.options.map((opt, i) => `
              <div class="quiz-option" style="padding:14px 18px; border:2px solid var(--border-color); border-radius:var(--radius-sm); cursor:pointer; font-weight:500; transition:all 0.2s;" onclick="StudyMateApp.selectQuizOption(${i}, this)">
                ${String.fromCharCode(65 + i)}. ${opt}
              </div>
            `).join('')}
          </div>

          <div style="display:flex; justify-content:space-between;">
            <button class="btn btn-secondary" onclick="StudyMateApp.prevQuiz()" ${quizIndex === 0 ? 'disabled' : ''}>← Previous</button>
            <button class="btn btn-primary" onclick="StudyMateApp.nextQuiz()">${quizIndex === questions.length - 1 ? 'Submit Quiz (+30 XP)' : 'Next →'}</button>
          </div>
        </div>
      </div>
    `;
  }

  function selectQuizOption(index, el) {
    document.querySelectorAll('.quiz-option').forEach(item => {
      item.style.borderColor = 'var(--border-color)';
      item.style.background = 'transparent';
    });
    el.style.borderColor = 'var(--accent)';
    el.style.background = 'rgba(79, 70, 229, 0.08)';
    quizAnswers[quizIndex] = index;
  }

  function prevQuiz() {
    if (quizIndex > 0) {
      quizIndex--;
      renderCurrentView();
    }
  }

  function nextQuiz() {
    const questions = window.StudyMateDemo.quiz;
    if (quizIndex < questions.length - 1) {
      quizIndex++;
      renderCurrentView();
    } else {
      // Submit
      window.StudyMateDemo.user.xp += 30;
      showToast("Quiz Completed! Accuracy: 75% (+30 XP)", "success");
      updateHeaderStats();
      navigateTo('dashboard');
    }
  }

  // ⭐ Flagship Feature: Launch Realistic Exam Simulator
  function renderExamConfig(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">⭐ AI Exam Simulator</h1>
          <p style="color:var(--text-muted); font-size:14px;">Experience real university semester exam pressure with AI evaluation.</p>
        </div>

        <div class="card" style="max-width:700px; margin:0 auto; padding:36px;">
          <div style="text-align:center; margin-bottom:28px;">
            <div style="font-size:44px; margin-bottom:12px;">🎓</div>
            <h2 style="font-size:22px; font-weight:800;">Configure Mock Examination</h2>
            <p style="color:var(--text-muted); font-size:14px;">The AI will generate questions strictly from your uploaded materials.</p>
          </div>

          <div style="display:flex; flex-direction:column; gap:18px;">
            <div>
              <label style="font-size:14px; font-weight:600; display:block; margin-bottom:6px;">Target Subject</label>
              <select class="chat-input" id="exam-subject-select" style="width:100%;">
                <option value="Operating Systems">Operating Systems (CS501)</option>
                <option value="DBMS">Database Management Systems (CS502)</option>
                <option value="Artificial Intelligence">Artificial Intelligence (CS503)</option>
              </select>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div>
                <label style="font-size:14px; font-weight:600; display:block; margin-bottom:6px;">Total Marks</label>
                <input type="number" class="chat-input" id="exam-marks-input" value="60" style="width:100%;" />
              </div>
              <div>
                <label style="font-size:14px; font-weight:600; display:block; margin-bottom:6px;">Duration (Minutes)</label>
                <input type="number" class="chat-input" id="exam-duration-input" value="90" style="width:100%;" />
              </div>
            </div>

            <div style="padding:16px; background:var(--bg-surface-alt); border-radius:8px; font-size:13px; color:var(--text-muted);">
              ⚠️ <strong>Strict Exam Mode:</strong> Normal dashboard sidebar and AI hints are disabled during the test. A timer runs continuously until submission.
            </div>

            <button class="btn btn-primary btn-lg" style="width:100%;" onclick="StudyMateApp.launchSimulator()">
              🚀 Enter Exam Mode
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function launchSimulator() {
    const sub = document.getElementById('exam-subject-select').value;
    const marks = parseInt(document.getElementById('exam-marks-input').value) || 60;
    const duration = parseInt(document.getElementById('exam-duration-input').value) || 90;

    if (window.StudyMateExamSimulator) {
      window.StudyMateExamSimulator.startExam(sub, marks, duration);
    }
  }

  function renderExamResults(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">Exam Evaluation & Performance Report</h1>
          <p style="color:var(--text-muted); font-size:14px;">Operating Systems Midterm Simulation Completed</p>
        </div>

        <div class="grid-3">
          <div class="card stat-card">
            <div class="stat-icon" style="background:#e0e7ff; color:#4338ca;">📝</div>
            <div>
              <div class="stat-value">42 / 60</div>
              <div class="stat-label">Total Score Awarded</div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:#d1fae5; color:#059669;">🎯</div>
            <div>
              <div class="stat-value">70%</div>
              <div class="stat-label">Accuracy Rate</div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:#fef3c7; color:#d97706;">⏱️</div>
            <div>
              <div class="stat-value">78%</div>
              <div class="stat-label">Time Efficiency</div>
            </div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-header">
              <span class="card-title">🟢 Strong Areas</span>
            </div>
            <ul style="padding-left:20px; line-height:1.8;">
              <li><strong>Process Management:</strong> Excellent Gantt chart formulation and calculation accuracy.</li>
              <li><strong>Deadlock Coffman Conditions:</strong> Full marks awarded for comprehensive definition of Banker's Algorithm.</li>
            </ul>
          </div>

          <div class="card">
            <div class="card-header">
              <span class="card-title">🔴 Weak Areas (Transferred to Mistake Memory)</span>
            </div>
            <ul style="padding-left:20px; line-height:1.8;">
              <li><strong>Memory Management:</strong> Missed effective access time calculation with TLB penalty.</li>
              <li><strong>Paging vs Segmentation:</strong> Incomplete distinction between internal and external fragmentation.</li>
            </ul>
            <button class="btn btn-primary" style="margin-top:14px; width:100%;" onclick="StudyMateApp.navigateTo('mistakes')">
              Open Mistake Memory Session →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ⭐ Innovation: Mistake Memory
  function renderMistakes(container) {
    const mistakes = window.StudyMateDemo.mistakes;
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">🧠 Mistake Memory</h1>
          <p style="color:var(--text-muted); font-size:14px;">StudyMate learns where you struggle and adapts your preparation.</p>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;">
          ${mistakes.map(m => `
            <div class="card" style="border-left:5px solid ${m.priority === 'HIGH' ? 'var(--danger)' : 'var(--warning)'};">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="badge ${m.priority === 'HIGH' ? 'badge-high' : 'badge-med'}">${m.priority} PRIORITY</span>
                    <span style="font-size:12px; color:var(--text-muted);">${m.subject} • ${m.type}</span>
                  </div>
                  <h3 style="font-size:18px; margin-top:6px;">${m.topic}</h3>
                  <div style="font-size:13px; color:var(--text-main); margin-top:4px;">
                    Occurrences: <strong style="color:var(--danger);">${m.occurrences} mistakes</strong> • Last noticed: ${m.last}
                  </div>
                </div>
                <button class="btn btn-primary" onclick="StudyMateApp.startRecovery('${m.id}')">
                  ⚡ Personalized Recovery Session
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function startRecovery(mistakeId) {
    showToast("Starting 5-Step Recovery Session...", "info");
    navigateTo('revision');
  }

  function renderRevision(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">Smart Revision Plan</h1>
          <p style="color:var(--text-muted); font-size:14px;">Personalized recovery flow to turn past mistakes into mastery.</p>
        </div>

        <div class="card" style="max-width:800px; margin:0 auto;">
          <div class="card-header">
            <span class="card-title">Recovery: Memory Management (Page Fault Calculations)</span>
            <span class="badge badge-high">High Priority</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:16px; margin:20px 0;">
            <div style="display:flex; gap:14px; align-items:flex-start;">
              <span style="width:28px; height:28px; border-radius:50%; background:var(--accent); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px;">1</span>
              <div>
                <strong>10-Minute Concept Revision</strong>
                <p style="font-size:13px; color:var(--text-muted);">Re-read high-yield notes on Effective Access Time and Page Replacement.</p>
              </div>
            </div>
            <div style="display:flex; gap:14px; align-items:flex-start;">
              <span style="width:28px; height:28px; border-radius:50%; background:var(--accent); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px;">2</span>
              <div>
                <strong>8 Flashcards Drill</strong>
                <p style="font-size:13px; color:var(--text-muted);">Targeted drill focusing on Belady's Anomaly and FIFO vs LRU differences.</p>
              </div>
            </div>
            <div style="display:flex; gap:14px; align-items:flex-start;">
              <span style="width:28px; height:28px; border-radius:50%; background:var(--accent); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px;">3</span>
              <div>
                <strong>5 Targeted Practice Questions</strong>
                <p style="font-size:13px; color:var(--text-muted);">Calculate EAT with 80% TLB hit ratio and 10ms fault latency.</p>
              </div>
            </div>
            <div style="display:flex; gap:14px; align-items:flex-start;">
              <span style="width:28px; height:28px; border-radius:50%; background:var(--accent); color:white; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px;">4</span>
              <div>
                <strong>Mini Quiz & Re-evaluation</strong>
                <p style="font-size:13px; color:var(--text-muted);">Validate mastery and automatically clear mistake priority.</p>
              </div>
            </div>
          </div>

          <button class="btn btn-primary btn-lg" style="width:100%;" onclick="StudyMateApp.navigateTo('flashcards')">Start Revision Now →</button>
        </div>
      </div>
    `;
  }

  function renderPlanner(container) {
    const plans = window.StudyMateDemo.planner;
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">AI Study Planner</h1>
          <p style="color:var(--text-muted); font-size:14px;">Adaptive timetable synced to your exam dates and weak areas.</p>
        </div>

        <div class="card">
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${plans.map(p => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:14px; border:1px solid var(--border-color); border-radius:var(--radius-sm); background:var(--bg-surface-alt);">
                <div>
                  <span class="badge badge-low" style="font-size:11px;">${p.day} • ${p.time}</span>
                  <div style="font-weight:700; font-size:15px; margin-top:4px;">${p.subject}: ${p.topic}</div>
                  <div style="font-size:12px; color:var(--text-muted);">${p.type}</div>
                </div>
                <button class="btn ${p.done ? 'btn-success' : 'btn-secondary'}" style="font-size:13px;" onclick="StudyMateApp.togglePlan('${p.id}')">
                  ${p.done ? '✓ Completed' : 'Mark Complete'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function togglePlan(id) {
    const item = window.StudyMateDemo.planner.find(p => p.id === id);
    if (item) {
      item.done = !item.done;
      showToast(item.done ? "Study task marked complete! Progress updated." : "Task marked pending.", "info");
      renderCurrentView();
    }
  }

  function renderAnswerGenerator(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">AI Exam Answer Generator</h1>
          <p style="color:var(--text-muted); font-size:14px;">Generate structured 10-mark and 16-mark answers tailored for university evaluators.</p>
        </div>

        <div class="card" style="margin-bottom:24px;">
          <div style="display:flex; gap:12px;">
            <input type="text" id="answer-query-input" class="chat-input" value="Explain CPU scheduling for 10 marks." />
            <button class="btn btn-primary" onclick="StudyMateApp.showToast('Generating full university-grade answer...', 'info')">Generate Answer</button>
          </div>
        </div>

        <div class="card" style="line-height:1.7;">
          <div class="card-header">
            <span class="card-title">Exam Answer Format (10 Marks)</span>
            <button class="btn btn-secondary" style="font-size:12px;" onclick="StudyMateApp.showToast('Mnemonic: 'C-P-U S-C-H-E-D' saved!', 'success')">🧠 Make Easier to Memorize</button>
          </div>

          <h3 style="color:var(--accent);">1. Definition</h3>
          <p>CPU Scheduling is the process by which the operating system decides which of the ready processes in the ready queue is allocated CPU time for execution.</p>

          <h3 style="color:var(--accent); margin-top:16px;">2. Scheduling Criteria</h3>
          <p>• <strong>CPU Utilization:</strong> Keep CPU as busy as possible (target 40%–90%).<br/>
             • <strong>Throughput:</strong> Number of processes completed per unit time.<br/>
             • <strong>Turnaround Time:</strong> Interval from process submission to completion.<br/>
             • <strong>Waiting Time:</strong> Sum of periods spent waiting in the ready queue.</p>

          <h3 style="color:var(--accent); margin-top:16px;">3. ASCII Architecture Diagram</h3>
          <div style="background:var(--bg-surface-alt); padding:12px; border-radius:6px; font-family:monospace;">
            [Ready Queue] ---> (Short-Term Scheduler) ---> [ CPU Core ]<br/>
                   ^                                             |<br/>
                   |------------- (Interrupt / Time Slice) ------|
          </div>

          <h3 style="color:var(--accent); margin-top:16px;">4. Types of Scheduling</h3>
          <p><strong>Non-Preemptive (FCFS, SJF):</strong> Process keeps CPU until it terminates or switches to waiting.<br/>
             <strong>Preemptive (Round Robin, SRTF):</strong> Process can be interrupted by scheduler when time quantum expires.</p>
        </div>
      </div>
    `;
  }

  function renderCodingAssistant(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">Student Coding Assistant</h1>
          <p style="color:var(--text-muted); font-size:14px;">Specialized assistant for C, C++, Java, and Python course assignments.</p>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-header">
              <span class="card-title">Code Editor</span>
              <select class="chat-input" style="padding:4px 8px; font-size:13px;">
                <option>Java</option>
                <option>C++</option>
                <option>C</option>
                <option>Python</option>
              </select>
            </div>
            <textarea class="chat-input" style="width:100%; height:300px; font-family:monospace; resize:none;">public class PageReplacement {
    public static void main(String[] args) {
        int[] pages = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3};
        // TODO: Implement FIFO replacement calculation
    }
}</textarea>
            <div style="display:flex; gap:8px; margin-top:14px;">
              <button class="btn btn-primary" onclick="StudyMateApp.showToast('Explaining code algorithms...', 'info')">Explain Code</button>
              <button class="btn btn-secondary" onclick="StudyMateApp.showToast('Checking boundary conditions...', 'info')">Debug Code</button>
              <button class="btn btn-secondary" onclick="StudyMateApp.showToast('Optimizing time complexity...', 'info')">Optimize</button>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <span class="card-title">AI Analysis & Output</span>
            </div>
            <div style="background:var(--bg-surface-alt); padding:16px; border-radius:8px; font-size:14px; line-height:1.6;">
              <strong>Algorithm Explanation:</strong><br/>
              The code sets up a standard memory reference string for page replacement simulation. To complete the FIFO simulation:<br/>
              1. Maintain a Queue or Circular Array representing page frames (e.g. 3 frames).<br/>
              2. For each page, if not present in frames -> Page Fault is incremented and oldest page is evicted.<br/>
              3. Expected result for 3 frames: <strong>12 Page Faults</strong>.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderImageSolver(container) {
    container.innerHTML = `
      <div class="content-view">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:26px; font-weight:800;">Image Question Solver</h1>
          <p style="color:var(--text-muted); font-size:14px;">Upload an image or diagram of a textbook question to get step-by-step solutions.</p>
        </div>

        <div class="card" style="text-align:center; padding:36px; margin-bottom:24px;">
          <div style="font-size:48px; margin-bottom:12px;">📷</div>
          <h3 style="font-size:18px; margin-bottom:8px;">Upload Question Image from Laptop or Camera</h3>
          <p style="color:var(--text-muted); font-size:14px; margin-bottom:16px;">Supports math formulas, circuit diagrams, and handwritten assignments.</p>
          <button class="btn btn-primary" onclick="StudyMateApp.showToast('Image OCR analyzed successfully!', 'success')">Choose Image File</button>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">Detected Question & Solution</span>
          </div>
          <div style="line-height:1.7;">
            <p><strong>Question Detected:</strong> "Given processes P1 (Burst 8ms), P2 (Burst 4ms), P3 (Burst 9ms) arriving at 0. Find Average Waiting Time using Shortest Job First."</p>
            <div style="margin-top:14px; background:var(--bg-surface-alt); padding:16px; border-radius:8px;">
              <strong>Step-by-Step Solution:</strong><br/>
              • Execution Order: P2 (4ms) -> P1 (8ms) -> P3 (9ms)<br/>
              • Waiting Time P2 = 0ms<br/>
              • Waiting Time P1 = 4ms<br/>
              • Waiting Time P3 = 12ms<br/>
              • <strong>Average Waiting Time = (0 + 4 + 12) / 3 = 5.33 ms</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderVoiceAssistant(container) {
    container.innerHTML = `
      <div class="content-view" style="text-align:center;">
        <h1 style="font-size:26px; font-weight:800; margin-bottom:8px;">Voice Study Assistant</h1>
        <p style="color:var(--text-muted); font-size:14px; margin-bottom:40px;">Speak your questions aloud for hands-free voice study revision.</p>

        <div style="width:120px; height:120px; border-radius:50%; background:linear-gradient(135deg, var(--accent), var(--accent-purple)); margin:0 auto 24px auto; display:flex; align-items:center; justify-content:center; font-size:48px; color:white; cursor:pointer; box-shadow:0 8px 24px rgba(79,70,229,0.4);" onclick="StudyMateApp.listenVoice()">
          🎙️
        </div>
        <p style="font-weight:600;" id="voice-status">Tap microphone to speak...</p>
      </div>
    `;
  }

  function listenVoice() {
    const el = document.getElementById('voice-status');
    if (el) el.textContent = "Listening... Speak your question now";
    setTimeout(() => {
      if (el) el.textContent = "Recognized: 'Explain paging in simple terms.'";
      showToast("Voice received! AI voice synthesis responding...", "success");
    }, 2000);
  }

  function renderSubjects(container) {
    const subjects = window.StudyMateDemo.subjects;
    container.innerHTML = `
      <div class="content-view">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <div>
            <h1 style="font-size:26px; font-weight:800;">Course Subjects (${subjects.length})</h1>
            <p style="color:var(--text-muted); font-size:14px;">Manage your university subjects, syllabus units, and exam milestones.</p>
          </div>
          <button class="btn btn-primary" onclick="StudyMateApp.showToast('Subject created!', 'success')">+ Add New Subject</button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
          ${subjects.map(s => `
            <div class="card">
              <div class="card-header">
                <span class="badge badge-low">${s.code}</span>
                <span class="badge badge-high">${s.examDays} Days Left</span>
              </div>
              <h2 style="font-size:19px; font-weight:700; margin-bottom:6px;">${s.name}</h2>
              <div style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">Faculty: ${s.professor} • ${s.units} Units</div>
              
              <div style="font-size:12px; font-weight:600; margin-bottom:4px; display:flex; justify-content:space-between;">
                <span>Syllabus Progress</span>
                <span>${s.progress}%</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width:${s.progress}%;"></div>
              </div>

              <div style="margin-top:14px; font-size:12px; color:var(--text-muted);">
                Weak areas: ${s.weakTopics.map(t => `<span class="badge badge-med" style="margin:2px;">${t}</span>`).join('')}
              </div>

              <div style="display:flex; gap:8px; margin-top:18px;">
                <button class="btn btn-secondary" style="font-size:12px; flex:1;" onclick="StudyMateApp.navigateTo('materials')">Materials</button>
                <button class="btn btn-primary" style="font-size:12px; flex:1;" onclick="StudyMateApp.navigateTo('exam-simulator')">Mock Exam</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderAnalytics(container) {
    container.innerHTML = `
      <div class="content-view">
        <h1 style="font-size:26px; font-weight:800; margin-bottom:8px;">Learning Analytics</h1>
        <p style="color:var(--text-muted); font-size:14px; margin-bottom:24px;">Deep insights into your question accuracy, time efficiency, and topic retention.</p>

        <div class="grid-4">
          <div class="card stat-card">
            <div class="stat-icon" style="background:#e0e7ff; color:#4338ca;">📈</div>
            <div>
              <div class="stat-value">76%</div>
              <div class="stat-label">Overall Accuracy</div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:#d1fae5; color:#059669;">⏱️</div>
            <div>
              <div class="stat-value">1.4m</div>
              <div class="stat-label">Avg Time / Question</div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:#ede9fe; color:#7c3aed;">🏆</div>
            <div>
              <div class="stat-value">4 Badges</div>
              <div class="stat-label">Achievements</div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon" style="background:#fee2e2; color:#ef4444;">🔴</div>
            <div>
              <div class="stat-value">3</div>
              <div class="stat-label">Active Weak Topics</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">Subject Mastery Matrix</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:600; margin-bottom:4px;">
                <span>Operating Systems</span>
                <span>78%</span>
              </div>
              <div class="progress-bar-container"><div class="progress-bar-fill" style="width:78%;"></div></div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:600; margin-bottom:4px;">
                <span>Applied Mathematics</span>
                <span>70%</span>
              </div>
              <div class="progress-bar-container"><div class="progress-bar-fill" style="width:70%;"></div></div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:600; margin-bottom:4px;">
                <span>Database Systems</span>
                <span>64%</span>
              </div>
              <div class="progress-bar-container"><div class="progress-bar-fill" style="width:64%;"></div></div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:600; margin-bottom:4px;">
                <span>Artificial Intelligence</span>
                <span>55%</span>
              </div>
              <div class="progress-bar-container"><div class="progress-bar-fill" style="width:55%;"></div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderProfile(container) {
    const user = window.StudyMateDemo.user;
    container.innerHTML = `
      <div class="content-view">
        <h1 style="font-size:26px; font-weight:800; margin-bottom:20px;">Student Profile & Achievements</h1>

        <div class="card" style="margin-bottom:24px;">
          <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
            <div style="width:72px; height:72px; border-radius:50%; background:linear-gradient(135deg, var(--accent), var(--accent-purple)); display:flex; align-items:center; justify-content:center; color:white; font-size:28px; font-weight:800;">
              ${user.name.charAt(0)}
            </div>
            <div>
              <h2 style="font-size:22px; font-weight:800;">${user.name}</h2>
              <div style="color:var(--text-muted); font-size:14px;">${user.college} • ${user.course} (${user.year})</div>
              <div style="display:flex; gap:8px; margin-top:8px;">
                <span class="badge badge-low">Level ${user.level} Scholar</span>
                <span class="badge badge-med">🔥 ${user.streakDays}-Day Streak</span>
                <span class="badge badge-high">${user.xp} Total XP</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">Unlocked Badges</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
            ${user.badges.map(b => `
              <div style="padding:16px; background:var(--bg-surface-alt); border-radius:var(--radius-sm); display:flex; align-items:center; gap:12px;">
                <span style="font-size:28px;">🏆</span>
                <div>
                  <strong>${b}</strong>
                  <div style="font-size:11px; color:var(--text-muted);">Unlocked</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderSettings(container) {
    container.innerHTML = `
      <div class="content-view">
        <h1 style="font-size:26px; font-weight:800; margin-bottom:24px;">Application Settings</h1>

        <div class="card" style="max-width:700px;">
          <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid var(--border-color);">
            <div>
              <strong>Appearance Theme</strong>
              <div style="font-size:13px; color:var(--text-muted);">Switch between modern Light and sleek Dark modes</div>
            </div>
            <button class="btn btn-secondary" onclick="StudyMateApp.toggleTheme()">Toggle Theme ☀️/🌙</button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid var(--border-color);">
            <div>
              <strong>Explanation Style</strong>
              <div style="font-size:13px; color:var(--text-muted);">Adjust the tone of AI generated answers</div>
            </div>
            <select class="chat-input" style="padding:6px 12px; font-size:13px;">
              <option>Exam-focused</option>
              <option>Simple & Intuitive</option>
              <option>Detailed & Academic</option>
              <option>Step-by-step</option>
            </select>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 0;">
            <div>
              <strong>Java Server Status</strong>
              <div style="font-size:13px; color:var(--text-muted);">Backend connection for file storage and AI endpoints</div>
            </div>
            <span class="badge badge-low">Connected (Port 8080)</span>
          </div>
        </div>
      </div>
    `;
  }

  function updateHeaderStats() {
    const data = window.StudyMateDemo;
    const streakEl = document.getElementById('header-streak-count');
    const xpEl = document.getElementById('header-xp-count');
    if (streakEl) streakEl.textContent = data.user.streakDays + " Days";
    if (xpEl) xpEl.textContent = data.user.xp + " XP";
  }

  function showToast(message, type) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'danger' ? '❌' : 'ℹ️'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  return {
    init: init,
    navigateTo: navigateTo,
    toggleTheme: toggleTheme,
    sendPrompt: sendPrompt,
    submitUserChat: submitUserChat,
    nextCard: nextCard,
    selectQuizOption: selectQuizOption,
    prevQuiz: prevQuiz,
    nextQuiz: nextQuiz,
    launchSimulator: launchSimulator,
    startRecovery: startRecovery,
    togglePlan: togglePlan,
    listenVoice: listenVoice,
    showToast: showToast
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  window.StudyMateApp.init();
});

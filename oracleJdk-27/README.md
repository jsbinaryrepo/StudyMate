# 🎓 StudyMate AI

> **"Study Smarter. Practice Better. Know When You're Ready."**

StudyMate AI is a complete, modern, academic SaaS platform built **100% in Java** for college and university students preparing for semester examinations.

---

## 🌟 Core Learning Loop

```text
Upload Study Material from Laptop
            ↓
    AI Understands It
            ↓
          Learn
            ↓
         Practice
            ↓
   ⭐ Take Mock Exam
            ↓
    Analyze Mistakes
            ↓
⭐ Mistake Memory Recovery
            ↓
         Re-test
            ↓
⭐ Track Exam Readiness (74%)
```

---

## 📁 Project Architecture (100% Java)

```text
studymate AI/
├── pom.xml                                    # Maven specification (Java 17, Spring Boot 3.2.3)
├── run-with-java.bat                          # One-click Windows launcher
├── index.html                                 # Direct browser launcher
├── src/
│   ├── main/
│   │   ├── java/com/studymate/
│   │   │   ├── StudyMateApplication.java      # Spring Boot Enterprise Application
│   │   │   ├── StudyMateServer.java           # Zero-Dependency Pure Java Server (java StudyMateServer.java)
│   │   │   ├── model/                         # Java Data Models
│   │   │   │   ├── Subject.java
│   │   │   │   ├── StudyMaterial.java
│   │   │   │   ├── QuizQuestion.java
│   │   │   │   ├── Flashcard.java
│   │   │   │   ├── Mistake.java
│   │   │   │   ├── ExamQuestion.java
│   │   │   │   ├── ExamSession.java
│   │   │   │   ├── ExamReadiness.java
│   │   │   │   ├── StudyPlanItem.java
│   │   │   │   └── UserProfile.java
│   │   │   ├── service/                       # Business Logic & AI Services
│   │   │   │   ├── FileStorageService.java    # Laptop file upload & text extraction
│   │   │   │   ├── AiService.java             # Q&A, summaries, priority classification
│   │   │   │   ├── MistakeMemoryService.java  # Mistake tracking & 5-step recovery
│   │   │   │   ├── ExamService.java           # Exam simulation, evaluation & readiness
│   │   │   │   └── DemoDataService.java       # Pre-populated demo data for Nivish
│   │   │   └── controller/                    # Spring Boot REST Controllers
│   │   │       ├── MaterialController.java    # Multipart file upload from laptop
│   │   │       ├── SubjectController.java
│   │   │       ├── AiController.java
│   │   │       ├── QuizController.java
│   │   │       ├── ExamController.java
│   │   │       ├── MistakeController.java
│   │   │       ├── StudyPlanController.java
│   │   │       └── UserProfileController.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/                        # Served directly by Java
│   │           ├── index.html                 # Complete SPA with all 25 screens
│   │           ├── css/
│   │           │   ├── style.css              # Modern academic SaaS design system (Light/Dark)
│   │           │   └── exam-mode.css          # Focused distraction-free Exam Simulator UI
│   │           └── js/
│   │               ├── app.js                 # Router, state, event bindings
│   │               ├── demo-data.js           # Comprehensive demo dataset for Nivish
│   │               ├── file-uploader.js       # Real laptop file upload & drag-and-drop
│   │               └── exam-simulator.js      # Timer, question grid, submission, evaluation
└── uploads/                                   # Folder where laptop uploads are saved
```

---

## 🚀 How to Run the Application

You have **3 flexible options**:

### Option 1: Double-click Windows Launcher
Simply double-click `run-with-java.bat` in this folder. It automatically detects Java and launches the app!

### Option 2: Run via Pure Java (Zero Dependencies)
If you have Java installed:
```cmd
java src/main/java/com/studymate/StudyMateServer.java
```
Then open your browser at:
`http://localhost:8080`

### Option 3: Run via Spring Boot Maven
```cmd
mvn spring-boot:run
```

### Option 4: Direct Browser Open (No Setup Required)
Double-click `index.html` or open `src/main/resources/static/index.html` in Chrome, Edge, or Firefox. Everything works seamlessly!

---

## 💻 Uploading Files from Your Laptop

1. Go to **Study Materials** in the sidebar.
2. Drag and drop any file (`.pdf`, `.docx`, `.pptx`, `.txt`, image) from your laptop or click **Select File from Laptop**.
3. Watch the real-time processing pipeline:
   - *Uploading from laptop... (0% → 100%)*
   - *Reading byte stream...*
   - *Analyzing document topics...*
   - *Extracting high-yield exam concepts...*
   - *Completed ✓*
4. Your file is saved into the `./uploads/` directory on your laptop and added to your study library!

---

## 🎓 College Presentation Demo Flow

1. **Landing Page**: Show hero, value propositions, and click **Try Demo**.
2. **Dashboard**: Highlight greeting (*"Good Morning, Nivish 👋"*), streak (7 days), upcoming exams countdown, and **Exam Readiness (74%)**.
3. **Materials Upload**: Upload a file from your laptop and demonstrate automated concept extraction.
4. **Ask My Notes**: Ask *"What is virtual memory?"* to show citation-grounded AI answers.
5. **Exam Priority AI**: Show the 🔴 HIGH / 🟡 MEDIUM / 🟢 LOW priority tags and study estimations.
6. **AI Flashcards**: Flip interactive 3D flashcards and demonstrate mastery tracking.
7. **Interactive Quiz**: Solve a question, test timer, and review instant score + XP reward.
8. **⭐ Flagship Exam Simulator**: Launch 60-mark, 90-minute strict exam mode with timer and question palette.
9. **Exam Evaluation**: Submit the exam to view the 42/60 breakdown with weak/strong area analysis.
10. **⭐ Mistake Memory**: Open recurring mistakes (*Numerical Problems - 5, Memory Management - 4*) and launch a 5-step personalized recovery session!

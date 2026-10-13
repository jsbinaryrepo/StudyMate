// Pre-populated Comprehensive Demo Dataset for Nivish
window.StudyMateDemo = {
  user: {
    name: "Nivish",
    email: "nivish.student@college.edu",
    college: "National Institute of Engineering",
    course: "Computer Science & Engineering",
    year: "3rd Year (Semester 5)",
    studyStyle: "Exam-focused",
    streakDays: 7,
    xp: 1420,
    level: 4,
    todayProgress: 72,
    badges: ["Quiz Master", "7-Day Streak", "100 Questions", "Revision Champion", "Exam Ready"]
  },
  readiness: {
    overall: 74,
    concept: 82,
    accuracy: 76,
    time: 68,
    revision: 71,
    disclaimer: "AI-generated learning indicator based on your practice data, not a guaranteed prediction of actual exam performance."
  },
  subjects: [
    { id: "sub_os", name: "Operating Systems", code: "CS501", professor: "Dr. Arvind Rao", units: 5, examDays: 6, progress: 78, weakTopics: ["Memory Management", "Process Scheduling"] },
    { id: "sub_dbms", name: "Database Management Systems", code: "CS502", professor: "Prof. Sunita Sharma", units: 5, examDays: 12, progress: 64, weakTopics: ["Normalization (BCNF)", "Two-Phase Locking"] },
    { id: "sub_ai", name: "Artificial Intelligence", code: "CS503", professor: "Dr. K. Ramanathan", units: 4, examDays: 18, progress: 55, weakTopics: ["Alpha-Beta Pruning", "Backpropagation"] },
    { id: "sub_ca", name: "Computer Architecture", code: "CS504", professor: "Prof. R. Mehta", units: 4, examDays: 24, progress: 45, weakTopics: ["Pipeline Hazards", "Cache Coherence"] },
    { id: "sub_math", name: "Applied Mathematics", code: "MA501", professor: "Dr. P. Deshmukh", units: 5, examDays: 30, progress: 70, weakTopics: ["Laplace Transforms", "Fourier Series"] }
  ],
  materials: [
    { id: "mat_1", subject: "Operating Systems", name: "OS_Unit_3_Virtual_Memory_Complete_Notes.pdf", type: "PDF", size: "4.2 MB", date: "2026-09-24", topics: ["Virtual Memory", "Paging & Segmentation", "TLB Translation", "Page Replacement"] },
    { id: "mat_2", subject: "Operating Systems", name: "OS_Unit_2_CPU_Scheduling_Handwritten.pdf", type: "PDF", size: "3.1 MB", date: "2026-09-22", topics: ["CPU Scheduling", "Gantt Charts", "Turnaround & Waiting Times"] },
    { id: "mat_3", subject: "Operating Systems", name: "Deadlock_Conditions_and_Bankers_Algorithm.docx", type: "DOCX", size: "1.8 MB", date: "2026-09-20", topics: ["Coffman Conditions", "Resource Allocation Graph", "Banker's Algorithm"] },
    { id: "mat_4", subject: "Database Management Systems", name: "DBMS_Normalization_1NF_to_BCNF_Guide.pdf", type: "PDF", size: "3.5 MB", date: "2026-09-21", topics: ["Functional Dependencies", "1NF & 2NF", "3NF vs BCNF"] },
    { id: "mat_5", subject: "Artificial Intelligence", name: "AI_Search_Strategies_and_Heuristics.pdf", type: "PDF", size: "2.9 MB", date: "2026-09-18", topics: ["A* Algorithm", "Admissible Heuristics", "Minimax"] }
  ],
  mistakes: [
    { id: "mstk_1", subject: "Operating Systems", topic: "Memory Management (Page Fault Calculations)", type: "Numerical Problems", occurrences: 5, last: "Yesterday", status: "Needs Review", priority: "HIGH" },
    { id: "mstk_2", subject: "Operating Systems", topic: "Virtual Memory (Paging vs Segmentation)", type: "Difference-between", occurrences: 4, last: "2 days ago", status: "In Progress", priority: "HIGH" },
    { id: "mstk_3", subject: "Database Management Systems", topic: "BCNF Decomposition Steps", type: "Theory", occurrences: 3, last: "3 days ago", status: "Needs Review", priority: "MEDIUM" },
    { id: "mstk_4", subject: "Computer Architecture", topic: "Pipeline Branch Penalty & Hazard Stalls", type: "Numerical Problems", occurrences: 4, last: "4 days ago", status: "Needs Review", priority: "HIGH" }
  ],
  flashcards: [
    { id: "fc_1", topic: "Virtual Memory", q: "What is a Page Fault in an operating system?", a: "A page fault occurs when a program attempts to access a page of memory mapped in virtual space, but the page is not loaded in physical RAM.", mastery: 85, known: true },
    { id: "fc_2", topic: "Deadlock", q: "State the four Coffman conditions required for deadlock.", a: "1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait.\nDeadlock occurs only if all 4 conditions hold simultaneously.", mastery: 90, known: true },
    { id: "fc_3", topic: "Memory Management", q: "What is Thrashing in virtual memory?", a: "Thrashing is a state where the CPU spends significantly more time swapping pages in and out of the disk paging file than actually executing instructions.", mastery: 45, known: false },
    { id: "fc_4", topic: "DBMS Normalization", q: "What is the critical difference between 3NF and BCNF?", a: "In 3NF, for X -> Y, either X is a superkey OR Y is a prime attribute. In BCNF, X MUST strictly be a superkey without exception.", mastery: 60, known: false }
  ],
  quiz: [
    {
      id: "qz_1",
      topic: "Memory Management",
      q: "Which page replacement algorithm suffers from Belady's Anomaly?",
      options: ["Optimal Page Replacement", "Least Recently Used (LRU)", "First-In-First-Out (FIFO)", "Least Frequently Used (LFU)"],
      correct: 2,
      explanation: "FIFO can result in more page faults when allocated more physical page frames, known as Belady's Anomaly."
    },
    {
      id: "qz_2",
      topic: "CPU Scheduling",
      q: "Which scheduling algorithm provides the theoretical minimum average waiting time?",
      options: ["Shortest Job First (SJF)", "First-Come First-Served (FCFS)", "Round Robin (RR)", "Priority Scheduling"],
      correct: 0,
      explanation: "SJF is provably optimal as it yields the lowest average waiting time for a given set of processes."
    },
    {
      id: "qz_3",
      topic: "Deadlock",
      q: "Which deadlock condition is eliminated by requiring processes to request all resources at once?",
      options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"],
      correct: 1,
      explanation: "Requiring all resources upfront ensures a process holding resources never waits for others, negating Hold and Wait."
    },
    {
      id: "qz_4",
      topic: "DBMS Normalization",
      q: "A relation R is in 2NF if and only if it is in 1NF and:",
      options: ["Every determinant is a candidate key", "No non-prime attribute is partially dependent on any candidate key", "No non-prime attribute is transitively dependent", "There are no multivalued dependencies"],
      correct: 1,
      explanation: "2NF requires full functional dependency of all non-prime attributes on the primary candidate key."
    }
  ],
  planner: [
    { id: "sp_1", day: "Monday", time: "6:00 – 6:45 PM", subject: "Operating Systems", topic: "Memory Management & Paging", type: "Concept Revision", done: true },
    { id: "sp_2", day: "Monday", time: "7:00 – 7:30 PM", subject: "Operating Systems", topic: "Deadlock Flashcards Drill", type: "Flashcards", done: true },
    { id: "sp_3", day: "Monday", time: "8:00 – 8:45 PM", subject: "Operating Systems", topic: "OS 10-Question Mini Quiz", type: "Quiz", done: false },
    { id: "sp_4", day: "Tuesday", time: "6:00 – 7:00 PM", subject: "DBMS", topic: "Normalization 2NF, 3NF & BCNF", type: "Concept Revision", done: false },
    { id: "sp_5", day: "Wednesday", time: "6:30 – 8:00 PM", subject: "Operating Systems", topic: "Simulated 60-Mark Midterm Exam", type: "Exam Simulator", done: false },
    { id: "sp_6", day: "Thursday", time: "7:00 – 7:45 PM", subject: "Artificial Intelligence", topic: "A* Search & Heuristic Formulation", type: "Practice", done: false },
    { id: "sp_7", day: "Friday", time: "6:00 – 7:00 PM", subject: "Computer Architecture", topic: "Pipeline Hazards & Cache Mapping", type: "Problem Solving", done: false }
  ]
};

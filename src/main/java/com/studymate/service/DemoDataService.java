package com.studymate.service;

import com.studymate.model.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DemoDataService {

    private final Map<String, Subject> subjects = new ConcurrentHashMap<>();
    private final Map<String, StudyMaterial> materials = new ConcurrentHashMap<>();
    private final Map<String, Flashcard> flashcards = new ConcurrentHashMap<>();
    private final Map<String, QuizQuestion> quizQuestions = new ConcurrentHashMap<>();
    private final Map<String, Mistake> mistakes = new ConcurrentHashMap<>();
    private final Map<String, StudyPlanItem> studyPlans = new ConcurrentHashMap<>();
    private UserProfile userProfile;
    private ExamReadiness examReadiness;

    public DemoDataService() {
        initData();
    }

    private void initData() {
        // 1. User Profile for Nivish
        List<String> badges = Arrays.asList("Quiz Master", "7-Day Streak", "100 Questions", "Revision Champion", "Exam Ready");
        userProfile = new UserProfile(
                "usr_nivish",
                "Nivish",
                "nivish.student@college.edu",
                "National Institute of Engineering",
                "Computer Science & Engineering",
                "3rd Year (Semester 5)",
                "Exam-focused",
                7,      // 7-day streak
                1420,   // XP
                4,      // Level 4
                badges,
                72      // 72% today's progress
        );

        // 2. Exam Readiness
        examReadiness = new ExamReadiness(74, 82, 76, 68, 71);

        // 3. Subjects
        Subject os = new Subject("sub_os", "Operating Systems", "CS501", "Dr. Arvind Rao", 5, "2026-10-04 (6 days left)", 78, Arrays.asList("Memory Management", "Process Scheduling"));
        Subject dbms = new Subject("sub_dbms", "Database Management Systems", "CS502", "Prof. Sunita Sharma", 5, "2026-10-10 (12 days left)", 64, Arrays.asList("Normalization (BCNF)", "Concurrency Control"));
        Subject ai = new Subject("sub_ai", "Artificial Intelligence", "CS503", "Dr. K. Ramanathan", 4, "2026-10-16 (18 days left)", 55, Arrays.asList("Alpha-Beta Pruning", "Backpropagation"));
        Subject ca = new Subject("sub_ca", "Computer Architecture", "CS504", "Prof. R. Mehta", 4, "2026-10-22 (24 days left)", 45, Arrays.asList("Pipeline Hazards", "Cache Mapping"));
        Subject math = new Subject("sub_math", "Applied Mathematics", "MA501", "Dr. P. Deshmukh", 5, "2026-10-28 (30 days left)", 70, Arrays.asList("Laplace Transforms", "Probability Distributions"));

        subjects.put(os.getId(), os);
        subjects.put(dbms.getId(), dbms);
        subjects.put(ai.getId(), ai);
        subjects.put(ca.getId(), ca);
        subjects.put(math.getId(), math);

        // 4. Study Materials (24 demo materials)
        addMaterial("mat_os_1", "sub_os", "Operating Systems", "OS_Unit_3_Virtual_Memory_Complete_Notes.pdf", "PDF", 4200000, 
                "Virtual Memory combines hardware RAM with disk paging files. Virtual addresses are translated to physical addresses via MMU. " +
                "Page tables hold PTEs with present/valid bits. TLB acts as a high-speed hardware cache. Demand paging only fetches pages upon page fault.",
                Arrays.asList("Virtual Memory", "Paging & Segmentation", "TLB Translation", "Page Replacement (FIFO, LRU)"));
        addMaterial("mat_os_2", "sub_os", "Operating Systems", "OS_Unit_2_CPU_Scheduling_Handwritten.pdf", "PDF", 3100000,
                "CPU Scheduling determines which process executes when CPU is free. Preemptive vs Non-Preemptive. " +
                "Criteria: CPU Utilization, Throughput, Turnaround Time, Waiting Time, Response Time. Algorithms: FCFS, SJF, Priority, Round Robin with time quantum.",
                Arrays.asList("CPU Scheduling", "Gantt Charts", "Turnaround & Waiting Times", "Convoy Effect"));
        addMaterial("mat_os_3", "sub_os", "Operating Systems", "Deadlock_Conditions_and_Bankers_Algorithm.docx", "DOCX", 1800000,
                "Deadlock is a state where processes wait indefinitely. 4 Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. " +
                "Banker's Algorithm: Resource-allocation state algorithm for deadlock avoidance using Available, Max, Allocation, Need matrices.",
                Arrays.asList("Deadlock Conditions", "Resource Allocation Graph", "Banker's Algorithm", "Safe State"));
        addMaterial("mat_dbms_1", "sub_dbms", "Database Management Systems", "DBMS_Normalization_1NF_to_BCNF_Guide.pdf", "PDF", 3500000,
                "Normalization minimizes redundancy and avoids update, insertion, and deletion anomalies. " +
                "1NF: Atomic attributes. 2NF: 1NF + no partial functional dependencies on candidate key. " +
                "3NF: 2NF + no transitive dependencies (for X->Y, X is superkey or Y is prime). BCNF: for every X->Y, X must be superkey.",
                Arrays.asList("Functional Dependencies", "1NF & 2NF", "3NF vs BCNF", "Decomposition"));
        addMaterial("mat_ai_1", "sub_ai", "Artificial Intelligence", "AI_Search_Strategies_and_Heuristics.pdf", "PDF", 2900000,
                "Uninformed vs Informed Search. A* Search uses evaluation function f(n) = g(n) + h(n). " +
                "Admissibility condition: h(n) <= h*(n) never overestimates cost. Consistency condition: triangle inequality.",
                Arrays.asList("Uninformed Search", "A* Algorithm", "Admissible Heuristics", "Game Playing Minimax"));

        // 5. Flashcards
        addFlashcard("fc_1", "sub_os", "Virtual Memory", "What causes a Page Fault in an operating system?", 
                "A page fault occurs when a program attempts to access a page of memory mapped into its virtual address space, but the page is not currently loaded in physical RAM.", 85, true);
        addFlashcard("fc_2", "sub_os", "Deadlock", "State the four Coffman conditions required for deadlock.", 
                "1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait. Deadlock can occur only if all 4 hold simultaneously.", 90, true);
        addFlashcard("fc_3", "sub_os", "Memory Management", "What is Thrashing in virtual memory?", 
                "Thrashing is a state where the CPU spends significantly more time swapping pages in and out of backing store than actually executing user instructions.", 45, false);
        addFlashcard("fc_4", "sub_dbms", "Normalization", "What is the key difference between 3NF and BCNF?", 
                "In 3NF, for any X -> Y, either X is a superkey OR Y is a prime attribute. In BCNF, X MUST strictly be a superkey without exceptions.", 60, false);
        addFlashcard("fc_5", "sub_ai", "Neural Networks", "Why is the ReLU activation function preferred over Sigmoid in deep networks?", 
                "ReLU avoids the vanishing gradient problem for positive inputs (derivative is 1) and computes much faster than exponential Sigmoid functions.", 75, true);

        // 6. Mistakes Memory (Recurring Mistakes)
        mistakes.put("mstk_1", new Mistake("mstk_1", "sub_os", "Operating Systems", "Memory Management (Page Fault Calculations)", "Numerical Problems", "Calculation Error", 5, "Yesterday", "Needs Review", "HIGH"));
        mistakes.put("mstk_2", new Mistake("mstk_2", "sub_os", "Operating Systems", "Virtual Memory (Paging vs Segmentation)", "Difference-between", "Conceptual Gap", 4, "2 days ago", "In Progress", "HIGH"));
        mistakes.put("mstk_3", new Mistake("mstk_3", "sub_dbms", "Database Management Systems", "BCNF Decomposition Steps", "Theory", "Algorithmic Precision", 3, "3 days ago", "Needs Review", "MEDIUM"));
        mistakes.put("mstk_4", new Mistake("mstk_4", "sub_ca", "Computer Architecture", "Pipeline Branch Penalty & Hazard Stalls", "Numerical Problems", "Formula Confusion", 4, "4 days ago", "Needs Review", "HIGH"));

        // 7. Study Planner
        studyPlans.put("sp_1", new StudyPlanItem("sp_1", "Monday", "6:00 – 6:45 PM", "Operating Systems", "Memory Management & Paging", "Concept Revision", true));
        studyPlans.put("sp_2", new StudyPlanItem("sp_2", "Monday", "7:00 – 7:30 PM", "Operating Systems", "Deadlock Flashcards Drill", "Flashcards", true));
        studyPlans.put("sp_3", new StudyPlanItem("sp_3", "Monday", "8:00 – 8:45 PM", "Operating Systems", "OS 10-Question Mini Quiz", "Quiz", false));
        studyPlans.put("sp_4", new StudyPlanItem("sp_4", "Tuesday", "6:00 – 7:00 PM", "DBMS", "Normalization 2NF, 3NF & BCNF", "Concept Revision", false));
        studyPlans.put("sp_5", new StudyPlanItem("sp_5", "Wednesday", "6:30 – 8:00 PM", "Operating Systems", "Simulated 60-Mark Midterm Exam", "Exam Simulator", false));
        studyPlans.put("sp_6", new StudyPlanItem("sp_6", "Thursday", "7:00 – 7:45 PM", "Artificial Intelligence", "A* Search & Heuristic Formulation", "Practice", false));
        studyPlans.put("sp_7", new StudyPlanItem("sp_7", "Friday", "6:00 – 7:00 PM", "Computer Architecture", "Pipeline Hazards & Cache Mapping", "Problem Solving", false));

        // 8. Quiz Questions
        initQuizQuestions();
    }

    private void addMaterial(String id, String subId, String subName, String name, String type, long size, String text, List<String> topics) {
        StudyMaterial m = new StudyMaterial(id, subId, subName, name, type, size, "./uploads/" + name, text, "2026-09-24 10:15", topics, Arrays.asList("Core Principles", "Exam Relevance", "Practical Implementation"));
        m.setSummary("Complete summary covering definitions, mathematical calculations, and exam-focused revision points for " + name);
        materials.put(id, m);
    }

    private void addFlashcard(String id, String subId, String topic, String q, String a, int mastery, boolean known) {
        flashcards.put(id, new Flashcard(id, subId, topic, q, a, mastery, known));
    }

    private void initQuizQuestions() {
        quizQuestions.put("q_1", new QuizQuestion("q_1", "sub_os", "Memory Management", 
                "Which page replacement algorithm suffers from Belady's Anomaly?",
                Arrays.asList("Optimal Page Replacement", "Least Recently Used (LRU)", "First-In-First-Out (FIFO)", "Least Frequently Used (LFU)"),
                2, "FIFO can result in more page faults when allocated more physical page frames, known as Belady's Anomaly.", "Medium"));
        quizQuestions.put("q_2", new QuizQuestion("q_2", "sub_os", "CPU Scheduling", 
                "Which scheduling algorithm provides the theoretical minimum average waiting time for a set of processes?",
                Arrays.asList("Shortest Job First (SJF)", "First-Come First-Served (FCFS)", "Round Robin (RR)", "Multilevel Feedback Queue"),
                0, "SJF is provably optimal as it yields the lowest average waiting time for a given set of processes.", "Easy"));
        quizQuestions.put("q_3", new QuizQuestion("q_3", "sub_os", "Deadlock", 
                "Which condition is prevented if a protocol requires processes to request all resources at once before execution?",
                Arrays.asList("Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"),
                1, "Requiring all resources upfront guarantees that a process holding resources is never waiting for another, negating Hold and Wait.", "Medium"));
        quizQuestions.put("q_4", new QuizQuestion("q_4", "sub_dbms", "Normalization", 
                "A relation R is in 2NF if and only if it is in 1NF and:",
                Arrays.asList("Every determinant is a candidate key", "No non-prime attribute is transitively dependent on any key", "No non-prime attribute is partially dependent on any candidate key", "There are no multi-valued dependencies"),
                2, "2NF requires that all non-prime attributes must be fully functionally dependent on the primary/candidate key.", "Medium"));
    }

    public Map<String, Subject> getSubjects() { return subjects; }
    public Map<String, StudyMaterial> getMaterials() { return materials; }
    public Map<String, Flashcard> getFlashcards() { return flashcards; }
    public Map<String, QuizQuestion> getQuizQuestions() { return quizQuestions; }
    public Map<String, Mistake> getMistakes() { return mistakes; }
    public Map<String, StudyPlanItem> getStudyPlans() { return studyPlans; }
    public UserProfile getUserProfile() { return userProfile; }
    public ExamReadiness getExamReadiness() { return examReadiness; }
}

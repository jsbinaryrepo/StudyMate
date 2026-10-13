package com.studymate.model;

public class ExamReadiness {
    private int overallReadinessScore; // e.g. 74%
    private int conceptUnderstanding;  // 82%
    private int questionAccuracy;      // 76%
    private int timeManagement;        // 68%
    private int revisionCoverage;      // 71%
    private String disclaimer;

    public ExamReadiness() {
        this.disclaimer = "AI-generated learning indicator based on your practice data, not a guaranteed prediction of actual exam performance.";
    }

    public ExamReadiness(int overallReadinessScore, int conceptUnderstanding, int questionAccuracy, int timeManagement, int revisionCoverage) {
        this.overallReadinessScore = overallReadinessScore;
        this.conceptUnderstanding = conceptUnderstanding;
        this.questionAccuracy = questionAccuracy;
        this.timeManagement = timeManagement;
        this.revisionCoverage = revisionCoverage;
        this.disclaimer = "AI-generated learning indicator based on your practice data, not a guaranteed prediction of actual exam performance.";
    }

    public int getOverallReadinessScore() { return overallReadinessScore; }
    public void setOverallReadinessScore(int overallReadinessScore) { this.overallReadinessScore = overallReadinessScore; }

    public int getConceptUnderstanding() { return conceptUnderstanding; }
    public void setConceptUnderstanding(int conceptUnderstanding) { this.conceptUnderstanding = conceptUnderstanding; }

    public int getQuestionAccuracy() { return questionAccuracy; }
    public void setQuestionAccuracy(int questionAccuracy) { this.questionAccuracy = questionAccuracy; }

    public int getTimeManagement() { return timeManagement; }
    public void setTimeManagement(int timeManagement) { this.timeManagement = timeManagement; }

    public int getRevisionCoverage() { return revisionCoverage; }
    public void setRevisionCoverage(int revisionCoverage) { this.revisionCoverage = revisionCoverage; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
}

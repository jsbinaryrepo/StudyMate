package com.studymate.model;

import java.util.ArrayList;
import java.util.List;

public class ExamSession {
    private String id;
    private String subjectId;
    private String subjectName;
    private int totalMarks;
    private int durationMinutes;
    private int timeRemainingSeconds;
    private String difficulty;
    private List<ExamQuestion> questions;
    private boolean submitted;
    private int totalScore;
    private int accuracyPercent;
    private int timeEfficiencyPercent;
    private List<String> strongAreas;
    private List<String> weakAreas;
    private String date;

    public ExamSession() {
        this.questions = new ArrayList<>();
        this.strongAreas = new ArrayList<>();
        this.weakAreas = new ArrayList<>();
    }

    public ExamSession(String id, String subjectId, String subjectName, int totalMarks, int durationMinutes, String difficulty) {
        this.id = id;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.totalMarks = totalMarks;
        this.durationMinutes = durationMinutes;
        this.timeRemainingSeconds = durationMinutes * 60;
        this.difficulty = difficulty;
        this.questions = new ArrayList<>();
        this.strongAreas = new ArrayList<>();
        this.weakAreas = new ArrayList<>();
        this.submitted = false;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public int getTotalMarks() { return totalMarks; }
    public void setTotalMarks(int totalMarks) { this.totalMarks = totalMarks; }

    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }

    public int getTimeRemainingSeconds() { return timeRemainingSeconds; }
    public void setTimeRemainingSeconds(int timeRemainingSeconds) { this.timeRemainingSeconds = timeRemainingSeconds; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public List<ExamQuestion> getQuestions() { return questions; }
    public void setQuestions(List<ExamQuestion> questions) { this.questions = questions; }

    public boolean isSubmitted() { return submitted; }
    public void setSubmitted(boolean submitted) { this.submitted = submitted; }

    public int getTotalScore() { return totalScore; }
    public void setTotalScore(int totalScore) { this.totalScore = totalScore; }

    public int getAccuracyPercent() { return accuracyPercent; }
    public void setAccuracyPercent(int accuracyPercent) { this.accuracyPercent = accuracyPercent; }

    public int getTimeEfficiencyPercent() { return timeEfficiencyPercent; }
    public void setTimeEfficiencyPercent(int timeEfficiencyPercent) { this.timeEfficiencyPercent = timeEfficiencyPercent; }

    public List<String> getStrongAreas() { return strongAreas; }
    public void setStrongAreas(List<String> strongAreas) { this.strongAreas = strongAreas; }

    public List<String> getWeakAreas() { return weakAreas; }
    public void setWeakAreas(List<String> weakAreas) { this.weakAreas = weakAreas; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}

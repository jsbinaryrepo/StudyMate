package com.studymate.model;

public class Mistake {
    private String id;
    private String subjectId;
    private String subjectName;
    private String topic;
    private String questionType; // Numerical Problems, Difference-between, Theory, Conceptual
    private String category;
    private int occurrences;
    private String lastOccurrence;
    private String improvementStatus; // "Needs Review", "In Progress", "Mastered"
    private String priority; // HIGH, MEDIUM, LOW

    public Mistake() {}

    public Mistake(String id, String subjectId, String subjectName, String topic, String questionType, String category, int occurrences, String lastOccurrence, String improvementStatus, String priority) {
        this.id = id;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.topic = topic;
        this.questionType = questionType;
        this.category = category;
        this.occurrences = occurrences;
        this.lastOccurrence = lastOccurrence;
        this.improvementStatus = improvementStatus;
        this.priority = priority;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getQuestionType() { return questionType; }
    public void setQuestionType(String questionType) { this.questionType = questionType; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getOccurrences() { return occurrences; }
    public void setOccurrences(int occurrences) { this.occurrences = occurrences; }

    public String getLastOccurrence() { return lastOccurrence; }
    public void setLastOccurrence(String lastOccurrence) { this.lastOccurrence = lastOccurrence; }

    public String getImprovementStatus() { return improvementStatus; }
    public void setImprovementStatus(String improvementStatus) { this.improvementStatus = improvementStatus; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}

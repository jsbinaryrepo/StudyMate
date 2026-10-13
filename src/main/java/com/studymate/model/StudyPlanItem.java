package com.studymate.model;

public class StudyPlanItem {
    private String id;
    private String day; // Monday, Tuesday, etc.
    private String timeSlot; // 6:00–6:45 PM
    private String subject; // Operating Systems
    private String topic; // Memory Management
    private String type; // Lecture, Flashcards, Quiz, Revision
    private boolean completed;

    public StudyPlanItem() {}

    public StudyPlanItem(String id, String day, String timeSlot, String subject, String topic, String type, boolean completed) {
        this.id = id;
        this.day = day;
        this.timeSlot = timeSlot;
        this.subject = subject;
        this.topic = topic;
        this.type = type;
        this.completed = completed;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}

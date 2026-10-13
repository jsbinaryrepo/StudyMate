package com.studymate.model;

public class Flashcard {
    private String id;
    private String subjectId;
    private String topic;
    private String question;
    private String answer;
    private int mastery; // 0 to 100
    private boolean known;

    public Flashcard() {}

    public Flashcard(String id, String subjectId, String topic, String question, String answer, int mastery, boolean known) {
        this.id = id;
        this.subjectId = subjectId;
        this.topic = topic;
        this.question = question;
        this.answer = answer;
        this.mastery = mastery;
        this.known = known;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public int getMastery() { return mastery; }
    public void setMastery(int mastery) { this.mastery = mastery; }

    public boolean isKnown() { return known; }
    public void setKnown(boolean known) { this.known = known; }
}

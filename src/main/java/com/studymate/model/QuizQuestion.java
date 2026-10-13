package com.studymate.model;

import java.util.List;

public class QuizQuestion {
    private String id;
    private String subjectId;
    private String topic;
    private String question;
    private List<String> options;
    private int correctOptionIndex;
    private String explanation;
    private String difficulty; // Easy, Medium, Hard
    private int userSelectedIndex = -1;
    private boolean markedForReview = false;

    public QuizQuestion() {}

    public QuizQuestion(String id, String subjectId, String topic, String question, List<String> options, int correctOptionIndex, String explanation, String difficulty) {
        this.id = id;
        this.subjectId = subjectId;
        this.topic = topic;
        this.question = question;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.explanation = explanation;
        this.difficulty = difficulty;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public int getCorrectOptionIndex() { return correctOptionIndex; }
    public void setCorrectOptionIndex(int correctOptionIndex) { this.correctOptionIndex = correctOptionIndex; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getUserSelectedIndex() { return userSelectedIndex; }
    public void setUserSelectedIndex(int userSelectedIndex) { this.userSelectedIndex = userSelectedIndex; }

    public boolean isMarkedForReview() { return markedForReview; }
    public void setMarkedForReview(boolean markedForReview) { this.markedForReview = markedForReview; }
}

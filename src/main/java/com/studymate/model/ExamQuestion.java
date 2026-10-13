package com.studymate.model;

import java.util.List;

public class ExamQuestion {
    private int questionNumber;
    private String text;
    private int marks;
    private String topic;
    private List<String> options; // Optional if MCQ, empty if descriptive
    private String sampleAnswer;
    private String studentAnswer;
    private boolean markedForReview;
    private boolean answered;
    private int scoreAwarded;
    private String evaluationFeedback;

    public ExamQuestion() {}

    public ExamQuestion(int questionNumber, String text, int marks, String topic, List<String> options, String sampleAnswer) {
        this.questionNumber = questionNumber;
        this.text = text;
        this.marks = marks;
        this.topic = topic;
        this.options = options;
        this.sampleAnswer = sampleAnswer;
        this.studentAnswer = "";
        this.markedForReview = false;
        this.answered = false;
        this.scoreAwarded = 0;
    }

    public int getQuestionNumber() { return questionNumber; }
    public void setQuestionNumber(int questionNumber) { this.questionNumber = questionNumber; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public int getMarks() { return marks; }
    public void setMarks(int marks) { this.marks = marks; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public String getSampleAnswer() { return sampleAnswer; }
    public void setSampleAnswer(String sampleAnswer) { this.sampleAnswer = sampleAnswer; }

    public String getStudentAnswer() { return studentAnswer; }
    public void setStudentAnswer(String studentAnswer) { 
        this.studentAnswer = studentAnswer; 
        this.answered = studentAnswer != null && !studentAnswer.trim().isEmpty();
    }

    public boolean isMarkedForReview() { return markedForReview; }
    public void setMarkedForReview(boolean markedForReview) { this.markedForReview = markedForReview; }

    public boolean isAnswered() { return answered; }
    public void setAnswered(boolean answered) { this.answered = answered; }

    public int getScoreAwarded() { return scoreAwarded; }
    public void setScoreAwarded(int scoreAwarded) { this.scoreAwarded = scoreAwarded; }

    public String getEvaluationFeedback() { return evaluationFeedback; }
    public void setEvaluationFeedback(String evaluationFeedback) { this.evaluationFeedback = evaluationFeedback; }
}

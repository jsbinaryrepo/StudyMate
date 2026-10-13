package com.studymate.model;

import java.util.ArrayList;
import java.util.List;

public class Subject {
    private String id;
    private String name;
    private String code;
    private String professor;
    private int units;
    private String examDate;
    private int progress;
    private List<String> weakTopics;

    public Subject() {
        this.weakTopics = new ArrayList<>();
    }

    public Subject(String id, String name, String code, String professor, int units, String examDate, int progress, List<String> weakTopics) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.professor = professor;
        this.units = units;
        this.examDate = examDate;
        this.progress = progress;
        this.weakTopics = weakTopics != null ? weakTopics : new ArrayList<>();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getProfessor() { return professor; }
    public void setProfessor(String professor) { this.professor = professor; }

    public int getUnits() { return units; }
    public void setUnits(int units) { this.units = units; }

    public String getExamDate() { return examDate; }
    public void setExamDate(String examDate) { this.examDate = examDate; }

    public int getProgress() { return progress; }
    public void setProgress(int progress) { this.progress = progress; }

    public List<String> getWeakTopics() { return weakTopics; }
    public void setWeakTopics(List<String> weakTopics) { this.weakTopics = weakTopics; }
}

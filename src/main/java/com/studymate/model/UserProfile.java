package com.studymate.model;

import java.util.ArrayList;
import java.util.List;

public class UserProfile {
    private String id;
    private String name;
    private String email;
    private String college;
    private String course;
    private String year;
    private String studyStyle; // Simple, Detailed, Exam-focused, Step-by-step
    private int streakDays;
    private int xp;
    private int level;
    private List<String> badges;
    private int todayProgressPercent;

    public UserProfile() {
        this.badges = new ArrayList<>();
    }

    public UserProfile(String id, String name, String email, String college, String course, String year, String studyStyle, int streakDays, int xp, int level, List<String> badges, int todayProgressPercent) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.college = college;
        this.course = course;
        this.year = year;
        this.studyStyle = studyStyle;
        this.streakDays = streakDays;
        this.xp = xp;
        this.level = level;
        this.badges = badges != null ? badges : new ArrayList<>();
        this.todayProgressPercent = todayProgressPercent;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getStudyStyle() { return studyStyle; }
    public void setStudyStyle(String studyStyle) { this.studyStyle = studyStyle; }

    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public List<String> getBadges() { return badges; }
    public void setBadges(List<String> badges) { this.badges = badges; }

    public int getTodayProgressPercent() { return todayProgressPercent; }
    public void setTodayProgressPercent(int todayProgressPercent) { this.todayProgressPercent = todayProgressPercent; }
}

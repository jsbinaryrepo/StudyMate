package com.studymate.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class StudyMaterial {
    private String id;
    private String subjectId;
    private String subjectName;
    private String name;
    private String type; // PDF, DOCX, PPTX, TXT, IMAGE
    private long sizeBytes;
    private String storedPath;
    private String contentText;
    private String uploadDate;
    private List<String> extractedTopics;
    private List<String> keyConcepts;
    private String summary;

    public StudyMaterial() {
        this.extractedTopics = new ArrayList<>();
        this.keyConcepts = new ArrayList<>();
    }

    public StudyMaterial(String id, String subjectId, String subjectName, String name, String type, long sizeBytes, String storedPath, String contentText, String uploadDate, List<String> extractedTopics, List<String> keyConcepts) {
        this.id = id;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.name = name;
        this.type = type;
        this.sizeBytes = sizeBytes;
        this.storedPath = storedPath;
        this.contentText = contentText;
        this.uploadDate = uploadDate;
        this.extractedTopics = extractedTopics != null ? extractedTopics : new ArrayList<>();
        this.keyConcepts = keyConcepts != null ? keyConcepts : new ArrayList<>();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public long getSizeBytes() { return sizeBytes; }
    public void setSizeBytes(long sizeBytes) { this.sizeBytes = sizeBytes; }

    public String getStoredPath() { return storedPath; }
    public void setStoredPath(String storedPath) { this.storedPath = storedPath; }

    public String getContentText() { return contentText; }
    public void setContentText(String contentText) { this.contentText = contentText; }

    public String getUploadDate() { return uploadDate; }
    public void setUploadDate(String uploadDate) { this.uploadDate = uploadDate; }

    public List<String> getExtractedTopics() { return extractedTopics; }
    public void setExtractedTopics(List<String> extractedTopics) { this.extractedTopics = extractedTopics; }

    public List<String> getKeyConcepts() { return keyConcepts; }
    public void setKeyConcepts(List<String> keyConcepts) { this.keyConcepts = keyConcepts; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
}

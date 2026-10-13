package com.studymate.controller;

import com.studymate.model.ExamReadiness;
import com.studymate.model.ExamSession;
import com.studymate.service.ExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "*")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping("/create")
    public ResponseEntity<ExamSession> createExam(@RequestBody(required = false) Map<String, Object> req) {
        String subjectId = "sub_os";
        int totalMarks = 60;
        int durationMinutes = 90;
        String difficulty = "Medium (Semester Level)";

        if (req != null) {
            if (req.containsKey("subjectId")) subjectId = (String) req.get("subjectId");
            if (req.containsKey("totalMarks")) totalMarks = Integer.parseInt(req.get("totalMarks").toString());
            if (req.containsKey("durationMinutes")) durationMinutes = Integer.parseInt(req.get("durationMinutes").toString());
            if (req.containsKey("difficulty")) difficulty = (String) req.get("difficulty");
        }

        ExamSession session = examService.createExamSession(subjectId, totalMarks, durationMinutes, difficulty);
        return ResponseEntity.ok(session);
    }

    @PostMapping("/submit")
    public ResponseEntity<ExamSession> submitExam(@RequestBody ExamSession session) {
        ExamSession evaluated = examService.evaluateExam(session);
        return ResponseEntity.ok(evaluated);
    }

    @GetMapping("/readiness")
    public ResponseEntity<ExamReadiness> getReadiness() {
        return ResponseEntity.ok(examService.getReadiness());
    }
}

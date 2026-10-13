package com.studymate.controller;

import com.studymate.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/ask-notes")
    public ResponseEntity<?> askNotes(@RequestBody Map<String, String> request) {
        String subjectId = request.getOrDefault("subjectId", "sub_os");
        String question = request.getOrDefault("question", "What is virtual memory?");
        String mode = request.getOrDefault("mode", "Academic Mode");
        return ResponseEntity.ok(aiService.askNotes(subjectId, question, mode));
    }

    @PostMapping("/summary")
    public ResponseEntity<?> generateSummary(@RequestBody Map<String, String> request) {
        String materialId = request.getOrDefault("materialId", "mat_os_1");
        String summaryType = request.getOrDefault("summaryType", "Standard Summary");
        return ResponseEntity.ok(aiService.generateSummary(materialId, summaryType));
    }

    @GetMapping("/priority")
    public ResponseEntity<?> getPriority(@RequestParam(value = "subjectId", required = false, defaultValue = "sub_os") String subjectId) {
        return ResponseEntity.ok(aiService.getExamPriority(subjectId));
    }

    @PostMapping("/exam-answer")
    public ResponseEntity<?> generateExamAnswer(@RequestBody Map<String, String> request) {
        String question = request.getOrDefault("question", "Explain CPU scheduling for 10 marks.");
        String length = request.getOrDefault("length", "Detailed");
        String style = request.getOrDefault("style", "Exam-ready");
        return ResponseEntity.ok(aiService.generateExamAnswer(question, length, style));
    }

    @PostMapping("/image-solver")
    public ResponseEntity<?> solveImageQuestion(@RequestBody Map<String, String> request) {
        String category = request.getOrDefault("category", "Mathematics & Theory");
        String query = request.getOrDefault("query", "Solve problem");
        return ResponseEntity.ok(aiService.solveImageQuestion(category, query));
    }

    @PostMapping("/coding-assistant")
    public ResponseEntity<?> codingAssistant(@RequestBody Map<String, String> request) {
        String code = request.getOrDefault("code", "// Java code snippet");
        String language = request.getOrDefault("language", "Java");
        String action = request.getOrDefault("action", "Explain Code");
        return ResponseEntity.ok(aiService.codingAssistant(code, language, action));
    }
}

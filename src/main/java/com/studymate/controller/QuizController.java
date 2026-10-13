package com.studymate.controller;

import com.studymate.model.QuizQuestion;
import com.studymate.service.DemoDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    private final DemoDataService demoDataService;

    public QuizController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping("/questions")
    public ResponseEntity<Collection<QuizQuestion>> getQuestions() {
        return ResponseEntity.ok(demoDataService.getQuizQuestions().values());
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitQuiz(@RequestBody List<QuizQuestion> answers) {
        int correct = 0;
        List<String> weakTopics = new ArrayList<>();

        for (QuizQuestion q : answers) {
            QuizQuestion original = demoDataService.getQuizQuestions().get(q.getId());
            if (original != null) {
                if (q.getUserSelectedIndex() == original.getCorrectOptionIndex()) {
                    correct++;
                } else {
                    if (!weakTopics.contains(original.getTopic())) {
                        weakTopics.add(original.getTopic());
                    }
                }
            }
        }

        int total = answers.isEmpty() ? 1 : answers.size();
        int accuracy = (int) Math.round(((double) correct / total) * 100);

        // Award XP
        demoDataService.getUserProfile().setXp(demoDataService.getUserProfile().getXp() + 30);

        Map<String, Object> result = new HashMap<>();
        result.put("score", correct + " / " + total);
        result.put("accuracy", accuracy + "%");
        result.put("xpEarned", 30);
        result.put("weakTopics", weakTopics);
        return ResponseEntity.ok(result);
    }
}

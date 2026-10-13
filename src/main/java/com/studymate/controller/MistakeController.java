package com.studymate.controller;

import com.studymate.model.Mistake;
import com.studymate.service.MistakeMemoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/mistakes")
@CrossOrigin(origins = "*")
public class MistakeController {

    private final MistakeMemoryService mistakeMemoryService;

    public MistakeController(MistakeMemoryService mistakeMemoryService) {
        this.mistakeMemoryService = mistakeMemoryService;
    }

    @GetMapping
    public ResponseEntity<Collection<Mistake>> getMistakes() {
        return ResponseEntity.ok(mistakeMemoryService.getAllMistakes());
    }

    @PostMapping("/{id}/recovery")
    public ResponseEntity<?> startRecoverySession(@PathVariable String id) {
        return ResponseEntity.ok(mistakeMemoryService.generateRecoverySession(id));
    }
}

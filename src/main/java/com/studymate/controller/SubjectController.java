package com.studymate.controller;

import com.studymate.model.Subject;
import com.studymate.service.DemoDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {

    private final DemoDataService demoDataService;

    public SubjectController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping
    public ResponseEntity<Collection<Subject>> getSubjects() {
        return ResponseEntity.ok(demoDataService.getSubjects().values());
    }

    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        if (subject.getId() == null || subject.getId().isEmpty()) {
            subject.setId("sub_" + UUID.randomUUID().toString().substring(0, 8));
        }
        demoDataService.getSubjects().put(subject.getId(), subject);
        return ResponseEntity.ok(subject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable String id) {
        demoDataService.getSubjects().remove(id);
        return ResponseEntity.ok().build();
    }
}

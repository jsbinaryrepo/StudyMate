package com.studymate.controller;

import com.studymate.model.StudyPlanItem;
import com.studymate.service.DemoDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/planner")
@CrossOrigin(origins = "*")
public class StudyPlanController {

    private final DemoDataService demoDataService;

    public StudyPlanController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping
    public ResponseEntity<Collection<StudyPlanItem>> getStudyPlans() {
        return ResponseEntity.ok(demoDataService.getStudyPlans().values());
    }

    @PostMapping("/{id}/toggle")
    public ResponseEntity<StudyPlanItem> togglePlanItem(@PathVariable String id) {
        StudyPlanItem item = demoDataService.getStudyPlans().get(id);
        if (item != null) {
            item.setCompleted(!item.isCompleted());
            // Update today's progress
            long completedCount = demoDataService.getStudyPlans().values().stream().filter(StudyPlanItem::isCompleted).count();
            int total = demoDataService.getStudyPlans().size();
            int percent = total > 0 ? (int) Math.round(((double) completedCount / total) * 100) : 72;
            demoDataService.getUserProfile().setTodayProgressPercent(percent);
            return ResponseEntity.ok(item);
        }
        return ResponseEntity.notFound().build();
    }
}

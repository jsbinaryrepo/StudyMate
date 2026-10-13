package com.studymate.service;

import com.studymate.model.Mistake;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MistakeMemoryService {

    private final DemoDataService demoDataService;

    public MistakeMemoryService(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    public Collection<Mistake> getAllMistakes() {
        return demoDataService.getMistakes().values();
    }

    public Map<String, Object> generateRecoverySession(String mistakeId) {
        Mistake mistake = demoDataService.getMistakes().get(mistakeId);
        String topic = mistake != null ? mistake.getTopic() : "Memory Management";

        Map<String, Object> session = new HashMap<>();
        session.put("topic", topic);
        session.put("targetMistakeCount", mistake != null ? mistake.getOccurrences() : 4);
        session.put("steps", Arrays.asList(
                "Step 1: 10-minute targeted concept revision on Page Replacement & Address Translation",
                "Step 2: 8 High-yield flashcards focusing on Belady's Anomaly and Frame Allocations",
                "Step 3: 5 Targeted practice questions covering EAT and FIFO vs LRU",
                "Step 4: 5-question Mini Quiz with strict 5-minute timer",
                "Step 5: Automated re-evaluation and mastery status upgrade"
        ));
        session.put("estimatedTotalTime", "25 minutes");
        session.put("recoveryGoal", "Eliminate recurring errors on " + topic + " and raise topic accuracy above 85%");
        return session;
    }
}

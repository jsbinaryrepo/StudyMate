package com.studymate.controller;

import com.studymate.model.UserProfile;
import com.studymate.service.DemoDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class UserProfileController {

    private final DemoDataService demoDataService;

    public UserProfileController(DemoDataService demoDataService) {
        this.demoDataService = demoDataService;
    }

    @GetMapping
    public ResponseEntity<UserProfile> getProfile() {
        return ResponseEntity.ok(demoDataService.getUserProfile());
    }

    @PostMapping
    public ResponseEntity<UserProfile> updateProfile(@RequestBody UserProfile updated) {
        UserProfile current = demoDataService.getUserProfile();
        if (updated.getName() != null) current.setName(updated.getName());
        if (updated.getCollege() != null) current.setCollege(updated.getCollege());
        if (updated.getCourse() != null) current.setCourse(updated.getCourse());
        if (updated.getYear() != null) current.setYear(updated.getYear());
        if (updated.getStudyStyle() != null) current.setStudyStyle(updated.getStudyStyle());
        return ResponseEntity.ok(current);
    }
}

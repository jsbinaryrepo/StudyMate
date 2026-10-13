package com.studymate.controller;

import com.studymate.model.StudyMaterial;
import com.studymate.service.DemoDataService;
import com.studymate.service.FileStorageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "*")
public class MaterialController {

    private final FileStorageService fileStorageService;
    private final DemoDataService demoDataService;

    public MaterialController(FileStorageService fileStorageService, DemoDataService demoDataService) {
        this.fileStorageService = fileStorageService;
        this.demoDataService = demoDataService;
    }

    @GetMapping
    public ResponseEntity<Collection<StudyMaterial>> getAllMaterials() {
        return ResponseEntity.ok(demoDataService.getMaterials().values());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMaterialById(@PathVariable String id) {
        StudyMaterial material = demoDataService.getMaterials().get(id);
        if (material != null) {
            return ResponseEntity.ok(material);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadMaterial(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "subjectId", required = false, defaultValue = "sub_os") String subjectId,
            @RequestParam(value = "subjectName", required = false, defaultValue = "Operating Systems") String subjectName
    ) {
        try {
            if (file.isEmpty()) {
                Map<String, String> err = new HashMap<>();
                err.put("error", "Cannot upload empty file.");
                return ResponseEntity.badRequest().body(err);
            }

            StudyMaterial savedMaterial = fileStorageService.storeFile(file, subjectId, subjectName);
            demoDataService.getMaterials().put(savedMaterial.getId(), savedMaterial);

            // Update user XP for uploading
            demoDataService.getUserProfile().setXp(demoDataService.getUserProfile().getXp() + 10);

            return ResponseEntity.ok(savedMaterial);
        } catch (Exception e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "Upload failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(err);
        }
    }
}

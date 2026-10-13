package com.studymate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudyMateApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudyMateApplication.class, args);
        System.out.println("==================================================");
        System.out.println("🎓 StudyMate AI Server Started Successfully!");
        System.out.println("🚀 Open in Browser: http://localhost:8080");
        System.out.println("Tagline: Study Smarter. Practice Better. Know When You're Ready.");
        System.out.println("==================================================");
    }
}

package com.miweb.corp.controller;

import com.miweb.corp.model.Story;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class StoryController {

    @GetMapping("/api/stories")
    public List<Story> getStories() {
        return Arrays.asList(
                new Story("Alimentar al mundo de forma sostenible",
                        "Innovación para transformar el sistema alimentario.",
                        "/assets/stories/food.jpg",
                        "#"),
                new Story("Personalización de lujo",
                        "Experiencias con gemelos digitales.",
                        "/assets/stories/luxury.jpg",
                        "#"),
                new Story("Operaciones globales creativas",
                        "Transformación con datos y nube.",
                        "/assets/stories/ops.jpg",
                        "#")
        );
    }
}

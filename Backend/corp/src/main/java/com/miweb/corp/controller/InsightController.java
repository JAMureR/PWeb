package com.miweb.corp.controller;

import com.miweb.corp.model.Insight;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class InsightController {

    @GetMapping("/api/insights")
    public List<Insight> getInsights() {
        return Arrays.asList(
                new Insight("Cadenas de suministro autónomas",
                        "Por qué deben ser rápidas, ágiles y sostenibles.",
                        "/assets/insights/supply.jpg",
                        "Leer más"),
                new Insight("IA generativa en el trabajo",
                        "De la experimentación al impacto.",
                        "/assets/insights/genai.jpg",
                        "Leer más")
        );
    }
}

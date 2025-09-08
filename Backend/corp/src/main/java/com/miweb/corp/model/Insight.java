package com.miweb.corp.model;

public class Insight {
    private String title;     // título del insight
    private String summary;   // resumen corto
    private String imageUrl;  // imagen relacionada
    private String cta;       // texto del botón, ej: "Leer más"

    // Constructor
    public Insight(String title, String summary, String imageUrl, String cta) {
        this.title = title;
        this.summary = summary;
        this.imageUrl = imageUrl;
        this.cta = cta;
    }

    // Getters
    public String getTitle() { return title; }
    public String getSummary() { return summary; }
    public String getImageUrl() { return imageUrl; }
    public String getCta() { return cta; }
}

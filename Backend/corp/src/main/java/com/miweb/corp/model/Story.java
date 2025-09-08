package com.miweb.corp.model;

public class Story {
    private String title;    // título de la historia
    private String blurb;    // resumen o descripción breve
    private String imageUrl; // imagen relacionada
    private String link;     // enlace para ver más

    // Constructor
    public Story(String title, String blurb, String imageUrl, String link) {
        this.title = title;
        this.blurb = blurb;
        this.imageUrl = imageUrl;
        this.link = link;
    }

    // Getters (para que Spring convierta a JSON)
    public String getTitle() { return title; }
    public String getBlurb() { return blurb; }
    public String getImageUrl() { return imageUrl; }
    public String getLink() { return link; }
}

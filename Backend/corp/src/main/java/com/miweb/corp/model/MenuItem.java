package com.miweb.corp.model;

import java.util.List;

public class MenuItem {
    private String label; // Texto visible (ej: "Qué hacemos")
    private String path;  // Ruta del frontend (ej: "/what-we-do")
    private List<String> subItems; // Submenús (ej: ["Cloud","IA","Ciberseguridad"])
    
    // Constructor
    public MenuItem(String label, String path, List<String> subItems) {
        this.label = label;
        this.path = path;
        this.subItems = subItems;
    }

    // Getters (necesarios para que Spring pueda devolver JSON)
    public String getLabel() { return label; }
    public String getPath() { return path; }
    public List<String> getSubItems() { return subItems; }
}
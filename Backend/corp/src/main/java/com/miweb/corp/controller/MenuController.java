package com.miweb.corp.controller;

import com.miweb.corp.model.MenuItem;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController // Esto convierte la clase en un controlador REST
public class MenuController {

    // Endpoint: http://localhost:8080/api/menu
    @GetMapping("/api/menu")
    public List<MenuItem> getMenu() {
        // Devolvemos datos de prueba (mock)
        return Arrays.asList(
                new MenuItem("Qué hacemos", "/what-we-do", Arrays.asList("Cloud", "IA", "Ciberseguridad")),
                new MenuItem("Industrías", "/industries", Arrays.asList("Finanzas", "Salud", "Retail")),
                new MenuItem("Carreras", "/careers", Arrays.asList("Estudiantes", "Profesionales")),
                new MenuItem("Sobre nosotros", "/about", Arrays.asList("Historia", "Valores", "Noticias"))
        );
    }
}

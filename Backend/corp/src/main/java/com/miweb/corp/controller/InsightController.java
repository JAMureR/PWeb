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
				new Insight("Cadenas de suministro autónomas", "Por qué deben ser rápidas, ágiles y sostenibles.",
						"/assets/insights/supply.jpg", "Leer más"),
				new Insight("IA generativa en el trabajo", "De la experimentación al impacto.",
						"/assets/insights/genai.png", "Leer más"),
				new Insight("Transformación digital de empresas",
						"Cómo las organizaciones se adaptan a la nueva era digital.",
						"/assets/insights/digital-transformation.png", "Leer más"),
				new Insight("Ciberseguridad avanzada", "Protege tu empresa frente a amenazas digitales complejas.",
						"/assets/insights/cybersecurity.png", "Leer más"),
				new Insight("Tendencias en movilidad urbana",
						"Soluciones innovadoras para transporte más eficiente y ecológico.",
						"/assets/insights/urban-mobility.png", "Leer más"),
				new Insight("Economía circular", "Modelos de negocio que reducen residuos y optimizan recursos.",
						"/assets/insights/circular-economy.png", "Leer más"),
				new Insight("Trabajo híbrido y productividad",
						"Cómo maximizar el rendimiento combinando oficina y remoto.",
						"/assets/insights/hybrid-work.png", "Leer más"),
				new Insight(
					    "Blockchain en negocios",
					    "Aplicaciones prácticas de la tecnología para transparencia y eficiencia.",
					    "/assets/insights/blockchain.png",
					    "Leer más"));
	}
}

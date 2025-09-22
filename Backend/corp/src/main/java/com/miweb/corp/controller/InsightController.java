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
						"/assets/insights/supply.jpg", "Leer más",
						"La automatización permite optimizar procesos y reducir errores en la cadena de suministro."),
				new Insight("IA generativa en el trabajo", "De la experimentación al impacto.",
						"/assets/insights/genai.png", "Leer más",
						"Implementar IA generativa mejora la creatividad y la eficiencia en distintos departamentos."),
				new Insight("Transformación digital de empresas",
						"Cómo las organizaciones se adaptan a la nueva era digital.",
						"/assets/insights/digital-transformation.png", "Leer más",
						"La transformación digital requiere innovación, agilidad y liderazgo estratégico."),
				new Insight("Ciberseguridad avanzada", "Protege tu empresa frente a amenazas digitales complejas.",
						"/assets/insights/cybersecurity.png", "Leer más",
						"Adoptar medidas avanzadas de ciberseguridad minimiza riesgos y protege los datos críticos."),
				new Insight("Tendencias en movilidad urbana",
						"Soluciones innovadoras para transporte más eficiente y ecológico.",
						"/assets/insights/urban-mobility.png", "Leer más",
						"La movilidad urbana sostenible combina tecnología, transporte compartido y planificación inteligente."),
				new Insight("Economía circular", "Modelos de negocio que reducen residuos y optimizan recursos.",
						"/assets/insights/circular-economy.png", "Leer más",
						"Fomentar la economía circular reduce el impacto ambiental y crea nuevas oportunidades de negocio."),
				new Insight("Trabajo híbrido y productividad",
						"Cómo maximizar el rendimiento combinando oficina y remoto.",
						"/assets/insights/hybrid-work.png", "Leer más",
						"Combinar presencial y remoto potencia la flexibilidad y el bienestar de los empleados."),
				new Insight("Blockchain en negocios",
						"Aplicaciones prácticas de la tecnología para transparencia y eficiencia.",
						"/assets/insights/blockchain.png", "Leer más",
						"Blockchain permite transacciones seguras, trazabilidad y confianza entre empresas."));
	}
}

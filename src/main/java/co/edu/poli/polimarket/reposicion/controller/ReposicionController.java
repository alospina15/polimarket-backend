package co.edu.poli.polimarket.reposicion.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.poli.polimarket.reposicion.dto.SolicitudReposicionDTO;
import co.edu.poli.polimarket.reposicion.entity.SolicitudReposicionEntity;
import co.edu.poli.polimarket.reposicion.service.ReposicionService;

@RestController
@RequestMapping("/api/v1/reposicion")
public class ReposicionController {

	private final ReposicionService reposicionService;

	public ReposicionController(ReposicionService reposicionService) {
		this.reposicionService = reposicionService;
	}

	@PostMapping("/solicitar")
	public ResponseEntity<SolicitudReposicionEntity> solicitarReposicion(
			@RequestBody SolicitudReposicionDTO solicitudDTO) {
		SolicitudReposicionEntity solicitudCreada = reposicionService.crearSolicitud(solicitudDTO);
		return ResponseEntity.ok(solicitudCreada);
	}
}
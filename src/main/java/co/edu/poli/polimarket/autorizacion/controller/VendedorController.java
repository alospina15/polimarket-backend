package co.edu.poli.polimarket.autorizacion.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.poli.polimarket.autorizacion.dto.AutorizacionRequestDTO;
import co.edu.poli.polimarket.autorizacion.dto.VendedorDTO;
import co.edu.poli.polimarket.autorizacion.service.AutorizacionService;

@RestController
@RequestMapping("/api/v1/vendedores")
public class VendedorController {

	private final AutorizacionService autorizacionService;

	public VendedorController(AutorizacionService autorizacionService) {
		this.autorizacionService = autorizacionService;
	}

	@PutMapping("/{id}/autorizar")
	public ResponseEntity<VendedorDTO> autorizarVendedor(@PathVariable Long id,
			@RequestBody AutorizacionRequestDTO request) {
		VendedorDTO vendedorDTO = autorizacionService.autorizarVendedor(id, request.isAutorizado());
		return ResponseEntity.ok(vendedorDTO);
	}
}

package co.edu.poli.polimarket.autorizacion.controller;

import java.util.List;
import java.util.Arrays;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.poli.polimarket.autorizacion.dto.AutorizacionRequestDTO;
import co.edu.poli.polimarket.autorizacion.dto.VendedorDTO;
import co.edu.poli.polimarket.autorizacion.service.AutorizacionService;

@RestController
@RequestMapping("/api/v1/vendedores")
public class VendedorController {
    public static final List<VendedorDTO> vendedores = new java.util.ArrayList<>();
    static {
        vendedores.add(new VendedorDTO(1L, "Ana Rodríguez", true));
        vendedores.add(new VendedorDTO(2L, "Pedro Martínez", true));
        vendedores.add(new VendedorDTO(3L, "Laura Sánchez", false));
    }
    @GetMapping
    public ResponseEntity<List<VendedorDTO>> listarVendedores() {
        return ResponseEntity.ok(vendedores);
    }

    // RF2: Listar solo los vendedores autorizados
    @GetMapping("/autorizados")
    public ResponseEntity<List<VendedorDTO>> listarVendedoresAutorizados() {
        List<VendedorDTO> autorizados = vendedores.stream()
            .filter(VendedorDTO::isAutorizado)
            .toList();
        return ResponseEntity.ok(autorizados);
    }


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
    @PostMapping("/registrar")
    public ResponseEntity<VendedorDTO> registrarVendedor(@RequestBody VendedorDTO vendedorDTO) {
        vendedorDTO.setId(System.currentTimeMillis());
        vendedores.add(vendedorDTO);
        return ResponseEntity.ok(vendedorDTO);
    }
}

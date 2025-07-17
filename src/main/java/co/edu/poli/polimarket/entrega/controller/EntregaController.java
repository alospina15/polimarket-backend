package co.edu.poli.polimarket.entrega.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.poli.polimarket.entrega.dto.PedidoEntregaDTO;
import co.edu.poli.polimarket.entrega.service.EntregaService;

@RestController
@RequestMapping("/api/v1/entregas")
public class EntregaController {

	private final EntregaService entregaService;

	public EntregaController(EntregaService entregaService) {
		this.entregaService = entregaService;
	}

	@GetMapping("/pendientes")
	public ResponseEntity<List<PedidoEntregaDTO>> consultarPedidosPendientes() {
		List<PedidoEntregaDTO> pedidos = entregaService.consultarPedidosParaEntrega();
		return ResponseEntity.ok(pedidos);
	}
}
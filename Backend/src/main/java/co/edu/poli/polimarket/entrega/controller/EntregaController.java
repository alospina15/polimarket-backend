package co.edu.poli.polimarket.entrega.controller;

import java.util.List;
import java.util.Arrays;
import org.springframework.web.bind.annotation.GetMapping;

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
    private static final List<PedidoEntregaDTO> entregas = new java.util.concurrent.CopyOnWriteArrayList<>();
    static {
        entregas.add(new PedidoEntregaDTO(1L, "Producto A, Producto B", "Calle 123 #45-67"));
        entregas.add(new PedidoEntregaDTO(2L, "Producto C", "Carrera 89 #12-34"));
    }
    @GetMapping
    public ResponseEntity<List<PedidoEntregaDTO>> listarEntregas() {
        return ResponseEntity.ok(entregas);
    }

    // Endpoint para agregar una nueva entrega (mock)
    @org.springframework.web.bind.annotation.PostMapping("/registrar")
    public ResponseEntity<PedidoEntregaDTO> registrarEntrega(@org.springframework.web.bind.annotation.RequestBody PedidoEntregaDTO entrega) {
        entrega.setIdVenta(System.currentTimeMillis());
        entregas.add(entrega);
        return ResponseEntity.ok(entrega);
    }


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
package co.edu.poli.polimarket.pedido.controller;

import java.util.List;
import java.util.Arrays;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Arrays;
import co.edu.poli.polimarket.pedido.dto.PedidoDTO;

@RestController
@RequestMapping("/api/v1/pedidos")
public class PedidoController {
    private static final List<PedidoDTO> pedidos = new java.util.concurrent.CopyOnWriteArrayList<>();
    static {
        pedidos.add(new PedidoDTO(1L, "Cliente A", "2024-07-20", "ENTREGADO"));
        pedidos.add(new PedidoDTO(2L, "Cliente B", "2024-07-19", "PENDIENTE"));
    }
    @GetMapping
    public ResponseEntity<List<PedidoDTO>> listarPedidos() {
        return ResponseEntity.ok(pedidos);
    }

    // Endpoint para agregar un nuevo pedido (mock)
    @org.springframework.web.bind.annotation.PostMapping("/registrar")
    public ResponseEntity<PedidoDTO> registrarPedido(@org.springframework.web.bind.annotation.RequestBody PedidoDTO pedido) {
        pedido.setId(System.currentTimeMillis());
        pedidos.add(pedido);
        return ResponseEntity.ok(pedido);
    }
}

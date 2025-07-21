package co.edu.poli.polimarket.cliente.controller;

import java.util.List;
import java.util.Arrays;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Arrays;
import co.edu.poli.polimarket.cliente.dto.ClienteDTO;

@RestController
@RequestMapping("/api/v1/clientes")
public class ClienteController {
    private static final List<ClienteDTO> clientes = new java.util.concurrent.CopyOnWriteArrayList<>();
    static {
        clientes.add(new ClienteDTO(1L, "Cliente A", "clienteA@correo.com"));
        clientes.add(new ClienteDTO(2L, "Cliente B", "clienteB@correo.com"));
    }
    @GetMapping
    public ResponseEntity<List<ClienteDTO>> listarClientes() {
        return ResponseEntity.ok(clientes);
    }

    // Endpoint para agregar un nuevo cliente (mock)
    @org.springframework.web.bind.annotation.PostMapping("/registrar")
    public ResponseEntity<ClienteDTO> registrarCliente(@org.springframework.web.bind.annotation.RequestBody ClienteDTO cliente) {
        cliente.setId(System.currentTimeMillis());
        clientes.add(cliente);
        return ResponseEntity.ok(cliente);
    }
}

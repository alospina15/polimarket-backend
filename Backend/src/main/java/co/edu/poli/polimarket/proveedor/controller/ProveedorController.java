package co.edu.poli.polimarket.proveedor.controller;

import java.util.List;
import java.util.Arrays;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Arrays;
import co.edu.poli.polimarket.proveedor.dto.ProveedorDTO;

@RestController
@RequestMapping("/api/v1/proveedores")
public class ProveedorController {
    private static final List<ProveedorDTO> proveedores = new java.util.concurrent.CopyOnWriteArrayList<>();
    static {
        proveedores.add(new ProveedorDTO(1L, "Proveedor A", "proveedorA@correo.com"));
        proveedores.add(new ProveedorDTO(2L, "Proveedor B", "proveedorB@correo.com"));
    }
    @GetMapping
    public ResponseEntity<List<ProveedorDTO>> listarProveedores() {
        return ResponseEntity.ok(proveedores);
    }

    // Endpoint para agregar un nuevo proveedor (mock)
    @org.springframework.web.bind.annotation.PostMapping("/registrar")
    public ResponseEntity<ProveedorDTO> registrarProveedor(@org.springframework.web.bind.annotation.RequestBody ProveedorDTO proveedor) {
        proveedor.setId(System.currentTimeMillis());
        proveedores.add(proveedor);
        return ResponseEntity.ok(proveedor);
    }
}

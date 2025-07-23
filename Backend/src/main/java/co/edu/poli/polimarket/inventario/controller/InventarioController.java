package co.edu.poli.polimarket.inventario.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/inventario")
public class InventarioController {

    @PostMapping("/movimiento")
    public ResponseEntity<?> registrarMovimiento(@RequestBody MovimientoInventarioDTO movimiento) {
        // Aquí va la lógica para registrar el movimiento (entrada/salida)
        // Por ahora solo retorna OK para probar
        return ResponseEntity.ok().build();
    }
}

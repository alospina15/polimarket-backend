package co.edu.poli.polimarket.producto.controller;

import java.util.List;
import java.util.Arrays;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.poli.polimarket.producto.dto.DisponibilidadDTO;
import co.edu.poli.polimarket.producto.dto.SuministroDTO;
import co.edu.poli.polimarket.producto.entity.ProductoEntity;
import co.edu.poli.polimarket.producto.service.ProductoService;

@RestController
@RequestMapping("/api/v1/productos")
public class ProductoController {
    private static final List<ProductoEntity> productos = new java.util.concurrent.CopyOnWriteArrayList<>();
    static {
        productos.add(new ProductoEntity(1L, "Producto A", "Categoría 1", 10));
        productos.add(new ProductoEntity(2L, "Producto B", "Categoría 2", 10));
    }
    @GetMapping
    public ResponseEntity<List<ProductoEntity>> listarProductos() {
        return ResponseEntity.ok(productos);
    }


	private final ProductoService productoService;

	public ProductoController(ProductoService productoService) {
		this.productoService = productoService;
	}

	// Endpoint para RF2: Verificación de Disponibilidad
	@GetMapping("/{idProducto}/disponibilidad")
	public ResponseEntity<DisponibilidadDTO> verificarDisponibilidad(@PathVariable Long idProducto) {
		DisponibilidadDTO disponibilidad = productoService.consultarDisponibilidad(idProducto);
		return ResponseEntity.ok(disponibilidad);
	}

    // Endpoint para agregar un nuevo producto (mock)
    @PostMapping("/registrar")
    public ResponseEntity<ProductoEntity> registrarProducto(@RequestBody ProductoEntity producto) {
        producto.setId(System.currentTimeMillis());
        productos.add(producto);
        return ResponseEntity.ok(producto);
    }

    // Endpoint para RF5: Suministro de Productos (mock)
    @PostMapping("/{idProducto}/suministro")
    public ResponseEntity<ProductoEntity> registrarSuministro(@PathVariable Long idProducto,
            @RequestBody SuministroDTO suministroDTO) {
        ProductoEntity producto = productos.stream()
            .filter(p -> p.getId().equals(idProducto))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + idProducto));
        int nuevaCantidad = producto.getCantidadDisponible() + suministroDTO.getCantidadSuministrada();
        producto.setCantidadDisponible(nuevaCantidad);
        return ResponseEntity.ok(producto);
    }
}
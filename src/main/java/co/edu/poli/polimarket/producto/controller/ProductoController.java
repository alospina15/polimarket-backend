package co.edu.poli.polimarket.producto.controller;

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

	// Endpoint para RF5: Suministro de Productos
	@PostMapping("/{idProducto}/suministro")
	public ResponseEntity<ProductoEntity> registrarSuministro(@PathVariable Long idProducto,
			@RequestBody SuministroDTO suministroDTO) {
		ProductoEntity productoActualizado = productoService.registrarSuministro(idProducto, suministroDTO);
		return ResponseEntity.ok(productoActualizado);
	}
}
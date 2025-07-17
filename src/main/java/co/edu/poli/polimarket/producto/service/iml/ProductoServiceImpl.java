package co.edu.poli.polimarket.producto.service.iml;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.edu.poli.polimarket.producto.dto.DisponibilidadDTO;
import co.edu.poli.polimarket.producto.dto.SuministroDTO;
import co.edu.poli.polimarket.producto.entity.ProductoEntity;
import co.edu.poli.polimarket.producto.repository.ProductoRepository;
import co.edu.poli.polimarket.producto.service.ProductoService;
import co.edu.poli.polimarket.util.ResourceNotFoundException;

@Service
public class ProductoServiceImpl implements ProductoService {

	private final ProductoRepository productoRepository;

	public ProductoServiceImpl(ProductoRepository productoRepository) {
		this.productoRepository = productoRepository;
	}

	@Override
	@Transactional(readOnly = true)
	public DisponibilidadDTO consultarDisponibilidad(Long idProducto) {
		ProductoEntity producto = productoRepository.findById(idProducto)
				.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con el id: " + idProducto));
		return new DisponibilidadDTO(producto.getId(), producto.getNombre(), producto.getCantidadDisponible());
	}

	@Override
	@Transactional
	public ProductoEntity registrarSuministro(Long idProducto, SuministroDTO suministroDTO) {
		ProductoEntity producto = productoRepository.findById(idProducto)
				.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con el id: " + idProducto));
		int nuevaCantidad = producto.getCantidadDisponible() + suministroDTO.getCantidadSuministrada();
		producto.setCantidadDisponible(nuevaCantidad);
		return productoRepository.save(producto);
	}
}
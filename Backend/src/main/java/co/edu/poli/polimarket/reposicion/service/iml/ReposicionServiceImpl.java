package co.edu.poli.polimarket.reposicion.service.iml;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import co.edu.poli.polimarket.producto.entity.ProductoEntity;
import co.edu.poli.polimarket.producto.repository.ProductoRepository;
import co.edu.poli.polimarket.proveedor.entity.ProveedorEntity;
import co.edu.poli.polimarket.proveedor.repository.ProveedorRepository;
import co.edu.poli.polimarket.reposicion.dto.SolicitudReposicionDTO;
import co.edu.poli.polimarket.reposicion.entity.SolicitudReposicionEntity;
import co.edu.poli.polimarket.reposicion.repository.SolicitudReposicionRepository;
import co.edu.poli.polimarket.reposicion.service.ReposicionService;
import co.edu.poli.polimarket.util.ResourceNotFoundException;

@Service
public class ReposicionServiceImpl implements ReposicionService {

	private final SolicitudReposicionRepository solicitudRepository;
	private final ProductoRepository productoRepository;
	private final ProveedorRepository proveedorRepository;

	public ReposicionServiceImpl(SolicitudReposicionRepository solicitudRepository,
			ProductoRepository productoRepository, ProveedorRepository proveedorRepository) {

		this.solicitudRepository = solicitudRepository;
		this.productoRepository = productoRepository;
		this.proveedorRepository = proveedorRepository;
	}

	@Override
	public SolicitudReposicionEntity crearSolicitud(SolicitudReposicionDTO solicitudDTO) {
		ProductoEntity producto = productoRepository.findById(solicitudDTO.getIdProducto())
				.orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
		ProveedorEntity proveedor = proveedorRepository.findById(solicitudDTO.getIdProveedor())
				.orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado"));
		SolicitudReposicionEntity solicitud = new SolicitudReposicionEntity();
		solicitud.setProducto(producto);
		solicitud.setProveedor(proveedor);
		solicitud.setCantidadSolicitada(solicitudDTO.getCantidad());
		solicitud.setFechaSolicitud(LocalDate.now());
		solicitud.setEstado("ENVIADA");
		return solicitudRepository.save(solicitud);
	}
}
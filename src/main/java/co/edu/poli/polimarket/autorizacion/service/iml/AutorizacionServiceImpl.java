package co.edu.poli.polimarket.autorizacion.service.iml;

import org.springframework.stereotype.Service;

import co.edu.poli.polimarket.autorizacion.dto.VendedorDTO;
import co.edu.poli.polimarket.autorizacion.entity.VendedorEntity;
import co.edu.poli.polimarket.autorizacion.repository.VendedorRepository;
import co.edu.poli.polimarket.autorizacion.service.AutorizacionService;
import co.edu.poli.polimarket.util.ResourceNotFoundException;

@Service
public class AutorizacionServiceImpl implements AutorizacionService {
	private final VendedorRepository vendedorRepository;

	public AutorizacionServiceImpl(VendedorRepository vendedorRepository) {
		this.vendedorRepository = vendedorRepository;
	}

	@Override
	public VendedorDTO autorizarVendedor(Long vendedorId, boolean autorizar) {
		VendedorEntity vendedor = vendedorRepository.findById(vendedorId)
				.orElseThrow(() -> new ResourceNotFoundException("Vendedor no encontrado con id: " + vendedorId));
		vendedor.setAutorizado(autorizar);
		VendedorEntity vendedorActualizado = vendedorRepository.save(vendedor);
		return new VendedorDTO(vendedorActualizado.getId(), vendedorActualizado.getNombre(),
				vendedorActualizado.isAutorizado());
	}
}

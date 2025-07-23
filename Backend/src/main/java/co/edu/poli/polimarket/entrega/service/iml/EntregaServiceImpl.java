package co.edu.poli.polimarket.entrega.service.iml;

import java.util.List;

import org.springframework.stereotype.Service;

import co.edu.poli.polimarket.entrega.dto.PedidoEntregaDTO;
import co.edu.poli.polimarket.entrega.service.EntregaService;
import co.edu.poli.polimarket.venta.repository.VentaRepository; 

@Service
public class EntregaServiceImpl implements EntregaService {
	
	private final VentaRepository ventaRepository;

	public EntregaServiceImpl(VentaRepository ventaRepository) {
		this.ventaRepository = ventaRepository;
	}

	@Override
	public List<PedidoEntregaDTO> consultarPedidosParaEntrega() {
		return ventaRepository.findByEstado("PROCESADA").stream().map(
				venta -> new PedidoEntregaDTO(venta.getId(), venta.getListaProductos(), venta.getDireccionEntrega()))
				.toList();
	}
}
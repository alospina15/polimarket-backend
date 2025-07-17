package co.edu.poli.polimarket.entrega.service;

import java.util.List;
import co.edu.poli.polimarket.entrega.dto.PedidoEntregaDTO;

public interface EntregaService {
	
	List<PedidoEntregaDTO> consultarPedidosParaEntrega();
}
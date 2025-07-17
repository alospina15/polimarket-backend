package co.edu.poli.polimarket.autorizacion.service;

import co.edu.poli.polimarket.autorizacion.dto.VendedorDTO;

public interface AutorizacionService {

	VendedorDTO autorizarVendedor(Long vendedorId, boolean autorizar);

}

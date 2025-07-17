package co.edu.poli.polimarket.producto.service;

import co.edu.poli.polimarket.producto.dto.DisponibilidadDTO;
import co.edu.poli.polimarket.producto.dto.SuministroDTO;
import co.edu.poli.polimarket.producto.entity.ProductoEntity;

public interface ProductoService {
	
	DisponibilidadDTO consultarDisponibilidad(Long idProducto);

	ProductoEntity registrarSuministro(Long idProducto, SuministroDTO suministroDTO);
}
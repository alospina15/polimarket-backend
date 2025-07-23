package co.edu.poli.polimarket.reposicion.service;

import co.edu.poli.polimarket.reposicion.dto.SolicitudReposicionDTO;
import co.edu.poli.polimarket.reposicion.entity.SolicitudReposicionEntity;

public interface ReposicionService {
	
	SolicitudReposicionEntity crearSolicitud(SolicitudReposicionDTO solicitudDTO);
}
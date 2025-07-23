package co.edu.poli.polimarket.venta.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import co.edu.poli.polimarket.venta.entity.VentaEntity;

@Repository
public interface VentaRepository extends JpaRepository<VentaEntity, Long> {
	
	List<VentaEntity> findByEstado(String estado);
}
package co.edu.poli.polimarket.proveedor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import co.edu.poli.polimarket.proveedor.entity.ProveedorEntity;

@Repository
public interface ProveedorRepository extends JpaRepository<ProveedorEntity, Long> {
}
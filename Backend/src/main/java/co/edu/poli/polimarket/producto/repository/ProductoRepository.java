package co.edu.poli.polimarket.producto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import co.edu.poli.polimarket.producto.entity.ProductoEntity;

@Repository
public interface ProductoRepository extends JpaRepository<ProductoEntity, Long> {
}
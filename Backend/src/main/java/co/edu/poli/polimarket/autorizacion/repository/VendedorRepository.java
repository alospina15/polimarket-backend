package co.edu.poli.polimarket.autorizacion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import co.edu.poli.polimarket.autorizacion.entity.VendedorEntity;

@Repository
public interface VendedorRepository extends JpaRepository<VendedorEntity, Long> {
}
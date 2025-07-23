package co.edu.poli.polimarket.reposicion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import co.edu.poli.polimarket.reposicion.entity.SolicitudReposicionEntity;

@Repository
public interface SolicitudReposicionRepository extends JpaRepository<SolicitudReposicionEntity, Long> {
}
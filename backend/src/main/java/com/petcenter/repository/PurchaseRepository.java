package com.petcenter.repository;

import com.petcenter.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByUsuarioId(Long usuarioId);
    Optional<Purchase> findByNumeroComprobante(String numeroComprobante);
    List<Purchase> findByConfirmadaTrue();
    List<Purchase> findByFechaCompraBetween(LocalDateTime inicio, LocalDateTime fin);
}

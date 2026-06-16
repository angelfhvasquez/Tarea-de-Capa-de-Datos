package com.petcenter.repository;

import com.petcenter.entity.PurchaseItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Long> {
    List<PurchaseItem> findByCompraId(Long compraId);
    List<PurchaseItem> findByProductoId(Long productoId);
}

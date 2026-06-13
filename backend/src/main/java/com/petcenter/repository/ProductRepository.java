package com.petcenter.repository;

import com.petcenter.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoriaId(Long categoriaId);
    List<Product> findByStockGreaterThan(Integer stock);
}

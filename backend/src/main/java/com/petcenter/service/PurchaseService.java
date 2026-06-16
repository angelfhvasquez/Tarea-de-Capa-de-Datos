package com.petcenter.service;

import com.petcenter.dto.PurchaseDTO;
import com.petcenter.dto.PurchaseItemDTO;
import com.petcenter.entity.*;
import com.petcenter.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final PurchaseItemRepository purchaseItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public PurchaseDTO createPurchase(Long usuarioId, List<PurchaseItemDTO> itemsDTO) {
        User usuario = userRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Purchase purchase = Purchase.builder()
                .usuario(usuario)
                .confirmada(false)
                .build();

        BigDecimal total = BigDecimal.ZERO;

        for (PurchaseItemDTO itemDTO : itemsDTO) {
            Product product = productRepository.findById(itemDTO.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (product.getStock() < itemDTO.getCantidad()) {
                throw new IllegalArgumentException("Stock insuficiente para el producto: " + product.getNombre());
            }

            PurchaseItem item = PurchaseItem.builder()
                    .compra(purchase)
                    .producto(product)
                    .cantidad(itemDTO.getCantidad())
                    .precioUnitario(product.getPrecio())
                    .subtotal(product.getPrecio().multiply(new BigDecimal(itemDTO.getCantidad())))
                    .build();

            purchase.getItems().add(item);
            total = total.add(item.getSubtotal());

            // Reducir stock
            product.setStock(product.getStock() - itemDTO.getCantidad());
            productRepository.save(product);
        }

        purchase.setTotal(total);
        Purchase savedPurchase = purchaseRepository.save(purchase);
        return mapToDTO(savedPurchase);
    }

    public PurchaseDTO confirmPurchase(Long purchaseId) {
        Purchase purchase = purchaseRepository.findById(purchaseId)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada"));

        purchase.setConfirmada(true);
        Purchase updatedPurchase = purchaseRepository.save(purchase);
        return mapToDTO(updatedPurchase);
    }

    public PurchaseDTO getPurchaseById(Long id) {
        Purchase purchase = purchaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra no encontrada"));
        return mapToDTO(purchase);
    }

    public List<PurchaseDTO> getPurchasesByUsuario(Long usuarioId) {
        return purchaseRepository.findByUsuarioId(usuarioId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PurchaseDTO> getAllPurchases() {
        return purchaseRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PurchaseDTO> getConfirmedPurchases() {
        return purchaseRepository.findByConfirmadaTrue().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PurchaseDTO> getPurchasesByDateRange(LocalDateTime inicio, LocalDateTime fin) {
        return purchaseRepository.findByFechaCompraBetween(inicio, fin).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private PurchaseDTO mapToDTO(Purchase purchase) {
        PurchaseDTO dto = modelMapper.map(purchase, PurchaseDTO.class);
        if (purchase.getUsuario() != null) {
            dto.setUsuarioId(purchase.getUsuario().getId());
            dto.setUsuarioNombre(purchase.getUsuario().getNombre() + " " + purchase.getUsuario().getApellido());
        }
        if (purchase.getItems() != null) {
            dto.setItems(purchase.getItems().stream()
                    .map(item -> mapItemToDTO(item))
                    .collect(Collectors.toSet()));
        }
        return dto;
    }

    private PurchaseItemDTO mapItemToDTO(PurchaseItem item) {
        PurchaseItemDTO dto = modelMapper.map(item, PurchaseItemDTO.class);
        if (item.getProducto() != null) {
            dto.setProductoId(item.getProducto().getId());
            dto.setProductoNombre(item.getProducto().getNombre());
        }
        return dto;
    }
}

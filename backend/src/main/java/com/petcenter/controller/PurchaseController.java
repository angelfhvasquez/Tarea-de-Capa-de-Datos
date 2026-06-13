package com.petcenter.controller;

import com.petcenter.dto.PurchaseDTO;
import com.petcenter.dto.PurchaseItemDTO;
import com.petcenter.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<PurchaseDTO> createPurchase(
            @RequestParam Long usuarioId,
            @RequestBody List<PurchaseItemDTO> items) {
        PurchaseDTO purchase = purchaseService.createPurchase(usuarioId, items);
        return ResponseEntity.status(HttpStatus.CREATED).body(purchase);
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<PurchaseDTO> confirmPurchase(@PathVariable Long id) {
        PurchaseDTO purchase = purchaseService.confirmPurchase(id);
        return ResponseEntity.ok(purchase);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseDTO> getPurchaseById(@PathVariable Long id) {
        PurchaseDTO purchase = purchaseService.getPurchaseById(id);
        return ResponseEntity.ok(purchase);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PurchaseDTO>> getPurchasesByUsuario(@PathVariable Long usuarioId) {
        List<PurchaseDTO> purchases = purchaseService.getPurchasesByUsuario(usuarioId);
        return ResponseEntity.ok(purchases);
    }

    @GetMapping
    public ResponseEntity<List<PurchaseDTO>> getAllPurchases() {
        List<PurchaseDTO> purchases = purchaseService.getAllPurchases();
        return ResponseEntity.ok(purchases);
    }

    @GetMapping("/confirmed")
    public ResponseEntity<List<PurchaseDTO>> getConfirmedPurchases() {
        List<PurchaseDTO> purchases = purchaseService.getConfirmedPurchases();
        return ResponseEntity.ok(purchases);
    }
}

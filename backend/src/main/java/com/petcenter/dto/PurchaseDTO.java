package com.petcenter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseDTO {
    private Long id;
    private String numeroComprobante;
    private BigDecimal total;
    private LocalDateTime fechaCompra;
    private Boolean confirmada;
    private Long usuarioId;
    private String usuarioNombre;
    private Set<PurchaseItemDTO> items;
}

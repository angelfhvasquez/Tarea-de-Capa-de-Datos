package com.petcenter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardDTO {
    private Long totalCitas;
    private Long citasConfirmadas;
    private Long citasPendientes;
    private Long totalVentas;
    private Long totalProductos;
    private Long productosDisponibles;
    private Double ventasTotales;
    private Double ventasDelMes;
}

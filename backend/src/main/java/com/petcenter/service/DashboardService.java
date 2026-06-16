package com.petcenter.service;

import com.petcenter.dto.DashboardDTO;
import com.petcenter.entity.AppointmentStatus;
import com.petcenter.repository.AppointmentRepository;
import com.petcenter.repository.ProductRepository;
import com.petcenter.repository.PurchaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class DashboardService {

    private final AppointmentRepository appointmentRepository;
    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;

    public DashboardDTO getDashboardStats() {
        Long totalCitas = (long) appointmentRepository.findAll().size();
        Long citasConfirmadas = (long) appointmentRepository.findByEstado(AppointmentStatus.CONFIRMADA).size();
        Long citasPendientes = (long) appointmentRepository.findByEstado(AppointmentStatus.PROGRAMADA).size();

        Long totalVentas = (long) purchaseRepository.findByConfirmadaTrue().size();
        Long totalProductos = (long) productRepository.findAll().size();
        Long productosDisponibles = (long) productRepository.findByStockGreaterThan(0).size();

        Double ventasTotales = purchaseRepository.findByConfirmadaTrue().stream()
                .map(p -> p.getTotal().doubleValue())
                .reduce(0.0, Double::sum);

        YearMonth currentMonth = YearMonth.now();
        LocalDateTime inicio = currentMonth.atDay(1).atStartOfDay();
        LocalDateTime fin = currentMonth.atEndOfMonth().atTime(23, 59, 59);

        Double ventasDelMes = purchaseRepository.findByFechaCompraBetween(inicio, fin).stream()
                .filter(p -> p.getConfirmada())
                .map(p -> p.getTotal().doubleValue())
                .reduce(0.0, Double::sum);

        return DashboardDTO.builder()
                .totalCitas(totalCitas)
                .citasConfirmadas(citasConfirmadas)
                .citasPendientes(citasPendientes)
                .totalVentas(totalVentas)
                .totalProductos(totalProductos)
                .productosDisponibles(productosDisponibles)
                .ventasTotales(ventasTotales)
                .ventasDelMes(ventasDelMes)
                .build();
    }
}

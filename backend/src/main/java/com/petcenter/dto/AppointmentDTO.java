package com.petcenter.dto;

import com.petcenter.entity.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
    private Long id;
    private LocalDateTime fechaHora;
    private String razon;
    private String diagnostico;
    private String tratamiento;
    private AppointmentStatus estado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime ultimaActualizacion;
    private Long usuarioId;
    private String usuarioNombre;
    private Long mascotaId;
    private String mascotaNombre;
    private Long veterinarioId;
    private String veterinarioNombre;
}

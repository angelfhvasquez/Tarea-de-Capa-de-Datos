package com.petcenter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetDTO {
    private Long id;
    private String nombre;
    private String especie;
    private String raza;
    private LocalDate fechaNacimiento;
    private Double peso;
    private String color;
    private String notas;
    private LocalDateTime fechaRegistro;
    private LocalDateTime ultimaActualizacion;
    private Long propietarioId;
    private String propietarioNombre;
}

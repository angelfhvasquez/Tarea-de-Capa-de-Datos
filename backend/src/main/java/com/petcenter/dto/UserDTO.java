package com.petcenter.dto;

import com.petcenter.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String password;
    private Role role;
    private Boolean activo;
    private LocalDateTime fechaRegistro;
    private LocalDateTime ultimaActualizacion;
}

package com.petcenter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDTO {
    private String token;
    private String tipo;
    private Long id;
    private String email;
    private String nombre;
    private String apellido;
    private String rol;

    public AuthResponseDTO(String token, String email, Long id, String nombre, String apellido, String rol) {
        this.token = token;
        this.tipo = "Bearer";
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.rol = rol;
    }
}

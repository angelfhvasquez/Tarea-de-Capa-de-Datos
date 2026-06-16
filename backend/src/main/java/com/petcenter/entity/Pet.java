package com.petcenter.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de la mascota es requerido")
    @Column(nullable = false)
    private String nombre;

    @NotBlank(message = "La especie es requerida")
    @Column(nullable = false)
    private String especie;

    @NotBlank(message = "La raza es requerida")
    @Column(nullable = false)
    private String raza;

    @Column(nullable = false)
    private LocalDate fechaNacimiento;

    @Column
    private Double peso;

    @Column
    private String color;

    @Column(length = 1000)
    private String notas;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime ultimaActualizacion = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propietario_id", nullable = false)
    private User propietario;

    @OneToMany(mappedBy = "mascota", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Appointment> citas = new HashSet<>();

    @PreUpdate
    protected void onUpdate() {
        this.ultimaActualizacion = LocalDateTime.now();
    }
}

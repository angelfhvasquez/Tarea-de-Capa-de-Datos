package com.petcenter.repository;

import com.petcenter.entity.Appointment;
import com.petcenter.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUsuarioId(Long usuarioId);
    List<Appointment> findByMascotaId(Long mascotaId);
    List<Appointment> findByVeterinarioId(Long veterinarioId);
    List<Appointment> findByEstado(AppointmentStatus estado);
    List<Appointment> findByFechaHoraBetween(LocalDateTime inicio, LocalDateTime fin);
}

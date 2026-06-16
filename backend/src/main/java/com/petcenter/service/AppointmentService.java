package com.petcenter.service;

import com.petcenter.dto.AppointmentDTO;
import com.petcenter.entity.*;
import com.petcenter.repository.AppointmentRepository;
import com.petcenter.repository.PetRepository;
import com.petcenter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final ModelMapper modelMapper;

    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        User usuario = userRepository.findById(appointmentDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Pet mascota = petRepository.findById(appointmentDTO.getMascotaId())
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        Appointment appointment = modelMapper.map(appointmentDTO, Appointment.class);
        appointment.setUsuario(usuario);
        appointment.setMascota(mascota);
        appointment.setEstado(AppointmentStatus.PROGRAMADA);

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return mapToDTO(savedAppointment);
    }

    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        appointment.setFechaHora(appointmentDTO.getFechaHora());
        appointment.setRazon(appointmentDTO.getRazon());
        appointment.setDiagnostico(appointmentDTO.getDiagnostico());
        appointment.setTratamiento(appointmentDTO.getTratamiento());

        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return mapToDTO(updatedAppointment);
    }

    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        return mapToDTO(appointment);
    }

    public List<AppointmentDTO> getAppointmentsByUsuario(Long usuarioId) {
        return appointmentRepository.findByUsuarioId(usuarioId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<AppointmentDTO> getAppointmentsByVeterinario(Long veterinarioId) {
        return appointmentRepository.findByVeterinarioId(veterinarioId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AppointmentDTO confirmAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        appointment.setEstado(AppointmentStatus.CONFIRMADA);
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return mapToDTO(updatedAppointment);
    }

    public AppointmentDTO assignVeterinario(Long id, Long veterinarioId) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        User veterinario = userRepository.findById(veterinarioId)
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));

        if (veterinario.getRole() != Role.VETERINARIO) {
            throw new IllegalArgumentException("El usuario no es veterinario");
        }

        appointment.setVeterinario(veterinario);
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return mapToDTO(updatedAppointment);
    }

    public AppointmentDTO rescheduleAppointment(Long id, LocalDateTime newDateTime) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        appointment.setFechaHora(newDateTime);
        appointment.setEstado(AppointmentStatus.REPROGRAMADA);

        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return mapToDTO(updatedAppointment);
    }

    public void cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        appointment.setEstado(AppointmentStatus.CANCELADA);
        appointmentRepository.save(appointment);
    }

    public List<AppointmentDTO> getAvailableAppointments() {
        return appointmentRepository.findByEstado(AppointmentStatus.PROGRAMADA).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AppointmentDTO mapToDTO(Appointment appointment) {
        AppointmentDTO dto = modelMapper.map(appointment, AppointmentDTO.class);
        if (appointment.getUsuario() != null) {
            dto.setUsuarioId(appointment.getUsuario().getId());
            dto.setUsuarioNombre(appointment.getUsuario().getNombre() + " " + appointment.getUsuario().getApellido());
        }
        if (appointment.getMascota() != null) {
            dto.setMascotaId(appointment.getMascota().getId());
            dto.setMascotaNombre(appointment.getMascota().getNombre());
        }
        if (appointment.getVeterinario() != null) {
            dto.setVeterinarioId(appointment.getVeterinario().getId());
            dto.setVeterinarioNombre(appointment.getVeterinario().getNombre() + " " + appointment.getVeterinario().getApellido());
        }
        return dto;
    }
}

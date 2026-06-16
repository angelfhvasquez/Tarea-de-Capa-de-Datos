package com.petcenter.controller;

import com.petcenter.dto.AppointmentDTO;
import com.petcenter.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO createdAppointment = appointmentService.createAppointment(appointmentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAppointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDTO> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO updatedAppointment = appointmentService.updateAppointment(id, appointmentDTO);
        return ResponseEntity.ok(updatedAppointment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Long id) {
        AppointmentDTO appointment = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointment);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByUsuario(@PathVariable Long usuarioId) {
        List<AppointmentDTO> appointments = appointmentService.getAppointmentsByUsuario(usuarioId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/veterinario/{veterinarioId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByVeterinario(@PathVariable Long veterinarioId) {
        List<AppointmentDTO> appointments = appointmentService.getAppointmentsByVeterinario(veterinarioId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<AppointmentDTO> confirmAppointment(@PathVariable Long id) {
        AppointmentDTO appointment = appointmentService.confirmAppointment(id);
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{id}/assign-veterinario/{veterinarioId}")
    public ResponseEntity<AppointmentDTO> assignVeterinario(@PathVariable Long id, @PathVariable Long veterinarioId) {
        AppointmentDTO appointment = appointmentService.assignVeterinario(id, veterinarioId);
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{id}/reschedule")
    public ResponseEntity<AppointmentDTO> rescheduleAppointment(
            @PathVariable Long id,
            @RequestParam LocalDateTime newDateTime) {
        AppointmentDTO appointment = appointmentService.rescheduleAppointment(id, newDateTime);
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/available")
    public ResponseEntity<List<AppointmentDTO>> getAvailableAppointments() {
        List<AppointmentDTO> appointments = appointmentService.getAvailableAppointments();
        return ResponseEntity.ok(appointments);
    }
}

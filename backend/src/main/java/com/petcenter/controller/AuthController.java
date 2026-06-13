package com.petcenter.controller;

import com.petcenter.dto.AuthResponseDTO;
import com.petcenter.dto.LoginDTO;
import com.petcenter.dto.UserDTO;
import com.petcenter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody UserDTO userDTO) {
        AuthResponseDTO response = userService.register(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/register-admin")
    public ResponseEntity<AuthResponseDTO> registerAdmin(@RequestBody UserDTO userDTO) {
        AuthResponseDTO response = userService.registerAdmin(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        AuthResponseDTO response = userService.login(loginDTO);
        return ResponseEntity.ok(response);
    }
}

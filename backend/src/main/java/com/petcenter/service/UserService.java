package com.petcenter.service;

import com.petcenter.dto.AuthResponseDTO;
import com.petcenter.dto.LoginDTO;
import com.petcenter.dto.UserDTO;
import com.petcenter.entity.Role;
import com.petcenter.entity.User;
import com.petcenter.repository.UserRepository;
import com.petcenter.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final ModelMapper modelMapper;

    public AuthResponseDTO register(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(Role.CLIENTE);
        user.setActivo(true);
        user.setFechaRegistro(LocalDateTime.now());
        user.setUltimaActualizacion(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getEmail(), savedUser.getRole().name());

        return new AuthResponseDTO(token, savedUser.getEmail(), savedUser.getId(),
                savedUser.getNombre(), savedUser.getApellido(), savedUser.getRole().name());
    }

    public AuthResponseDTO registerAdmin(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(Role.ADMIN);
        user.setActivo(true);
        user.setFechaRegistro(LocalDateTime.now());
        user.setUltimaActualizacion(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getEmail(), savedUser.getRole().name());

        return new AuthResponseDTO(token, savedUser.getEmail(), savedUser.getId(),
                savedUser.getNombre(), savedUser.getApellido(), savedUser.getRole().name());
    }

    public AuthResponseDTO login(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email o contraseña incorrectos"));

        if (!user.getActivo()) {
            throw new IllegalArgumentException("Usuario inactivo");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Email o contraseña incorrectos");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponseDTO(token, user.getEmail(), user.getId(),
                user.getNombre(), user.getApellido(), user.getRole().name());
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return modelMapper.map(user, UserDTO.class);
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return modelMapper.map(user, UserDTO.class);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public List<UserDTO> getUsersByRole(Role role) {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == role)
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setNombre(userDTO.getNombre());
        user.setApellido(userDTO.getApellido());
        user.setTelefono(userDTO.getTelefono());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setActivo(false);
        userRepository.save(user);
    }

    public void changeRole(Long id, Role role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setRole(role);
        userRepository.save(user);
    }
}

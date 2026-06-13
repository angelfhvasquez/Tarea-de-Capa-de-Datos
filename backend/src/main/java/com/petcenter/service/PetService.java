package com.petcenter.service;

import com.petcenter.dto.PetDTO;
import com.petcenter.entity.Pet;
import com.petcenter.entity.User;
import com.petcenter.repository.PetRepository;
import com.petcenter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public PetDTO createPet(PetDTO petDTO) {
        User propietario = userRepository.findById(petDTO.getPropietarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Pet pet = modelMapper.map(petDTO, Pet.class);
        pet.setPropietario(propietario);

        Pet savedPet = petRepository.save(pet);
        return mapToDTO(savedPet);
    }

    public PetDTO updatePet(Long id, PetDTO petDTO) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        pet.setNombre(petDTO.getNombre());
        pet.setEspecie(petDTO.getEspecie());
        pet.setRaza(petDTO.getRaza());
        pet.setFechaNacimiento(petDTO.getFechaNacimiento());
        pet.setPeso(petDTO.getPeso());
        pet.setColor(petDTO.getColor());
        pet.setNotas(petDTO.getNotas());

        Pet updatedPet = petRepository.save(pet);
        return mapToDTO(updatedPet);
    }

    public PetDTO getPetById(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        return mapToDTO(pet);
    }

    public List<PetDTO> getPetsByPropietario(Long propietarioId) {
        return petRepository.findByPropietarioId(propietarioId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PetDTO> getAllPets() {
        return petRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }

    private PetDTO mapToDTO(Pet pet) {
        PetDTO dto = modelMapper.map(pet, PetDTO.class);
        if (pet.getPropietario() != null) {
            dto.setPropietarioId(pet.getPropietario().getId());
            dto.setPropietarioNombre(pet.getPropietario().getNombre() + " " + pet.getPropietario().getApellido());
        }
        return dto;
    }
}

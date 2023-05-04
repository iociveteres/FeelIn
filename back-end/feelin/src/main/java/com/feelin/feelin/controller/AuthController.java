package com.feelin.feelin.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.feelin.feelin.jwt.JwtUtils;
import com.feelin.feelin.model.Doctor;
import com.feelin.feelin.model.Patient;
import com.feelin.feelin.model.Role;
import com.feelin.feelin.model.User;
import com.feelin.feelin.model.enums.ERole;
import com.feelin.feelin.payload.request.LoginRequest;
import com.feelin.feelin.payload.request.SignupRequest;
import com.feelin.feelin.payload.response.JwtResponse;
import com.feelin.feelin.payload.response.MessageResponse;
import com.feelin.feelin.repo.DoctorRepo;
import com.feelin.feelin.repo.PatientRepo;
import com.feelin.feelin.repo.RoleRepo;
import com.feelin.feelin.repo.UserRepo;
import com.feelin.feelin.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    PatientRepo patientRepository;

    @Autowired
    DoctorRepo doctorRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        AtomicBoolean isDoctor = new AtomicBoolean(false);
        AtomicBoolean isPatient = new AtomicBoolean(false);

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "doctor":
                        if (isPatient.get())
                            throw new RuntimeException("Error: Already is a patient.");
                        isDoctor.set(true);
                        Role doctorRole = roleRepository.findByName(ERole.ROLE_DOCTOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(doctorRole);

                        break;
                    case "patient":
                        if (isDoctor.get())
                            throw new RuntimeException("Error: Already is a doctor.");
                        isPatient.set(true);
                        Role patientRole = roleRepository.findByName(ERole.ROLE_PATIENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(patientRole);

                        break;
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        if (isPatient.get()) {
            Patient patient = new Patient();
            patient.setPatientId(user.getId());
            patient.setFirstName(signUpRequest.getFirstName());
            patient.setLastName(signUpRequest.getLastName());
            patient.setSurname(signUpRequest.getSurname());
            patient.setMale(signUpRequest.getMale());
            patient.setContactNumber(signUpRequest.getContactNumber());
            patient.setDateOfBirth(signUpRequest.getDateOfBirth());
            patient.setPolyclinicId(signUpRequest.getPolyclinicId());
            patientRepository.save(patient);
        } else {
            Doctor doctor = new Doctor();
            doctor.setDoctorId(user.getId());
            doctor.setFirstName(signUpRequest.getFirstName());
            doctor.setLastName(signUpRequest.getLastName());
            doctor.setSurname(signUpRequest.getSurname());
            doctor.setContactNumber(signUpRequest.getContactNumber());
            doctor.setCabinetNumber(signUpRequest.getCabinetNumber());
            doctor.setSpecialization(signUpRequest.getSpecialization());
            doctor.setPolyclinicId(signUpRequest.getPolyclinicId());
            doctorRepository.save(doctor);
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}

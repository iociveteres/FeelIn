package com.feelin.feelin.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.validation.constraints.*;

@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private Set<String> role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(max = 50)
    private String firstName;
    @NotBlank
    @Size(max = 50)
    private String lastName;
    @NotBlank
    @Size(max = 50)
    private String surname;
    @NotBlank
    @Size(max = 50)
    private String contactNumber;
    @NotBlank
    @Size(max = 50)
    private int polyclinicId;

    // specifically for patient
    @Size(max = 50)
    private String male; // means sex
    @Size(max = 50)
    private LocalDateTime dateOfBirth;

    // specifically for doctor
    @Size(max = 50)
    private int cabinetNumber;
    @Size(max = 50)
    private String specialization;

}


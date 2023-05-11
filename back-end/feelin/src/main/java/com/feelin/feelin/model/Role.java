package com.feelin.feelin.model;

import com.feelin.feelin.model.enums.ERole;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    public Role() {

    }

    public Role(ERole name) {
        this.name = name;
    }
}

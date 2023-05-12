package com.feelin.feelin.controller;

import com.feelin.feelin.model.Status;
import com.feelin.feelin.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value="status")
public class StatusController {
    @Autowired
    private StatusService statusService;
    @Autowired
    MessageSource messages;
    @GetMapping(value="/{patientId}")
    public ResponseEntity<Status> getStatus(
            @PathVariable("patientId") int patientId) {
        Status status = statusService.getStatus(patientId);

        status.add(linkTo(methodOn(StatusController.class)
                        .getStatus(patientId))
                        .withSelfRel());
        return ResponseEntity.ok(status);
    }
}

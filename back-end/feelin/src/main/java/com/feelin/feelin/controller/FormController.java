package com.feelin.feelin.controller;

import com.feelin.feelin.model.Form;
import com.feelin.feelin.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Locale;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping(value="form")
public class FormController {
    @Autowired
    private FormService FormService;
    @Autowired
    MessageSource messages;
    @GetMapping(value="/{patientId}")
    public ResponseEntity<ArrayList<Form>> getForm(
            @PathVariable("patientId") int patientId,
            @RequestHeader(value = "Accept-Language", required = false, defaultValue = "en")
            Locale locale) {
        ArrayList<Form> Form = FormService.getForm(patientId);

//        Form.add(linkTo(methodOn(FormController.class)
//                        .getForm(patientId, locale))
//                        .withSelfRel(),
//                linkTo(methodOn(FormController.class)
//                        .createForm(Form, locale))
//                        .withRel(messages.getMessage("form.urlcreate.message", null, locale)),
//                linkTo(methodOn(FormController.class)
//                        .updateForm(patientId, Form, null))
//                        .withRel(messages.getMessage("form.urlupdate.message", null, locale)),
//                linkTo(methodOn(FormController.class)
//                        .deleteForm(patientId, Form,null))
//                        .withRel(messages.getMessage("form.urldelete.message", null, locale)));
        return ResponseEntity.ok(Form);
    }
    @PostMapping("/addForm")
    public ResponseEntity<String> createForm(
            @RequestBody Form request,
            @RequestHeader(value = "Accept-Language", required = false, defaultValue = "en")
            Locale locale) {
        return ResponseEntity.ok(FormService.createForm(request, locale));
    }

    @PutMapping(value="/{patientId}")
    public ResponseEntity<Form> updateForm(
            @PathVariable("patientId") int patientId,
            @RequestBody Form request,
            @RequestHeader(value = "Accept-Language", required = false, defaultValue = "en")
            Locale locale) {
        Form updatedForm = FormService.updateForm(request, patientId, locale);
        return ResponseEntity.ok(updatedForm);
    }

    @DeleteMapping(value="/{patientId}")
    public ResponseEntity<String> deleteForm(
            @PathVariable("patientId") int patientId,
            @RequestBody Form request,
            @RequestHeader(value = "Accept-Language", required = false, defaultValue = "en")
            Locale locale)
    {
        String response = FormService.deleteForm(request, patientId, locale);
        return ResponseEntity.ok(response);
    }
}

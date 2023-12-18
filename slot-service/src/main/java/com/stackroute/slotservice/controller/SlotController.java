package com.stackroute.slotservice.controller;

import com.stackroute.slotservice.model.BookingSlot;
import com.stackroute.slotservice.model.Slot;
import com.stackroute.slotservice.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate; // Import RestTemplate
import org.springframework.core.ParameterizedTypeReference; // Import ParameterizedTypeReference

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/slots")
public class SlotController {

    private final SlotService slotService;
    private final RestTemplate restTemplate; 

    @Autowired
    public SlotController(SlotService slotService, RestTemplate restTemplate) {
        this.slotService = slotService;
        this.restTemplate = restTemplate; 
    }

    @GetMapping
    public List<Slot> getAll() {
        return slotService.getAll();
    }

    @GetMapping("/fetch-slots/{productId}")
    public ResponseEntity<List<BookingSlot>> fetchSlotsFromFirstProject(@PathVariable String productId) {
        String firstProjectUrl = "http://localhost:8093/products/" + productId + "/slots";

        ResponseEntity<List<BookingSlot>> response = restTemplate.exchange(
            firstProjectUrl,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<BookingSlot>>() {} 
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            List<BookingSlot> slotsFromFirstProject = response.getBody();
            return ResponseEntity.ok(slotsFromFirstProject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Other methods...
}


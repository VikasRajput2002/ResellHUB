package com.stackroute.slotservice.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.stackroute.slotservice.dto.SlotDTO;
import com.stackroute.slotservice.model.Slot;
import com.stackroute.slotservice.repository.SlotRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.core.ParameterizedTypeReference;

import java.util.List;
import java.util.Collections;
import java.util.ArrayList;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class SlotServiceImpl implements SlotService {

    @Autowired
    private SlotRepository slotRepository;

    @Value("${product.service.url}")
    private String productServiceUrl;

    private final RestTemplate restTemplate;

    public SlotServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<SlotDTO> getAllFromProductService() {
        ResponseEntity<List<SlotDTO>> response = restTemplate.exchange(
            productServiceUrl + "/products",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<SlotDTO>>() {}
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            // Handle error response
            return Collections.emptyList();
        }
    }

    private Slot mapToSlot(SlotDTO slotDTO) {
        Slot slot = new Slot();
        slot.setId(slotDTO.getId());
        slot.setProductName(slotDTO.getProductName());
        slot.setProductCategory(slotDTO.getProductCategory());
        slot.setProductDesc(slotDTO.getProductDesc());
        slot.setProductImg(slotDTO.getProductImg());
        slot.setLocation(slotDTO.getLocation());
        slot.setProductPrice(slotDTO.getProductPrice());
        slot.setUserId(slotDTO.getUserId());
        slot.setName(slotDTO.getName());
        return slot;
    }

    @Override
    public List<Slot> getAll() {
        List<SlotDTO> slotDTOs = getAllFromProductService();
        List<Slot> slots = new ArrayList<>();

        for (SlotDTO slotDTO : slotDTOs) {
            Slot slot = mapToSlot(slotDTO);
            slots.add(slot);

            // Save the Slot object to MongoDB using the repository
            slotRepository.save(slot);
        }

        return slots;
    }
    
    
}


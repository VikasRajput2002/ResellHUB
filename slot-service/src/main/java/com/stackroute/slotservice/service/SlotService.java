package com.stackroute.slotservice.service;
import com.stackroute.slotservice.dto.SlotDTO;
import com.stackroute.slotservice.model.Slot;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface SlotService {
    List<Slot> getAll();
   
}

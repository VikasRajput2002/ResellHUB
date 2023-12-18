package com.stackroute.slotservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.stackroute.slotservice.model.*;



import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface SlotRepository extends MongoRepository<Slot, String> {
    // Custom query method to find slots by date, start time, and end time
}

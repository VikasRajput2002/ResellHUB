package com.stackroute.chatservice.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.stackroute.chatservice.model.*;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(String senderId, String recipientId);
}
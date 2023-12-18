package com.stackroute.chatservice.repository;

import com.stackroute.chatservice.model.*;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Document(collection = "custom_chat")
public interface ChatMessageRepository
        extends MongoRepository<ChatMessage, String> {

    long countBySenderIdAndRecipientIdAndStatus(
            String senderId, String recipientId, MessageStatus status);

    List<ChatMessage> findByChatId(String chatId);
    
    List<ChatMessage> findBySenderIdAndRecipientIdAndStatus(
            String senderId, String recipientId, MessageStatus status);
    
 List<ChatMessage> findBySenderId(String senderId);
    
    List<ChatMessage> findByRecipientId(String recipientId);
}
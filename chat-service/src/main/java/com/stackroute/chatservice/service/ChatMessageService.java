package com.stackroute.chatservice.service;

import com.stackroute.chatservice.model.*;
import com.stackroute.chatservice.repository.*;
import com.stackroute.chatservice.exception.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ChatMessageService {
    @Autowired private ChatMessageRepository repository;
    @Autowired private ChatRoomService chatRoomService;
    @Autowired private MongoOperations mongoOperations;

    public ChatMessage save(ChatMessage chatMessage) {
        chatMessage.setStatus(MessageStatus.SENT);
        repository.save(chatMessage);
        return chatMessage;
    }

    public long countNewMessages(String senderId, String recipientId) {
        return repository.countBySenderIdAndRecipientIdAndStatus(
                senderId, recipientId, MessageStatus.SENT);
    }

    public List<ChatMessage> findChatMessages(String senderId, String recipientId) {
        var chatId = chatRoomService.getChatId(senderId, recipientId, false);

        var messages =
                chatId.map(cId -> repository.findByChatId(cId)).orElse(new ArrayList<>());

        if(messages.size() > 0) {
            updateStatuses(senderId, recipientId, MessageStatus.SENT);
        }

        return messages;
    }
    
    public List<ChatMessage> findChatMessagesByChatId(String chatId) {
        return repository.findByChatId(chatId);
    }


    public ChatMessage findById(String id) {
        return repository
                .findById(id)
                .map(chatMessage -> {
                    chatMessage.setStatus(MessageStatus.SENT);
                    return repository.save(chatMessage);
                })
                .orElseThrow(() ->
                        new ResourceNotFoundException("can't find message (" + id + ")"));
    }

    public void updateStatuses(String senderId, String recipientId, MessageStatus status) {
        Query query = new Query(
                Criteria
                        .where("senderId").is(senderId)
                        .and("recipientId").is(recipientId));
        Update update = Update.update("status", status);
        mongoOperations.updateMulti(query, update, ChatMessage.class);
    }
    
    public List<ChatMessage> findDeliveredMessages(String senderId, String recipientId) {
        return repository.findBySenderIdAndRecipientIdAndStatus(senderId, recipientId, MessageStatus.SENT);
    }

    public void updateMessageStatus(List<ChatMessage> messages, MessageStatus newStatus) {
        messages.forEach(message -> {
            message.setStatus(newStatus);
            repository.save(message);
        });
    }
    

    public List<String> findRecipientIdsForUser(String userId) {
        Set<String> recipientIdsSet = new HashSet<>(); 
        
        
        List<ChatMessage> receivedMessages = repository.findByRecipientId(userId);

        
        List<ChatMessage> sentMessages = repository.findBySenderId(userId);

        
        for (ChatMessage message : receivedMessages) {
            recipientIdsSet.add(message.getSenderId());
        }

        
        for (ChatMessage message : sentMessages) {
            recipientIdsSet.add(message.getRecipientId());
        }

        
        List<String> recipientIds = new ArrayList<>(recipientIdsSet);
        
        return recipientIds;
    }
    
  
}
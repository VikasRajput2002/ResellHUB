package com.stackroute.chatservice.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.stackroute.chatservice.model.*;
import com.stackroute.chatservice.service.*;

@Controller
@RequestMapping("/chats")
public class ChatController {
	
    @Autowired private ChatMessageService chatMessageService;
    @Autowired private ChatRoomService chatRoomService;


   

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        var chatId = chatRoomService
                .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);
        chatMessage.setChatId(chatId.get());

   }

    @GetMapping("/messages/chat/{senderId}/{recipientId}/count")
    public ResponseEntity<Long> countNewMessages(
            @PathVariable String senderId,
            @PathVariable String recipientId) {

        return ResponseEntity
                .ok(chatMessageService.countNewMessages(senderId, recipientId));
    }
    
    @GetMapping("/messages/{chatId}")
    public ResponseEntity<?> findChatMessagesByChatId(@PathVariable String chatId) {
        return ResponseEntity.ok(chatMessageService.findChatMessagesByChatId(chatId));
    }


    @GetMapping("/messages/chat/{senderId}/{recipientId}")
    public ResponseEntity<?> findChatMessages ( @PathVariable String senderId,
                                                @PathVariable String recipientId) {
        return ResponseEntity
                .ok(chatMessageService.findChatMessages(senderId, recipientId));
    }

    @GetMapping("/messages/chat/{id}")
    public ResponseEntity<?> findMessage ( @PathVariable String id) {
        return ResponseEntity
                .ok(chatMessageService.findById(id));
    }
    
    @PostMapping("/messages")
    public ResponseEntity<?> sendMessage(@RequestBody ChatMessage chatMessage) {
        try {
            
            Optional<String> chatId = chatRoomService.getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);

            if (chatId.isPresent()) {
                chatMessage.setChatId(chatId.get());
                chatMessage.setTimestamp(new Date());
                chatMessage.setStatus(MessageStatus.SENT);

                ChatMessage savedMessage = chatMessageService.save(chatMessage);

                return ResponseEntity.ok(savedMessage);
            } else {
                return ResponseEntity.badRequest().body("Failed to create a chat for the sender and recipient.");
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Message sending failed: " + ex.getMessage());
        }
    }

    
    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessage>> receiveMessages(
            @PathVariable String senderId,
            @PathVariable String recipientId) {
        List<ChatMessage> deliveredMessages = chatMessageService.findDeliveredMessages(senderId, recipientId);


        chatMessageService.updateMessageStatus(deliveredMessages, MessageStatus.RECEIVED);

        return ResponseEntity.ok(deliveredMessages);
    }
    
   
    @GetMapping("/messages/sent-to/{userId}")
    public ResponseEntity<List<String>> getRecipientIdsForUser(@PathVariable String userId) {
        try {
            List<String> recipientIds = chatMessageService.findRecipientIdsForUser(userId);

            return ResponseEntity.ok(recipientIds);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
    }
    }
    }



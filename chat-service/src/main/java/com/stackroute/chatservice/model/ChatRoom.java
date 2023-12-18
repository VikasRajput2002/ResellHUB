package com.stackroute.chatservice.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class ChatRoom {
    @Id
    private String id;
    private String chatId;
    private String senderId;
    private String recipientId;

		public static Builder builder() {
            return new Builder();
        }
        public static class Builder {
            private ChatRoom chatRoom = new ChatRoom();

            public Builder chatId(String chatId) {
                chatRoom.chatId = chatId;
                return this;
            }

            public Builder senderId(String senderId) {
                chatRoom.senderId = senderId;
                return this;
            }

            public Builder recipientId(String recipientId) {
                chatRoom.recipientId = recipientId;
                return this;
            }

            public ChatRoom build() {
                return chatRoom;
            }
        }
    }
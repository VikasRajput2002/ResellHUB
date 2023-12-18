package com.stackroute.userservice.model;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
    @Id
    private String userId = UUID.randomUUID().toString();
    
    private String name;
    private String email;
    private Long mobile;
    private String gender;
    private String password;
    private String description;
    private String address;
    private byte[] profileImage; 

}

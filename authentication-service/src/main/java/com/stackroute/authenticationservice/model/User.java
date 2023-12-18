package com.stackroute.authenticationservice.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="users")
public class User {
	@Id
	private String userId = UUID.randomUUID().toString();
	private String email;
	private String name;
	private Long mobile;
	private String password;
	private String address;
}

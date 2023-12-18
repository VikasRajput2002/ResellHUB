package com.stackroute.authenticationservice.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="authrequest")
public class AuthRequest {
	@Id
	private String email;
	private String password;
}

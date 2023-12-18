package com.stackroute.authenticationservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stackroute.authenticationservice.model.User;

@Service
public interface UserService {
	public User addUser(User user);
	public List<User> getUsers();
	public User getUserByEmailAndMobile(String email,Long mobile);
	public User resetPassword(User user);
	public User deleteUser(String userId);
	public User updateUser(User user);
	public User getUserByEmailAndPassword(String email, String password);
	
	
	

}

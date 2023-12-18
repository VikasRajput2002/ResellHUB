package com.stackroute.authenticationservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository repository;

	@Override
	public List<User> getUsers() {
		return repository.findAll();
	}

	@Override
	public User addUser(User user) {
		return repository.save(user);
	}

	@Override
	public User getUserByEmailAndMobile(String email, Long mobile) {
		return repository.findByEmailAndMobile(email, mobile);
	}

	@Override
	public User resetPassword(User user) {
		User getUser= repository.findByEmail(user.getEmail());
		getUser.setPassword(user.getPassword());
		repository.save(getUser);
		return getUser;
	}

	@Override
	public User deleteUser(String userId) {
		Optional<User> getUser = repository.findById(userId);
		if(getUser.isPresent()) {
			repository.delete(getUser.get());
		}
		return getUser.get();
	}

	@Override
	public User getUserByEmailAndPassword(String email, String password) {
		return repository.findByEmailAndPassword(email, password);
	}

	@Override
	public User updateUser(User user) {
		User getUser = repository.findByEmailAndMobile(user.getEmail(), user.getMobile());
		if(getUser  == null) return getUser;
		return repository.save(getUser);
	}

}

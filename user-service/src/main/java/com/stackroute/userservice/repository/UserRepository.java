package com.stackroute.userservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.userservice.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
	public User findByEmailAndPassword(String email,String password);
	public User findByEmailAndMobile(String email,Long mobile);

}


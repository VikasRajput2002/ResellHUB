package com.stackroute.authenticationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.authenticationservice.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	public User findByEmail(String email);
	public User findByEmailAndPassword(String email, String password);
	public User findByEmailAndMobile(String emali,Long mobile);

}

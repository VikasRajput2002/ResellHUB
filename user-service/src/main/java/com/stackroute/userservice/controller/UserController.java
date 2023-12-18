package com.stackroute.userservice.controller;

import java.io.IOException;
import java.util.List;

import com.stackroute.emailservice.service.EmailSenderService;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.amqp.RabbitTemplateConfigurer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import com.stackroute.userservice.UserServiceApplication;
import com.stackroute.userservice.exception.UserNotFound;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserService;


@CrossOrigin
@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    UserService service;

    @Autowired
    RabbitTemplate rabbitTemplate;

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
    	
        rabbitTemplate.convertAndSend(UserServiceApplication.exchange, UserServiceApplication.routingKey, user);
        return new ResponseEntity<User>(service.addUser(user), HttpStatus.CREATED);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> addUserWithProfileImage(
            @RequestPart("profileImage") MultipartFile profileImage,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("mobile") Long mobile,
            @RequestParam("gender") String gender,
            @RequestParam("password") String password,
            @RequestParam("description") String description,
            @RequestParam("address") String address
    ) {
        try {
            byte[] profileImageBytes = profileImage.getBytes();

            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setMobile(mobile);
            user.setGender(gender);
            user.setPassword(password);
            user.setDescription(description);
            user.setAddress(address);
            user.setProfileImage(profileImageBytes);

            User savedUser = service.addUser(user);

            return new ResponseEntity<User>(savedUser, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
 
	@GetMapping("{email}/{password}")
	public ResponseEntity<User> getUserByEmailPassword(@PathVariable String email, @PathVariable String password)
	{
		
		return new ResponseEntity<User>(service.getUserByEmailPassword(email, password), HttpStatus.OK);
	}

    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User getUser = service.getUserById(id);
        if (getUser == null) throw new UserNotFound("User not found");
        return new ResponseEntity<User>(getUser, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<List<User>>(service.getUsers(), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<User> deleteUser(@PathVariable String id) {
    	rabbitTemplate.convertAndSend(UserServiceApplication.exchange,UserServiceApplication.routingKey,id);
		return new ResponseEntity<User>(service.deletePlayer(id),HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<User> updateUserWithProfileImage(
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam("name") String name,
            @RequestParam("mobile") Long mobile,
            @RequestParam("gender") String gender,
            @RequestParam("address") String address,
            @PathVariable String id
    ) {
        try {
            User existingUser = service.getUserById(id);
            if (existingUser == null) {
                throw new UserNotFound("User not found");
            }

            byte[] profileImageBytes = profileImage != null ? profileImage.getBytes() : null;

            User updatedUser = new User();
            updatedUser.setName(name);
            updatedUser.setMobile(mobile);
            updatedUser.setGender(gender);
            updatedUser.setAddress(address);
            updatedUser.setProfileImage(profileImageBytes);
            User result = service.updateUserWithProfileImage(id, updatedUser);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping
	public ResponseEntity<User> updateUser(@RequestBody User user)
	{
		rabbitTemplate.convertAndSend(UserServiceApplication.exchange,UserServiceApplication.routingKey,user);
		return new ResponseEntity<User>(service.updateUser(user),HttpStatus.ACCEPTED);
	}

    @GetMapping("{id}/profile")
    public ResponseEntity<User> getUserProfile(@PathVariable String id) {
        User getUser = service.getUserById(id);
        if (getUser == null) throw new UserNotFound("User not found");
        return new ResponseEntity<User>(getUser, HttpStatus.OK);
    }

    @GetMapping("forgot/{email}/{mobile}")
    public ResponseEntity<User> getUserByEmaiAndlMobile(@PathVariable String email, @PathVariable Long mobile) {
        return new ResponseEntity<User>(service.getUserByEmailMobile(email, mobile), HttpStatus.OK);
    }

    @PutMapping("/send-registration-email")
    public ResponseEntity<User> sendRegistrationEmail(@RequestBody User user) {
        String to = user.getEmail();
        String subject = "Registration Confirmation";
        String message = "Thank you for registering on our website. Welcome!";
        emailSenderService.sendEmail(to, subject, message);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

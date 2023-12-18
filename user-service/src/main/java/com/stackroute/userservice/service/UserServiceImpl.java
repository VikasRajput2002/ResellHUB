package com.stackroute.userservice.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.stackroute.userservice.exception.UserAlreadyExists;
import com.stackroute.userservice.exception.UserNotFound;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository repository;

    @Override
    public User getUserById(String id) {
        Optional<User> getUser = repository.findById(id);
        return getUser.orElse(null);
    }

    @Override
    public User addUser(User user) {
        if (getUserById(user.getUserId()) != null) {
            throw new UserAlreadyExists("User already registered");
        }
        return repository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return repository.findAll();
    }

    @Override
    public User deletePlayer(String id) {
        User user = getUserById(id);
        if (user == null) {
            throw new UserNotFound("User not found");
        }
        repository.delete(user);
        return user;
    }

    @Override
    public User updateUserWithProfileImage(String id, User updatedUser) {
        User existingUser = getUserById(id);
        if (existingUser == null) {
            throw new UserNotFound("User not found");
        }
        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getMobile() != null) {
            existingUser.setMobile(updatedUser.getMobile());
        }
        if (updatedUser.getGender() != null) {
            existingUser.setGender(updatedUser.getGender());
        }
        if (updatedUser.getAddress() != null) {
            existingUser.setAddress(updatedUser.getAddress());
        }
        if (updatedUser.getProfileImage() != null) {
            existingUser.setProfileImage(updatedUser.getProfileImage());
        }
        return repository.save(existingUser);
    }

    @Override
    public User updateProfileImage(String id, MultipartFile profileImage) {
        User existingUser = getUserById(id);
        if (existingUser == null) {
            throw new UserNotFound("User not found");
        }

        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                byte[] profileImageBytes = profileImage.getBytes();
                existingUser.setProfileImage(profileImageBytes);
            } catch (IOException e) {
                throw new RuntimeException("Error updating profile image", e);
            }
        }

        return repository.save(existingUser);
    }

    @Override
    public User getUserByEmailPassword(String email, String password) {
        User getUser = repository.findByEmailAndPassword(email, password);
        if (getUser == null) {
            throw new UserNotFound("User not found");
        }
        return getUser;
    }

    @Override
    public User getUserByEmailMobile(String email, Long mobile) {
        User user = repository.findByEmailAndMobile(email, mobile);
        if (user == null) {
            throw new UserNotFound("User not found");
        }
        return user;
    }

    @Override
	public User updateUser(User user) {
		if(getUserById(user.getUserId()) == null) throw new UserNotFound("user not found");
		return repository.save(user);
	}
}

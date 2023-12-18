package com.stackroute.userservice.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.stackroute.userservice.model.User;

public interface UserService {
    public User getUserById(String id);
    public User addUser(User user);
    public List<User> getUsers();
    public User deletePlayer(String id);
    public User updateUser(User user);
    public User getUserByEmailPassword(String email, String password);
    public User updateUserWithProfileImage(String id, User updatedUser);
    public User updateProfileImage(String id, MultipartFile profileImage);
    public User getUserByEmailMobile(String email, Long mobile);
}
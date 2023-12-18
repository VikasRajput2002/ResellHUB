package com.stackroute.authenticationservice.controller;

import java.util.List;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.authenticationservice.model.AuthRequest;
import com.stackroute.authenticationservice.model.User;
import com.stackroute.authenticationservice.util.JwtUtil;
import com.stackroute.authenticationservice.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("user")
public class UserController {
	
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired 
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
    @RabbitListener(queues = "cgiqueue")
	public void getMsg(User user)
	{
		userService.addUser(user);
	}
    
    @RabbitListener(queues = "cgiqueue")
	public void delMsg(String  userId)
	{
    	userService.deleteUser(userId);
	}
    
    @RabbitListener(queues="cgiqueue")
    public void updateMsg(User user)
    {
    	userService.updateUser(user);
    }
    
    @GetMapping("na/getall")
    public List<User> GetallUsers(){
    	return userService.getUsers();
    }
        
    
    @PostMapping("na/forgot")
    public User forgotPassword(@RequestBody User user)
    {
    	return userService.getUserByEmailAndMobile(user.getEmail(), user.getMobile());
    } 
    
    
    
   
    @PutMapping("reset")
    public User resetPassword(@RequestBody User user){
    	
    	return userService.resetPassword(user);
     } 
   
 
    
    @PostMapping("na/login")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("inavalid username/password");
        }
        String s=jwtUtil.generateToken(authRequest.getEmail());
        return s;
    }
	

}

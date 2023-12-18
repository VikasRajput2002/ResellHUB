package com.stackroute.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(UserNotFound.class)
	public ResponseEntity<String> UserNotExists()
	{
		return new ResponseEntity<String>("User not found",HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(UserAlreadyExists.class)
	public ResponseEntity<String> alreadyExist()
	{
		return new ResponseEntity<String>("User already exists",HttpStatus.CONFLICT);
	}

}

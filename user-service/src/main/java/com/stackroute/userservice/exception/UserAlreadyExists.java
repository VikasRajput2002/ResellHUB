package com.stackroute.userservice.exception;

public class UserAlreadyExists extends RuntimeException {
	public UserAlreadyExists(String msg)
	{
		super(msg);
	}

}

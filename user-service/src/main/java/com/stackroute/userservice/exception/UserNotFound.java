package com.stackroute.userservice.exception;

public class UserNotFound extends RuntimeException{
	public UserNotFound(String msg)
	{
		super(msg);
	}

}

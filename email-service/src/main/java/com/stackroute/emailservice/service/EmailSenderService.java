package com.stackroute.emailservice.service;

public interface EmailSenderService {
    void sendEmail(String to, String subject, String message);
}

package com.stackroute.paymentservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.paymentservice.model.Payment;
import com.stackroute.paymentservice.model.TransactionDetails;
import com.stackroute.paymentservice.rabbit.MessageSender;
import com.stackroute.paymentservice.service.PaymentService;
@CrossOrigin
@RestController
@RequestMapping("/payment")
public class PaymentController {
	@Autowired
	PaymentService paymentService;
	 @Autowired
    private MessageSender messageSender;

    @PostMapping("/send-message")
    public ResponseEntity<String> sendMessage(@RequestBody Object message) {
        messageSender.sendMessage(message);
        return ResponseEntity.ok("Message sent successfully!");
    }

	@GetMapping({"/createTransaction/{amount}"})
	public TransactionDetails createTransaction(@PathVariable double amount) {
		return paymentService.createTransaction(amount);
	}
	
	@PostMapping("/save-payment")
    public ResponseEntity<Payment> savePayment(@RequestBody Payment message) {
		 Payment payment = paymentService.addPayment(message);
         return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }
	
}

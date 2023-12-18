package com.stackroute.paymentservice.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Payment {
	@Id
	private String razorpay_order_id;
	private String razorpay_payment_id;
	private String razorpay_signature;
}

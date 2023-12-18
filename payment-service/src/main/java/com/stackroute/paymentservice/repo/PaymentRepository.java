package com.stackroute.paymentservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.paymentservice.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
	
}

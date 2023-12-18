package com.stackroute.paymentservice.model;



import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.boot.autoconfigure.domain.EntityScan;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TransactionDetails {
	

//	public TransactionDetails(String orderId, String currency, Integer amount, String key) {
//		super();
//		this.orderId = orderId;
//		this.currency = currency;
//		this.amount = amount;
//		this.key = key;
//	}
	@Id
	private String orderId;
	private String currency;
	private Integer amount;
	private String key;

}

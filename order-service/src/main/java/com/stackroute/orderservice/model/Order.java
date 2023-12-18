package com.stackroute.orderservice.model;

//import com.stackroute.productservice.model.Product;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
	 	@Id
	 	private String orderId = UUID.randomUUID().toString();
	    private String userId;
	    private String productId;
	    private String status;
	    private String address;
	    private String amount;
	    private String paymentId;
	    private Date date;
	    private Product product;
}

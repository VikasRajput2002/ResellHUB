package com.stackroute.orderservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.stackroute.orderservice.model.Order;
import com.stackroute.orderservice.model.Product;
import com.stackroute.orderservice.repo.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {
	
	private final RestTemplate restTemplate;
	
	@Autowired
		public OrderServiceImpl(RestTemplate restTemplate) {
		this.restTemplate= restTemplate;
	}
	 @Autowired
	    OrderRepository orderRepository;
	 
	 @Override
	    public Order saveOrder(Order order) {
	    	
	    	String productMicroServiceUrl ="http://localhost:8093/products/"+order.getProductId();
	    	Product product = restTemplate.getForObject(productMicroServiceUrl, Product.class,order.getProductId());
	        order.setProduct(product);
	    	return orderRepository.save(order);
	    	
	    }
	    
	    @Override
	    public Order updateOrderStatus(String orderId, String newStatus) {
	        Order order = orderRepository.findById(orderId).orElse(null);

	        if (order != null) {
	            order.setStatus(newStatus);
	            return orderRepository.save(order);
	        }
	        
	        return null; 
	    }
	    
	    @Override
	    public List<Order> getAllOrdersById(String userId) {
	        return orderRepository.findByUserId(userId);
	    }
	    
	    @Override
	    public Optional<Order> getOrderByorderId(String orderId) {
	    	
	        return orderRepository.findById(orderId);
	    }
	    
}

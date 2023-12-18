package com.stackroute.orderservice.service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.stackroute.orderservice.model.Order;
@Service
public interface OrderService {
	Order saveOrder(Order order);
	
	Order updateOrderStatus(String orderId, String newStatus);
	List<Order> getAllOrdersById(String userId);
	Optional<Order> getOrderByorderId(String orderId);
}

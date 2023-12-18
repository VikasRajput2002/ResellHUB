package com.stackroute.orderservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.orderservice.model.Order;
import com.stackroute.orderservice.repo.OrderRepository;
import com.stackroute.orderservice.service.OrderService;
@CrossOrigin
@RestController
@RequestMapping("orders")
public class OrderController {
	 @Autowired
	  OrderService orderService;
	 @Autowired
	 	OrderRepository orderRepository;
	 
	 @PostMapping("")
	    public ResponseEntity<Order> saveOrder(@RequestBody Order order) {
		 Order savedRest = orderService.saveOrder(order);
	        return new ResponseEntity<Order>(savedRest, HttpStatus.ACCEPTED);
	    }
	  @PutMapping("/{orderId}/update-status")
	    public ResponseEntity<String> updateOrderStatus(
	            @PathVariable String orderId,
	            @RequestBody Order order) {

	        Order updatedOrder = orderService.updateOrderStatus(orderId, order.getStatus());

	        if (updatedOrder != null) {
	            return ResponseEntity.ok("Order status updated successfully.");
	        } else {
	            return ResponseEntity.badRequest().body("Failed to update order status.");
	        }
	    }
	  
	  @GetMapping("/{userId}")
	    public ResponseEntity<List<Order>> getAllOrdersByUserId(@PathVariable String userId) {
	        List<Order> orders = orderService.getAllOrdersById(userId);
	        return ResponseEntity.status(HttpStatus.OK).body(orders);
	    }
	  @GetMapping("/order/{orderId}")
	    public ResponseEntity<Optional<Order>> getOrderByorderId(@PathVariable String orderId) {
	        Optional<Order> order = orderService.getOrderByorderId(orderId);
	        return ResponseEntity.status(HttpStatus.OK).body(order);
	    }

	 
}

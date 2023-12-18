package com.stackroute.orderservice.repo;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.orderservice.model.Order;
@Repository
public interface OrderRepository extends MongoRepository<Order, String>  {
	public List<Order> findByUserId(String userId);

}

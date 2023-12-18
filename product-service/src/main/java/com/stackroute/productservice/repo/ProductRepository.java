package com.stackroute.productservice.repo;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.stackroute.productservice.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
    Optional<Product> findById(String id);
    Optional<Product> getProductById(String id);
    List<Product> findByProductCategory(String productCategory);
    List<Product> findByLocation(String Location);
    List<Product> findByUserId(String userId);

}

package com.stackroute.productservice.service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import com.stackroute.productservice.model.BookingSlot;
import com.stackroute.productservice.model.Product;
public interface ProductService {
    Product createProduct(Product product);
    List<Product> getAllProducts();
    Product updateProduct(String productId, String productName, String productCategory,
                         String productDesc, byte[] productImg, String location,
                         Long productPrice);
    boolean deleteProduct(String productId);
    Optional<Product> getProductById(String productId);
    List<Product> getProductsByCategory(String productCategory);
    List<Product> getProductsByLocation(String location);
    boolean addSlotsToProduct(String productId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime);
    Optional<List<BookingSlot>> viewSlotsOfProduct(String productId);
    boolean bookSlot(String productId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime);
    List<BookingSlot> getAllBookedSlots();
    List<BookingSlot> getBookedSlotsByUserId(String userId);
}

package com.stackroute.productservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.productservice.model.BookingSlot;
import com.stackroute.productservice.model.Product;
import com.stackroute.productservice.repo.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Optional<Product> getProductById(String productId) {
        return productRepository.findById(productId);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product updateProduct(String productId, String productName, String productCategory,
            String productDesc, byte[] productImg, String location, Long productPrice) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setProductName(productName);
            product.setProductCategory(productCategory);
            product.setProductDesc(productDesc);
            product.setProductImg(productImg);
            product.setLocation(location);
            product.setProductPrice(productPrice);
            return productRepository.save(product);
        }
        return null;
    }

    @Override
    public boolean deleteProduct(String productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            productRepository.deleteById(productId);
            return true;
        }
        return false;
    }

    @Override
    public List<Product> getProductsByCategory(String productCategory) {
        return productRepository.findByProductCategory(productCategory);
    }

    @Override
    public List<Product> getProductsByLocation(String location) {
        return productRepository.findByLocation(location);
    }
    // Add slots to a product
    
  //...

    @Override
    public boolean addSlotsToProduct(String productId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            // Check if a slot with the same booking date, start time, and end time already exists
            boolean slotExists = product.getSlots().stream()
                    .anyMatch(slot -> slot.getBookingDate().equals(bookingDate) &&
                            slot.getStartTime().equals(startTime) &&
                            slot.getEndTime().equals(endTime));

            if (slotExists) {
                return false; // Slot already exists
            }

            // Create a new BookingSlot with a unique slot ID
            BookingSlot newSlot = new BookingSlot();
            newSlot.setBookingDate(bookingDate);
            newSlot.setStartTime(startTime);
            newSlot.setEndTime(endTime);

            if (product.getSlots() == null) {
                product.setSlots(new ArrayList<>());
            }

            product.getSlots().add(newSlot);
            productRepository.save(product);
            return true;
        }
        return false;
    }

    @Override
    public boolean bookSlot(String productId, LocalDate bookingDate, LocalTime startTime, LocalTime endTime) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            // Find the slot that matches the bookingDate, startTime, and endTime
            Optional<BookingSlot> matchingSlot = product.getSlots().stream()
                    .filter(slot -> slot.getBookingDate().equals(bookingDate) &&
                            slot.getStartTime().equals(startTime) &&
                            slot.getEndTime().equals(endTime))
                    .findFirst();

            if (matchingSlot.isPresent()) {
                BookingSlot slot = matchingSlot.get();
                
                if (!slot.isBooked()) {
                    // If the slot is not already booked, mark it as booked
                    slot.setBooked(true);

                    // Save the updated product with the booked slot
                    productRepository.save(product);

                    return true;
                } else {
                    // The slot is already booked
                    return false;
                }
            }
        }
        return false;
    }




    // View slots of a product
    
    public Optional<List<BookingSlot>> viewSlotsOfProduct(String productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            List<BookingSlot> slots = product.getSlots();
            return Optional.ofNullable(slots);
        }
        return Optional.empty();
    }

    @Override
    public List<BookingSlot> getAllBookedSlots() {
        List<Product> products = productRepository.findAll();
        List<BookingSlot> bookedSlots = new ArrayList<>();

 

        for (Product product : products) {
            List<BookingSlot> slots = product.getSlots();
            if (slots != null) {
                for (BookingSlot slot : slots) {
                    if (slot.isBooked()) {
                        bookedSlots.add(slot);
                    }
                }
            }
        }

 

        return bookedSlots;
    }
    @Override
public List<BookingSlot> getBookedSlotsByUserId(String userId) {
    List<Product> products = productRepository.findByUserId(userId);
    List<BookingSlot> bookedSlots = new ArrayList<>();

    for (Product product : products) {
        List<BookingSlot> slots = product.getSlots();
        if (slots != null) {
            for (BookingSlot slot : slots) {
                if (slot.isBooked()) {
                    bookedSlots.add(slot);
                }
            }
        }
    }

    return bookedSlots;
}
}

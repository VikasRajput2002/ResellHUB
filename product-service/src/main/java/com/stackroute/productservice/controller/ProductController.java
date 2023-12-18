package com.stackroute.productservice.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



import com.stackroute.productservice.model.BookingSlot;
import com.stackroute.productservice.model.Product;
import com.stackroute.productservice.service.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;


import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @PostMapping
    public ResponseEntity<String> createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("productCategory") String productCategory,
            @RequestParam("productDesc") String productDesc,
            @RequestPart("productImg") MultipartFile productImg,
            @RequestParam("location") String location,
            @RequestParam("productPrice") Long productPrice, 
            @RequestParam("userId") String userId,
            @RequestParam("name") String name) {

        try {

            if (!productImg.isEmpty()) {
                byte[] productImgBytes = productImg.getBytes();

                Product product = new Product();
                product.setProductName(productName);
                product.setProductCategory(productCategory);
                product.setProductDesc(productDesc);
                product.setProductImg(productImgBytes);
                product.setLocation(location);
                product.setProductPrice(productPrice);
                product.setUserId(userId);
                product.setName(name);

        

                productService.createProduct(product);

                return ResponseEntity.ok("Product created successfully");
            } else {
                return ResponseEntity.badRequest().body("No file uploaded.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the uploaded file.");
        }
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable String productId) {
        Optional<Product> product = productService.getProductById(productId);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
   

    @PutMapping("/{productId}")
    public ResponseEntity<String> updateProduct(
            @PathVariable String productId,
            @RequestParam("productName") String productName,
            @RequestParam("productCategory") String productCategory,
            @RequestParam("productDesc") String productDesc,
            @RequestPart("productImg") MultipartFile productImg,
            @RequestParam("location") String location,
            @RequestParam("productPrice") Long productPrice){
        try {
            if (!productImg.isEmpty()) {
                byte[] productImgBytes = productImg.getBytes();
                Product updatedProduct = productService.updateProduct(productId, productName, productCategory,
                        productDesc, productImgBytes, location, productPrice);
                if (updatedProduct != null) {
                    return ResponseEntity.ok("Product updated successfully.");
                } else {
                    return ResponseEntity.notFound().build();
                }
            } else {
                return ResponseEntity.badRequest().body("No file uploaded.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the uploaded file.");
        }
    }
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable String productId) {
        boolean deleted = productService.deleteProduct(productId);
        if (deleted) {
            return ResponseEntity.ok("Product deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Product>> getProductsByLocation(@PathVariable String location) {
        List<Product> products = productService.getProductsByLocation(location);
        if (!products.isEmpty()) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.notFound().build();
        }
        
        
    }@GetMapping("/category/{productCategory}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String productCategory) {
        List<Product> products = productService.getProductsByCategory(productCategory);
        if (!products.isEmpty()) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
@PostMapping("/{productId}/slots")
public ResponseEntity<String> addSlotsToProduct(
        @PathVariable String productId,
        @RequestParam("bookingDate") String bookingDateStr,
        @RequestParam("startTime") String startTimeStr,
        @RequestParam("endTime") String endTimeStr) {

    try {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        LocalDate bookingDate = LocalDate.parse(bookingDateStr, dateFormatter);
        LocalTime startTime = LocalTime.parse(startTimeStr, timeFormatter);
        LocalTime endTime = LocalTime.parse(endTimeStr, timeFormatter);

        boolean slotsAdded = productService.addSlotsToProduct(productId, bookingDate, startTime, endTime);

        if (slotsAdded) {
            return ResponseEntity.ok("Slots added to the product successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error adding slots to the product.");
    }
}


@GetMapping("/{productId}/slots")
public ResponseEntity<List<BookingSlot>> viewSlotsOfProduct(@PathVariable String productId) {
    Optional<List<BookingSlot>> slots = productService.viewSlotsOfProduct(productId);

    if (slots.isPresent()) {
        return ResponseEntity.ok(slots.get());
    } else {
        return ResponseEntity.notFound().build();
    }
}
@PostMapping("/book/{productId}")
public ResponseEntity<String> bookSlot(
        @PathVariable String productId,
        @RequestParam("bookingDate") String bookingDateStr,
        @RequestParam("startTime") String startTimeStr,
        @RequestParam("endTime") String endTimeStr) {

    try {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        LocalDate bookingDate = LocalDate.parse(bookingDateStr, dateFormatter);
        LocalTime startTime = LocalTime.parse(startTimeStr, timeFormatter);
        LocalTime endTime = LocalTime.parse(endTimeStr, timeFormatter);

        boolean slotBooked = productService.bookSlot(productId, bookingDate, startTime, endTime);

        if (slotBooked) {
            // Set the Content-Type header to indicate JSON response
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json");

            // Return a JSON response with a success message
            return ResponseEntity.ok()
                    .headers(headers)
                    .body("{\"message\": \"Slot booked successfully.\"}");
        } else {
            // Set the Content-Type header to indicate JSON response
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", "application/json");

            // Return a JSON response with an error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .headers(headers)
                    .body("{\"error\": \"Slot not available.\"}");
        }
    } catch (Exception e) {
        e.printStackTrace();
        // Set the Content-Type header to indicate JSON response
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        // Return a JSON response with an error message
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .headers(headers)
                .body("{\"error\": \"Error booking the slot.\"}");
    }
}
@GetMapping("/slots/booked")
public ResponseEntity<List<BookingSlot>> getAllBookedSlots() {
    List<BookingSlot> bookedSlots = productService.getAllBookedSlots();
    return ResponseEntity.ok(bookedSlots);
}
@GetMapping("/slots/booked/{userId}")
public ResponseEntity<List<BookingSlot>> getBookedSlotsByUserId(@PathVariable String userId) {
    List<BookingSlot> bookedSlots = productService.getBookedSlotsByUserId(userId);
    return ResponseEntity.ok(bookedSlots);
}

}

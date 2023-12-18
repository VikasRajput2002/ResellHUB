package com.stackroute.productservice.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Document(collection = "products")
public class Product {
    @Id
    private String id = UUID.randomUUID().toString();
    private String productName;
    private String productCategory;
    private String productDesc;
    private byte[] productImg;
    private String location;
    private Long productPrice;
	 private String userId;
    private String name;

    public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
    private List<BookingSlot> slots = new ArrayList<>();
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductCategory() {
		return productCategory;
	}
	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}
	public String getProductDesc() {
		return productDesc;
	}
	public void setProductDesc(String productDesc) {
		this.productDesc = productDesc;
	}
	public byte[] getProductImg() {
		return productImg;
	}
	public void setProductImg(byte[] productImg) {
		this.productImg = productImg;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Long getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(Long productPrice) {
		this.productPrice = productPrice;
	}
	
	
	
	public List<BookingSlot> getSlots() {
		return slots;
	}
	public void setSlots(List<BookingSlot> slots) {
		this.slots = slots;
	}
	@Override
	public String toString() {
		return "Product [id=" + id + ", productName=" + productName + ", productCategory=" + productCategory
				+ ", productDesc=" + productDesc + ", productImg=" + Arrays.toString(productImg) + ", location="
				+ location + ", productPrice=" + productPrice + ", slots=" + slots + "]";
	}

    
    
}

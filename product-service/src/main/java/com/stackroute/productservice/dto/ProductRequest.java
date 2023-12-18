package com.stackroute.productservice.dto;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.stackroute.productservice.model.BookingSlot;

public class ProductRequest {
    private String productName;
    private String productCategory;
    private String productDesc;
    private MultipartFile productImg;
    private String location;
    private Long productPrice;
    private List<BookingSlot> slots = new ArrayList<>(); 
   

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

    public MultipartFile getProductImg() {
        return productImg;
    }

    public void setProductImg(MultipartFile productImg) {
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
		return "ProductRequest [productName=" + productName + ", productCategory=" + productCategory + ", productDesc="
				+ productDesc + ", productImg=" + productImg + ", location=" + location + ", productPrice="
				+ productPrice + ", slots=" + slots + "]";
	}


}
package com.stackroute.productservice.model;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;
public class BookingSlot {
	
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean booked;
	public LocalDate getBookingDate() {
		return bookingDate;
	}
	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}
	public LocalTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}
	public LocalTime getEndTime() {
		return endTime;
	}
	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}
	
	
	
	public boolean isBooked() {
		return booked;
	}
	public void setBooked(boolean booked) {
		this.booked = booked;
	}
	@Override
	public String toString() {
		return "BookingSlot [bookingDate=" + bookingDate + ", startTime=" + startTime + ", endTime=" + endTime
				+ ", booked=" + booked + "]";
	}
}
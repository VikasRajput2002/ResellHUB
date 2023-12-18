package com.stackroute.slotservice.model;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookingSlot {
    private LocalDate bookingDate;
    private LocalTime startTime;
    private LocalTime endTime;
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
	@Override
	public String toString() {
		return "BookingSlot [bookingDate=" + bookingDate + ", startTime=" + startTime + ", endTime=" + endTime + "]";
	}

  
}

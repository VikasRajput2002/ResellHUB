export class BookingSlot {
    bookingDate: string=''; // Change the type to Date or DateTime as needed
    startTime: string=''; // Change the type to Date or DateTime as needed
    endTime: string=''; // Change the type to Date or DateTime as needed
  
    constructor(bookingDate: string, startTime: string, endTime: string) {
      this.bookingDate = bookingDate;
      this.startTime = startTime;
      this.endTime = endTime;
    }
  }
  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; // Import FormBuilder and FormGroup
import { ProductService } from '../add-product/product.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css'],
})
export class AddSlotComponent implements OnInit {
  productId: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  showEndTimeAlert: boolean = false;
  showAlert: boolean = false;
  startTime: string = '';
  endTime: string = '';
  // Define a FormGroup for the form
  slotForm: FormGroup;
  minDate: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder, // Inject FormBuilder
    private datePipe: DatePipe
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    // Initialize the FormGroup with form controls and validators
    this.slotForm = this.formBuilder.group({
      bookingDate: ['', Validators.required],
      startTime: ['', Validators.required], // Default value in "hh:mm" format
      endTime: ['', Validators.required],   // Default value in "hh:mm" format
    });
  }

  ngOnInit() {
    // Get the product ID from the route parameters
    this.productId = this.route.snapshot.paramMap.get('id') || '';
  }
  checkEndTime() {
  const endTimeControl = this.slotForm.get('endTime');
  const startTimeControl = this.slotForm.get('startTime');

  if (endTimeControl && startTimeControl) {
    const endTimeValue = endTimeControl.value;
    const startTimeValue = startTimeControl.value;

    if (endTimeValue && startTimeValue) {
      const endTime = new Date('1970-01-01 ' + endTimeValue);
      const startTime = new Date('1970-01-01 ' + startTimeValue);
      this.showEndTimeAlert = endTime <= startTime;
    }
  }
}

isEndTimeValid(): boolean {
  const startTimeControl = this.slotForm.get('startTime');
  const endTimeControl = this.slotForm.get('endTime');

  if (startTimeControl && endTimeControl && startTimeControl.value && endTimeControl.value) {
    const startTime = new Date('1970-01-01 ' + startTimeControl.value);
    const endTime = new Date('1970-01-01 ' + endTimeControl.value);
    return endTime > startTime;
  }

  return false;
}
  
onSubmit() {
  
  if (!this.isEndTimeValid()) {
   
    alert('End time must be greater than start time');
    return;
  }

 const bookingDate = this.slotForm.value.bookingDate ? this.datePipe.transform(this.slotForm.value.bookingDate, 'yyyy-MM-dd') : '';
  const startTime = this.slotForm.value.startTime ? this.slotForm.value.startTime + '' : '';
  const endTime = this.slotForm.value.endTime ? this.slotForm.value.endTime + '' : '';

 

  if (!bookingDate || !startTime || !endTime) {
    // Handle the case where any of the values are null or empty strings
    alert('Please fill in all fields');
    return;
  }
  const slotExists = this.productService.checkIfSlotExists(bookingDate, startTime, endTime);

  if (slotExists) {
    alert('A slot with the same booking date, start time, and end time already exists');
    return;
  }
  
  const startTimeWithSeconds = startTime + ':00';
  const endTimeWithSeconds = endTime + ':00';

  this.productService
  .addSlotsToProduct(this.productId, bookingDate, startTimeWithSeconds, endTimeWithSeconds)
  .subscribe(
    (response) => {
      if (response === 'Slots added to the product successfully.') {
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        alert('Slot added successfully');
      } else {
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
        alert('Slot already added');
      }
    },
    (error) => {
      // Handle error, e.g., show an error message
      console.error('Error adding slots:', error);
      alert('Slot already added');
    }
  );

}

}

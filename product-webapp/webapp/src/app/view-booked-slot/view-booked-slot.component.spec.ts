import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookedSlotComponent } from './view-booked-slot.component';

describe('ViewBookedSlotComponent', () => {
  let component: ViewBookedSlotComponent;
  let fixture: ComponentFixture<ViewBookedSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBookedSlotComponent]
    });
    fixture = TestBed.createComponent(ViewBookedSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

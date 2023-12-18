import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotDetailsComponent } from './slot-details.component';

describe('SlotDetailsComponent', () => {
  let component: SlotDetailsComponent;
  let fixture: ComponentFixture<SlotDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotDetailsComponent]
    });
    fixture = TestBed.createComponent(SlotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

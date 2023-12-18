import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlotComponent } from './view-slot.component';

describe('ViewSlotComponent', () => {
  let component: ViewSlotComponent;
  let fixture: ComponentFixture<ViewSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSlotComponent]
    });
    fixture = TestBed.createComponent(ViewSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

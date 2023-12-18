import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAlComponent } from './home-al.component';

describe('HomeAlComponent', () => {
  let component: HomeAlComponent;
  let fixture: ComponentFixture<HomeAlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAlComponent]
    });
    fixture = TestBed.createComponent(HomeAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

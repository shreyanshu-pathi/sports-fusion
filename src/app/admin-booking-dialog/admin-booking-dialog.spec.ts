import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingDialog } from './admin-booking-dialog';

describe('AdminBookingDialog', () => {
  let component: AdminBookingDialog;
  let fixture: ComponentFixture<AdminBookingDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookingDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBookingDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

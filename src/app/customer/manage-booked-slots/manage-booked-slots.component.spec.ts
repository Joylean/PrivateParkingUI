import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookedSlotsComponent } from './manage-booked-slots.component';

describe('ManageBookedSlotsComponent', () => {
  let component: ManageBookedSlotsComponent;
  let fixture: ComponentFixture<ManageBookedSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBookedSlotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBookedSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

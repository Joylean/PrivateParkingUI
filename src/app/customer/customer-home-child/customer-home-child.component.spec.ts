import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHomeChildComponent } from './customer-home-child.component';

describe('CustomerHomeChildComponent', () => {
  let component: CustomerHomeChildComponent;
  let fixture: ComponentFixture<CustomerHomeChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerHomeChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHomeChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

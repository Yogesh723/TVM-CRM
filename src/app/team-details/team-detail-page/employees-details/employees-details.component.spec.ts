import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesDetailsComponent } from './employees-details.component';

describe('EmployeesDetailsComponent', () => {
  let component: EmployeesDetailsComponent;
  let fixture: ComponentFixture<EmployeesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesDetailsComponent]
    });
    fixture = TestBed.createComponent(EmployeesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAppointmentDialogComponent } from './validation-appointment-dialog.component';

describe('ValidationAppointmentDialogComponent', () => {
  let component: ValidationAppointmentDialogComponent;
  let fixture: ComponentFixture<ValidationAppointmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationAppointmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

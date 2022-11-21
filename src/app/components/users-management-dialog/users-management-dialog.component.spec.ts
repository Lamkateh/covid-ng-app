import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementDialogComponent } from './users-management-dialog.component';

describe('UsersManagementDialogComponent', () => {
  let component: UsersManagementDialogComponent;
  let fixture: ComponentFixture<UsersManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManagementDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

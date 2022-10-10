import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterManagementDialogComponent } from './center-management-dialog.component';

describe('CenterManagementDialogComponent', () => {
  let component: CenterManagementDialogComponent;
  let fixture: ComponentFixture<CenterManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterManagementDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

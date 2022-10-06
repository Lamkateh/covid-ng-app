import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentersManagementPageComponent } from './centers-management-page.component';

describe('CentersManagementPageComponent', () => {
  let component: CentersManagementPageComponent;
  let fixture: ComponentFixture<CentersManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentersManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentersManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

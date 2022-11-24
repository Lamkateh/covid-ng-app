import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterManagementPageComponent } from './center-management-page.component';

describe('CenterManagementPageComponent', () => {
  let component: CenterManagementPageComponent;
  let fixture: ComponentFixture<CenterManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

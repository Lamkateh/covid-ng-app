import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationCenterPageComponent } from './vaccination-center-page.component';

describe('VaccinationCenterPageComponent', () => {
  let component: VaccinationCenterPageComponent;
  let fixture: ComponentFixture<VaccinationCenterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationCenterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

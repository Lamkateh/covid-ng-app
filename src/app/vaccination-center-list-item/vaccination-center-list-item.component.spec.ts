import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationCenterListItemComponent } from './vaccination-center-list-item.component';

describe('VaccinationCenterListItemComponent', () => {
  let component: VaccinationCenterListItemComponent;
  let fixture: ComponentFixture<VaccinationCenterListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationCenterListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinationCenterListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

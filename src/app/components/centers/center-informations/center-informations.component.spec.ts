import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterInformationsComponent } from './center-informations.component';

describe('VaccinationCenterComponent', () => {
  let component: CenterInformationsComponent;
  let fixture: ComponentFixture<CenterInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CenterInformationsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CenterInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

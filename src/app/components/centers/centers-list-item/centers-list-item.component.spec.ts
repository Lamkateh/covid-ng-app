import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentersListItemComponent } from './centers-list-item.component';

describe('CentersListItemComponent', () => {
  let component: CentersListItemComponent;
  let fixture: ComponentFixture<CentersListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CentersListItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CentersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

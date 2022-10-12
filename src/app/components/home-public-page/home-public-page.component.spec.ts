import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePublicPageComponent } from './home-public-page.component';

describe('HomePublicPageComponent', () => {
  let component: HomePublicPageComponent;
  let fixture: ComponentFixture<HomePublicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePublicPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePublicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

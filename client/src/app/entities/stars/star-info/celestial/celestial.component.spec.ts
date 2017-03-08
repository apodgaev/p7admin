import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelestialComponent } from './celestial.component';

describe('CelestialComponent', () => {
  let component: CelestialComponent;
  let fixture: ComponentFixture<CelestialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelestialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelestialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

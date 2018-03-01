import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsPlannerComponent } from './trips-planner.component';

describe('TripsPlannerComponent', () => {
  let component: TripsPlannerComponent;
  let fixture: ComponentFixture<TripsPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

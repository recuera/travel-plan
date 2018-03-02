import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDayComponent } from './visit-day.component';

describe('VisitDayComponent', () => {
  let component: VisitDayComponent;
  let fixture: ComponentFixture<VisitDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

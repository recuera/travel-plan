import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitMapComponent } from './visit-map.component';

describe('VisitMapComponent', () => {
  let component: VisitMapComponent;
  let fixture: ComponentFixture<VisitMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

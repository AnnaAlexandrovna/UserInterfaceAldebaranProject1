import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EndofcourseComponent} from './endofcourse.component';

describe('EndofcourseComponent', () => {
  let component: EndofcourseComponent;
  let fixture: ComponentFixture<EndofcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndofcourseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndofcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

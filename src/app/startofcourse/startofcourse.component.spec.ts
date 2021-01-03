import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartofcourseComponent} from './startofcourse.component';

describe('StartofcourseComponent', () => {
  let component: StartofcourseComponent;
  let fixture: ComponentFixture<StartofcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartofcourseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartofcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

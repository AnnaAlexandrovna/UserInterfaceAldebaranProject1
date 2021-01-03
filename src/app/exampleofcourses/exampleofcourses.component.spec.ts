import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExampleofcoursesComponent} from './exampleofcourses.component';

describe('ExampleofcoursesComponent', () => {
  let component: ExampleofcoursesComponent;
  let fixture: ComponentFixture<ExampleofcoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleofcoursesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleofcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

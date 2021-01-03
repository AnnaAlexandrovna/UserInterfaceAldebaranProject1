import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangecoureComponent} from './changecoure.component';

describe('ChangecoureComponent', () => {
  let component: ChangecoureComponent;
  let fixture: ComponentFixture<ChangecoureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangecoureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecoureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

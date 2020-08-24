import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParecerComponent } from './add-parecer.component';

describe('AddParecerComponent', () => {
  let component: AddParecerComponent;
  let fixture: ComponentFixture<AddParecerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParecerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParecerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

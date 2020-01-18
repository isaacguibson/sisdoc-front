import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortariaComponent } from './add-portaria.component';

describe('AddPortariaComponent', () => {
  let component: AddPortariaComponent;
  let fixture: ComponentFixture<AddPortariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPortariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPortariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

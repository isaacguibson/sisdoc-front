import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDespachoComponent } from './add-despacho.component';

describe('AddDespachoComponent', () => {
  let component: AddDespachoComponent;
  let fixture: ComponentFixture<AddDespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

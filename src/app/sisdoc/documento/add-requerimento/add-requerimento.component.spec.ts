import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequerimentoComponent } from './add-requerimento.component';

describe('AddRequerimentoComponent', () => {
  let component: AddRequerimentoComponent;
  let fixture: ComponentFixture<AddRequerimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequerimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequerimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

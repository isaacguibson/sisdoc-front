import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeclaracaoComponent } from './add-declaracao.component';

describe('AddDeclaracaoComponent', () => {
  let component: AddDeclaracaoComponent;
  let fixture: ComponentFixture<AddDeclaracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeclaracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeclaracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

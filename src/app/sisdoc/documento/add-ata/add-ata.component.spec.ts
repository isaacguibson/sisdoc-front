import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtaComponent } from './add-ata.component';

describe('AddAtaComponent', () => {
  let component: AddAtaComponent;
  let fixture: ComponentFixture<AddAtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

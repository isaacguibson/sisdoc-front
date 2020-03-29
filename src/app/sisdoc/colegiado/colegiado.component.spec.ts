import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColegiadoComponent } from './colegiado.component';

describe('ColegiadoComponent', () => {
  let component: ColegiadoComponent;
  let fixture: ComponentFixture<ColegiadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColegiadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColegiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

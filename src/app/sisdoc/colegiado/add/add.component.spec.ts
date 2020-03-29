import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColegiadoAddComponent } from './add.component';

describe('AddComponent', () => {
  let component: ColegiadoAddComponent;
  let fixture: ComponentFixture<ColegiadoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColegiadoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColegiadoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorAddComponent } from './setor-add.component';

describe('SetorAddComponent', () => {
  let component: SetorAddComponent;
  let fixture: ComponentFixture<SetorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

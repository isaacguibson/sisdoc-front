import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SisdocComponent } from './sisdoc.component';

describe('SisdocComponent', () => {
  let component: SisdocComponent;
  let fixture: ComponentFixture<SisdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SisdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SisdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

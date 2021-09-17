import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testuser1Component } from './testuser1.component';

describe('Testuser1Component', () => {
  let component: Testuser1Component;
  let fixture: ComponentFixture<Testuser1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Testuser1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Testuser1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

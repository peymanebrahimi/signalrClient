import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestauthmodelComponent } from './testauthmodel.component';

describe('TestauthmodelComponent', () => {
  let component: TestauthmodelComponent;
  let fixture: ComponentFixture<TestauthmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestauthmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestauthmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

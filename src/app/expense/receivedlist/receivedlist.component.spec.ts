import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedlistComponent } from './receivedlist.component';

describe('ReceivedlistComponent', () => {
  let component: ReceivedlistComponent;
  let fixture: ComponentFixture<ReceivedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

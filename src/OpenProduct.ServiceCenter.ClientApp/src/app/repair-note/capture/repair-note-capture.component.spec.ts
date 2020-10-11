import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairNoteCaptureComponent } from './repair-note-capture.component';

describe('RepairNoteCaptureComponent', () => {
  let component: RepairNoteCaptureComponent;
  let fixture: ComponentFixture<RepairNoteCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairNoteCaptureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairNoteCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

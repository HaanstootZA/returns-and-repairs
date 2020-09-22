import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairNoteComponent } from './repair-note.component';

describe('RepairNoteComponent', () => {
  let component: RepairNoteComponent;
  let fixture: ComponentFixture<RepairNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

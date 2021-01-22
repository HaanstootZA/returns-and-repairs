import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairNoteIndexComponent } from './repair-note-index.component';

describe('RepairNoteIndexComponent', () => {
  let component: RepairNoteIndexComponent;
  let fixture: ComponentFixture<RepairNoteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairNoteIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairNoteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

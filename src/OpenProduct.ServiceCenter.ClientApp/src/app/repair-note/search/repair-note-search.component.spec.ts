import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairNoteSearchComponent } from './repair-note-search.component';

describe('RepairNoteSearchComponent', () => {
  let component: RepairNoteSearchComponent;
  let fixture: ComponentFixture<RepairNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairNoteSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

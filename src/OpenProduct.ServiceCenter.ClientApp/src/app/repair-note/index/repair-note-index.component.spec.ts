import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RepairNote } from '../models/repair-note';
import { RepairNoteService } from '../repair-note.service';

import { RepairNoteIndexComponent } from './repair-note-index.component';

describe('RepairNoteIndexComponent', () => {
  let component: RepairNoteIndexComponent;
  let repairNoteService: RepairNoteService;
  let fixture: ComponentFixture<RepairNoteIndexComponent>;

  beforeEach(async () => {
    await TestBed
      .configureTestingModule({ declarations: [RepairNoteIndexComponent] })
      .compileComponents();

    repairNoteService = TestBed.inject(RepairNoteService);
    fixture = TestBed.createComponent(RepairNoteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadMostRecent should return a list of repair notes ', () => {
    const expectedResult: RepairNote[] = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT001', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    spyOn(repairNoteService, 'getMostRecentRepairNotes').and.returnValue(of(expectedResult));

    expect(component.repairNotes).toEqual(expectedResult);
    expect(component.displayRepairNote).toEqual(true);
    expect(component.selectedRepairNote).toEqual(expectedResult[0]);
  });
});

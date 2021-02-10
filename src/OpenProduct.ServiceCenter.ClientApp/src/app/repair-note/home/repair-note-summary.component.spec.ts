import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RepairNote } from '../models/repair-note';
import { RepairNoteService } from '../repair-note.service';

import { RepairNoteSummaryComponent } from './repair-note-summary.component';

describe('RepairNoteSummaryComponent', () => {
  let repairNoteServiceSpy: jasmine.SpyObj<RepairNoteService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RepairNoteSummaryComponent, {
          provide: RepairNoteService,
          useValue: jasmine.createSpyObj(RepairNoteService, ['getMostRecentRepairNotes'])
        }]
    });

    repairNoteServiceSpy = TestBed.inject(RepairNoteService) as jasmine.SpyObj<RepairNoteService>;
  });

  it('should create', () => {
    const repairNoteSummaryComponent = TestBed.inject(RepairNoteSummaryComponent);
    expect(repairNoteSummaryComponent).toBeTruthy();
  });

  it('loadMostRecent should return a list of repair notes', () => {
    const expectedResults: RepairNote[] = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT002', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    repairNoteServiceSpy.getMostRecentRepairNotes.and.returnValue(of(expectedResults));
    const currentTestInstance = TestBed.inject(RepairNoteSummaryComponent);
    currentTestInstance.ngOnInit();

    expect(currentTestInstance.repairNotes).toEqual(expectedResults);
    expect(currentTestInstance.selectedRepairNote).toEqual(expectedResults[0]);
  });

  it('onSelect should change the selected repair note', () => {
    const currentTestInstance = TestBed.inject(RepairNoteSummaryComponent);
    currentTestInstance.repairNotes = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT002', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    currentTestInstance.onSelect(currentTestInstance.repairNotes[1]);

    expect(currentTestInstance.selectedRepairNote).toEqual(currentTestInstance.repairNotes[1]);
  });

  it('onSelect should de-select the repair note when it is empty or invalid', () => {
    const currentTestInstance = TestBed.inject(RepairNoteSummaryComponent);
    currentTestInstance.repairNotes = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT002', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    currentTestInstance.selectedRepairNote = currentTestInstance.repairNotes[0];
    currentTestInstance.onSelect({ id: '', capturer: '', lines: [] } as RepairNote);

    expect(currentTestInstance.selectedRepairNote).toBeNull();
  });
});

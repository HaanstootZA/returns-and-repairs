import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RepairNote } from '../models/repair-note';
import { RepairNoteService } from '../repair-note.service';

import { RepairNoteSearchComponent } from './repair-note-search.component';

describe('RepairNoteSearchComponent', () => {
  let repairNoteServiceSpy: jasmine.SpyObj<RepairNoteService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RepairNoteSearchComponent, {
          provide: RepairNoteService,
          useValue: jasmine.createSpyObj(RepairNoteService, ['previewSearchRepairNote', 'searchRepairNote'])
        }]
    });

    repairNoteServiceSpy = TestBed.inject(RepairNoteService) as jasmine.SpyObj<RepairNoteService>;
  });

  it('should create', () => {
    const repairNoteSearchComponent = TestBed.inject(RepairNoteSearchComponent);
    expect(repairNoteSearchComponent).toBeTruthy();
  });

  it('should inialize the repair notes observable', () => {
    const currentTestInstance = TestBed.inject(RepairNoteSearchComponent);
    currentTestInstance.ngOnInit();

    expect(currentTestInstance.previewRepairNotes$).toBeTruthy();
    expect(currentTestInstance.foundRepairNotes).toBeNull();
    expect(currentTestInstance.selectedRepairNote).toBeNull();
  });

  it('should populate the preview repair notes on key up', () => {
    jasmine.clock().install();
    const expectedResults: string[] = ['RPT001', 'RPT002'];
    repairNoteServiceSpy.previewSearchRepairNote.and.returnValue(of(expectedResults));

    const currentTestInstance = TestBed.inject(RepairNoteSearchComponent);
    currentTestInstance.ngOnInit();
    expect(currentTestInstance.previewRepairNotes$).toBeTruthy();

    currentTestInstance.previewRepairNotes$?.subscribe((result: string[]) => {
      expect(result).toEqual(expectedResults);
      expect(currentTestInstance.selectedRepairNote).toBeNull();
    });

    currentTestInstance.onKeyUp('RPT001');
    expect(currentTestInstance.displayPreview).toBeTrue();
    jasmine.clock().tick(1000);
    jasmine.clock().uninstall();
  });

  it('should populate the repair notes on search button press', () => {
    const expectedRepairNotes: RepairNote[] = [
      { id: 'REP001', capturer: 'Test Çapturer', lines: [{ partNumber: 'PRT011', quantity: 11 }] },
      { id: 'REP002', capturer: 'Test Çapturer', lines: [{ partNumber: 'PRT021', quantity: 21 }, { partNumber: 'PRT022', quantity: 22 }] }];
    repairNoteServiceSpy.searchRepairNote.and.returnValue(of(expectedRepairNotes));

    const currentTestInstance = TestBed.inject(RepairNoteSearchComponent);
    currentTestInstance.onSearch('RPT001');

    expect(currentTestInstance.displayPreview).toBeFalse();
    expect(currentTestInstance.previewRepairNotes$).toBeTruthy();
    expect(currentTestInstance.foundRepairNotes).toEqual(expectedRepairNotes);
    expect(currentTestInstance.selectedRepairNote).toEqual(expectedRepairNotes[0]);
  });

  it('onSelect should change the selected repair note', () => {
    const currentTestInstance = TestBed.inject(RepairNoteSearchComponent);
    currentTestInstance.foundRepairNotes = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT002', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    currentTestInstance.onSelect(currentTestInstance.foundRepairNotes[1]);

    expect(currentTestInstance.displayPreview).toBeFalse();
    expect(currentTestInstance.selectedRepairNote).toEqual(currentTestInstance.foundRepairNotes[1]);
  });

  it('onSelect should de-select the repair note when it is empty or invalid', () => {
    const currentTestInstance = TestBed.inject(RepairNoteSearchComponent);
    currentTestInstance.foundRepairNotes = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT002', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    currentTestInstance.selectedRepairNote = currentTestInstance.foundRepairNotes[0];
    currentTestInstance.onSelect({ id: '', capturer: '', lines: [] } as RepairNote);

    expect(currentTestInstance.displayPreview).toBeFalse();
    expect(currentTestInstance.selectedRepairNote).toBeNull();
  });

  it('onSelect should do nothing if there are no found repaire notes', () => {
    const currentTestInstance = TestBed.inject(RepairNoteSearchComponent);
    currentTestInstance.foundRepairNotes = null;
    currentTestInstance.onSelect({ id: '', capturer: '', lines: [] } as RepairNote);

    expect(currentTestInstance.displayPreview).toBeFalse();
    expect(currentTestInstance.selectedRepairNote).toBeNull();
  });
});

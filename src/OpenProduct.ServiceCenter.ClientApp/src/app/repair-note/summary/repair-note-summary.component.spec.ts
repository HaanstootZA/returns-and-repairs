import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RepairNote } from '../models/repair-note';
import { RepairNoteService } from '../repair-note.service';

import { RepairNoteSummaryComponent } from './repair-note-summary.component';

describe('RepairNoteSummaryComponent', () => {
  //let RepairNoteSummaryComponent: RepairNoteSummaryComponent;
  let repairNoteServiceSpy: jasmine.SpyObj<RepairNoteService>;
  //let fixture: ComponentFixture<RepairNoteSummaryComponent>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        providers: [
          RepairNoteSummaryComponent,
          {
            provide: RepairNoteService,
            useValue: jasmine.createSpyObj(RepairNoteService, ['getMostRecentRepairNotes'])
          }]
      });

    // fixture = TestBed.createComponent(RepairNoteSummaryComponent);
    // fixture.detectChanges();

    // component = fixture.componentInstance;

    repairNoteServiceSpy = TestBed.inject(RepairNoteService) as jasmine.SpyObj<RepairNoteService>;
  });

  it('should create', () => {
    const repairNoteSummaryComponent = TestBed.inject(RepairNoteSummaryComponent);
    expect(repairNoteSummaryComponent).toBeTruthy();
  });

  it('loadMostRecent should return a list of repair notes', () => {
    const expectedResult: RepairNote[] = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT001', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    repairNoteServiceSpy.getMostRecentRepairNotes.and.returnValue(of(expectedResult));
    const currentTestInstance = TestBed.inject(RepairNoteSummaryComponent);
    currentTestInstance.ngOnInit();

    expect(currentTestInstance.repairNotes).toEqual(expectedResult);
    expect(currentTestInstance.displayRepairNote).toEqual(true);
    expect(currentTestInstance.selectedRepairNote).toEqual(expectedResult[0]);
  });

  it('onSelect should change the selected repair note', () => {
    const expectedResult: RepairNote[] = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT001', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    repairNoteServiceSpy.getMostRecentRepairNotes.and.returnValue(of(expectedResult));
    const currentTestInstance = TestBed.inject(RepairNoteSummaryComponent);
    currentTestInstance.ngOnInit();
    currentTestInstance.onSelect(expectedResult[1]);

    expect(currentTestInstance.displayRepairNote).toEqual(true);
    expect(currentTestInstance.selectedRepairNote).toEqual(expectedResult[1]);
  });

  it('onSelect should unselect the repair note when it is empty or invalid', () => {
    const expectedResult: RepairNote[] = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT001', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    repairNoteServiceSpy.getMostRecentRepairNotes.and.returnValue(of(expectedResult));
    const currentTestInstance = TestBed.inject(RepairNoteSummaryComponent);
    currentTestInstance.ngOnInit();
    currentTestInstance.onSelect({id: '', capturer: '', lines: []});

    expect(currentTestInstance.displayRepairNote).toEqual(false);
    expect(currentTestInstance.selectedRepairNote).toEqual(expectedResult[0]);
  });
});

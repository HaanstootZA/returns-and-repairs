import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RepairNote } from '../models/repair-note';
import { RepairNoteService } from '../repair-note.service';

import { RepairNoteIndexComponent } from './repair-note-index.component';

describe('RepairNoteIndexComponent', () => {
  let repairNoteIndexComponent: RepairNoteIndexComponent;
  let repairNoteServiceSpy: jasmine.SpyObj<RepairNoteService>;
  let fixture: ComponentFixture<RepairNoteIndexComponent>;

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        providers: [
          RepairNoteIndexComponent,
          {
          provide: RepairNoteService,
          useValue: jasmine.createSpyObj(RepairNoteService, ['getMostRecentRepairNotes'])
        }]
      });

    // fixture = TestBed.createComponent(RepairNoteIndexComponent);
    // fixture.detectChanges();

    // component = fixture.componentInstance;

    repairNoteServiceSpy = TestBed.inject(RepairNoteService) as jasmine.SpyObj<RepairNoteService>;
    repairNoteIndexComponent = TestBed.inject(RepairNoteIndexComponent);
  });

  it('should create', () => {
    expect(repairNoteIndexComponent).toBeTruthy();
  });

  it('loadMostRecent should return a list of repair notes ', () => {
    const expectedResult: RepairNote[] = [
      { id: 'RPT001', capturer: 'Albert Spangler', lines: [{ partNumber: 'PLC10', quantity: 2 }] },
      { id: 'RPT001', capturer: 'Sam Vimes', lines: [{ partNumber: 'PLC10', quantity: 4 }, { partNumber: 'BLM01', quantity: 1 }] }
    ];
    repairNoteServiceSpy.getMostRecentRepairNotes.and.returnValue(of(expectedResult));

    expect(repairNoteIndexComponent.repairNotes).toEqual(expectedResult);
    expect(repairNoteIndexComponent.displayRepairNote).toEqual(true);
    expect(repairNoteIndexComponent.selectedRepairNote).toEqual(expectedResult[0]);
  });
});

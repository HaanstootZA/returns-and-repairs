import { TestBed } from '@angular/core/testing';
import { RepairNote } from './models/repair-note';

import { RepairNoteService } from './repair-note.service';

describe('RepairNoteService', () => {
  let service: RepairNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of repair notes', () => {
    expect(service.getRepairNotes()).toContain((n: RepairNote) => n.id === 'TestId');
  });
});

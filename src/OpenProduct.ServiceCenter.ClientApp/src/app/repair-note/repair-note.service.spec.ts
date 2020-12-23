import { TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RepairNote } from './models/repair-note';
import { RepairNoteService } from './repair-note.service';

describe('RepairNoteService', () => {
  let testService: RepairNoteService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    testService = TestBed.inject(RepairNoteService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(testService).toBeTruthy();
  });

  it('should return a list of repair notes', () => {
    const expectedUrl = 'api/repairNotes';
    const expecteRepairNotes = [{
      id: 'REP001',
      capturer: 'Test Çapturer',
      lines: [{
        partNumber: 'PRT011',
        quantity: 11
      }]
    }, {
      id: 'REP002',
      capturer: 'Test Çapturer',
      lines: [{
        partNumber: 'PRT021',
        quantity: 21
      }, {
        partNumber: 'PRT022',
        quantity: 22
      }]
    }];

    testService.getRepairNotes().subscribe(
      (actualRepairNotes) => expect(actualRepairNotes).toEqual(expecteRepairNotes),
      () => fail(),
      () => { });

    const requestWrapper = httpTestingController.expectOne({ url: expectedUrl });
    expect(requestWrapper.request.method).toEqual('GET');
    requestWrapper.flush(expecteRepairNotes);
  });

  it('should log an error', () => {
    const expectedUrl = 'api/repairNotes';
    testService.getRepairNotes().subscribe(
      () => fail(),
      () => expect().nothing(),
      () => fail());

    const requestWrapper = httpTestingController.expectOne({ url: expectedUrl });
    expect(requestWrapper.request.method).toEqual('GET');
    requestWrapper.error({
      colno: 0,
      error: 'EXPECTED ERROR',
      filename: 'TEST.txt',
      lineno: 1,
      message: 'IGNORE THJIS IT\'s A TEST'
    } as ErrorEvent);
  });
});

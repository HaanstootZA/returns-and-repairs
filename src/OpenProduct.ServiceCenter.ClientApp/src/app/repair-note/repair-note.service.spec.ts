import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { RepairNoteService } from './repair-note.service';
import { RepairNote } from './models/repair-note';

describe('RepairNoteService', () => {
  let testService: RepairNoteService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    testService = TestBed.inject(RepairNoteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('service should be created', () => {
    expect(testService).toBeTruthy();
  });

  function getMostRecentRepairNotesRequestWrapper(): TestRequest { return httpTestingController.expectOne({ method: 'GET', url: 'api/repairNotes' }); }

  it('getMostRecenRepairNotes should return a list of repair notes', () => {
    const testRepairNotes: RepairNote[] = [{
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

    testSuccess(testService.getMostRecentRepairNotes(), getMostRecentRepairNotesRequestWrapper, testRepairNotes);
  });

  it('getMostRecentRepairNotes should return an empty list of repair notes', () => {
    testSuccess(testService.getMostRecentRepairNotes(), getMostRecentRepairNotesRequestWrapper, [] as RepairNote[]);
  });

  it('getMostRecentRepairNotes should return an empty list of repair notes', () => {
    testSuccess(testService.getMostRecentRepairNotes(), getMostRecentRepairNotesRequestWrapper, [] as RepairNote[], null);
  });

  it('getMostRecentRepairNotes should log on error', () => {
    testFailure(testService.getMostRecentRepairNotes(), getMostRecentRepairNotesRequestWrapper);
  });

  function getRepairNoteRequestWrapper(): TestRequest {
    return httpTestingController.expectOne((request) => {
      return request.method === 'GET' && request.url === 'api/repairNote' && request.params.has('id');
    });
  }

  it('getRepairNote should return a single of repair note', () => {
    const testRepairNote: RepairNote = {
      id: 'REP001',
      capturer: 'Test Çapturer',
      lines: [{
        partNumber: 'PRT011',
        quantity: 11
      }]
    };

    testSuccess(testService.getRepairNote(testRepairNote.id), getRepairNoteRequestWrapper, testRepairNote);
  });

  it('getRepairNote should log on error', () => {
    testFailure(testService.getRepairNote('DUMMY'), getRepairNoteRequestWrapper);
  });

  function getPreviewSearchWrapper(): TestRequest {
    return httpTestingController.expectOne((request) =>
      request.method === 'GET' &&
      request.url === 'api/repairNotes/search' &&
      request.params.has('term')
    );
  }

  it('previewSearchRepairNote should return a list of repair notes', () => {
    const expectedRepairNotes: RepairNote[] = [{
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

    testSuccess(testService.previewSearchRepairNote('REP'), () => getPreviewSearchWrapper(), expectedRepairNotes);
  });

  it('previewSearchRepairNote should return an empty list', () => {
    testSuccess(testService.previewSearchRepairNote('RAP'), () => getPreviewSearchWrapper(), [] as RepairNote[]);
  });

  it('previewSearchRepairNote should return an empty list for a null result', () => {
    testSuccess(testService.previewSearchRepairNote('RAP'), () => getPreviewSearchWrapper(), [] as RepairNote[], null);
  });

  it('previewSearchRepairNote should log on error', () => {
    testFailure(testService.previewSearchRepairNote('EMPTY'), () => getPreviewSearchWrapper());
  });

  function getSearchWrapper(): TestRequest {
    return httpTestingController.expectOne((request) =>
      request.method === 'GET' &&
      request.url === 'api/repairNote/search' &&
      request.params.has('term')
    );
  }

  it('searchRepairNote should return a list of repair note', () => {
    const expectedRepairNote: RepairNote = {
      id: 'REP001',
      capturer: 'Test Çapturer',
      lines: [{
        partNumber: 'PRT011',
        quantity: 11
      }]
    };

    testSuccess(testService.searchRepairNote('REP'), () => getSearchWrapper(), expectedRepairNote);
  });

  it('searchRepairNote should return a null result when status 404', () => {
    testSuccess(testService.searchRepairNote('RAP'), () => getSearchWrapper());
  });

  it('searchRepairNote should return null result', () => {
    testSuccess(testService.searchRepairNote('RAP'), () => getSearchWrapper());
  });

  it('searchRepairNote should log on error', () => {
    testFailure(testService.searchRepairNote('EMPTY'), () => getSearchWrapper());
  });

  function testSuccess<T>(result: Observable<T>, requestWrapper: (() => TestRequest), expectedResult?: T, submitResult?: T): void {
    result.subscribe(
      (actualResult) => expectedResult ? expect(actualResult).toEqual(expectedResult) : expect(actualResult).toBeNull(),
      () => fail(),
      () => { });

    requestWrapper().flush(submitResult ?? expectedResult ?? null);
  }

  function testFailure<T>(result: Observable<T>, requestWrapper: (() => TestRequest)): void {
    const errorEvent = {
      colno: 0,
      error: 'EXPECTED ERROR',
      filename: 'TEST.txt',
      lineno: 1,
      message: 'IGNORE THJIS IT\'s A TEST'
    } as ErrorEvent;

    result.subscribe(
      () => fail(),
      () => expect().nothing(),
      () => fail());

    requestWrapper().error(errorEvent);
  }
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { RepairNoteService } from './repair-note.service';
import { RepairNote } from './models/repair-note';
import { Observable } from 'rxjs';
import { RepairNoteDashboardStats } from './models/repair-note-dashboard-stats';

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

  function getRepairNotesRequestWrapper(): TestRequest { return httpTestingController.expectOne({ method: 'GET', url: 'api/repairNotes' }) }

  it('getRepairNotes should return a list of repair notes', () => {
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

    testSuccess(testService.getRepairNotes(), testRepairNotes, getRepairNotesRequestWrapper);
  });

  it('getRepairNotes should return an empty list of repair notes', () => {
    testSuccess(testService.getRepairNotes(), [] as RepairNote[], getRepairNotesRequestWrapper);
  });

  it('getRepairNotes should log on error', () => {
    testFailure(testService.getRepairNotes(), getRepairNotesRequestWrapper);
  });

  function getRepairNoteRequestWrapper(): TestRequest {
    return httpTestingController.expectOne((request) => {
      return request.method === 'GET' && request.url === 'api/repairNotes' && request.params.has('id');
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

    testSuccess(testService.getRepairNote(testRepairNote.id), testRepairNote, getRepairNoteRequestWrapper);
  });

  it('getRepairNote should log on error', () => {
    testFailure(testService.getRepairNote('DUMMY'), getRepairNoteRequestWrapper);
  });

  function getLoadDashboardStatsWrapper(): TestRequest {
    return httpTestingController.expectOne({ method: 'GET', url: 'api/repairNotes/dashboard' });
  }

  it('loadDashboardStats should return a list of stats', () => {
    const expectedStats: RepairNoteDashboardStats = {
      statsCollection: new Map<string, number>([
        ['open notes', 8],
        ['awaiting technician assessment', 3],
        ['awaiting client acceptance', 2],
        ['completed note', 5]
      ])
    };

    testSuccess(testService.loadDashboardStats(), expectedStats, getLoadDashboardStatsWrapper);
  });

  it('loadDashboardStats should log on error', () => {
    testFailure(testService.loadDashboardStats(), getLoadDashboardStatsWrapper);
  });

  function getSearchWrapper(searchType: string): TestRequest {
    return httpTestingController.expectOne((request) =>
      request.method === 'GET' &&
      request.url === 'api/repairNotes/search' &&
      request.params.has('term') &&
      request.params.has('type') &&
      request.params.get('type') === searchType
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

    testSuccess(testService.previewSearchRepairNote('REP'), expectedRepairNotes, () => getSearchWrapper('wildcard'));
  });

  it('previewSearchRepairNote should return an empty list', () => {
    testSuccess(testService.previewSearchRepairNote('RAP'), [] as RepairNote[], () => getSearchWrapper('wildcard'));
  });

  it('previewSearchRepairNote should return an empty list for a null result', () => {
    testSuccess(testService.previewSearchRepairNote('RAP'), null, () => getSearchWrapper('wildcard'));
  });

  it('previewSearchRepairNote should log on error', () => {
    testFailure(testService.previewSearchRepairNote('EMPTY'), () => getSearchWrapper('wildcard'));
  });


  it('searchRepairNote should return a list of repair note', () => {
    const expectedRepairNote: RepairNote = {
      id: 'REP001',
      capturer: 'Test Çapturer',
      lines: [{
        partNumber: 'PRT011',
        quantity: 11
      }]
    };

    testSuccess(testService.searchRepairNote('REP'), expectedRepairNote, () => getSearchWrapper('exact'));
  });

  it('searchRepairNote should return a null result when status 404', () => {
    testSuccess(testService.searchRepairNote('RAP'), null, () => getSearchWrapper('exact'));
  });

  it('searchRepairNote should return null result', () => {
    testSuccess(testService.searchRepairNote('RAP'), null, () => getSearchWrapper('exact'));
  });

  it('searchRepairNote should log on error', () => {
    testFailure(testService.searchRepairNote('EMPTY'), () => getSearchWrapper('exact'));
  });

  function testSuccess<T>(result: Observable<T>, expectedResult: T, requestWrapper: (() => TestRequest)): void {
    result.subscribe(
      (actualResult) => expect(actualResult).toEqual(expectedResult),
      () => fail(),
      () => { });

    requestWrapper().flush(expectedResult);
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

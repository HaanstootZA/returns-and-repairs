import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RepairNoteStats } from './models/repair-note-stats';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let testService: DashboardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    testService = TestBed.inject(DashboardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(testService).toBeTruthy();
  });

  function getloadDashboardStatisticsWrapper(): TestRequest {
    return httpTestingController.expectOne({ method: 'GET', url: 'api/dashboard/repairndotes' });
  }

  it('loadDashboardStatistics should return a list of stats', () => {
    const expectedStats: RepairNoteStats = {
      statsCollection: new Map<string, number>([
        ['open notes', 8],
        ['awaiting technician assessment', 3],
        ['awaiting client acceptance', 2],
        ['completed note', 5]
      ])
    };
    testService.loadDashboardStatistics().subscribe(
      (actualResult) => expect(actualResult).toEqual(expectedStats),
      () => fail(),
      () => { });

    getloadDashboardStatisticsWrapper().flush(expectedStats);
  });

  it('loadDashboardStatistics should log on error', () => {
    const errorEvent = {
      colno: 0,
      error: 'EXPECTED ERROR',
      filename: 'TEST.txt',
      lineno: 1,
      message: 'IGNORE THJIS IT\'s A TEST'
    } as ErrorEvent;

    testService.loadDashboardStatistics().subscribe(
      () => fail(),
      () => expect().nothing(),
      () => fail());

    getloadDashboardStatisticsWrapper().error(errorEvent);
  });
});

import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { RepairNoteDashboardStats } from './models/repair-note-dashboard-stats';
import { DashboardService } from './dashboard.service';

describe('DashboardserviceService', () => {
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
    testService.loadDashboardStats().subscribe(
      (actualResult) => expect(actualResult).toEqual(expectedStats),
      () => fail(),
      () => { });

    getLoadDashboardStatsWrapper().flush(expectedStats);
  });

  it('loadDashboardStats should log on error', () => {
    const errorEvent = {
      colno: 0,
      error: 'EXPECTED ERROR',
      filename: 'TEST.txt',
      lineno: 1,
      message: 'IGNORE THJIS IT\'s A TEST'
    } as ErrorEvent;

    testService.loadDashboardStats().subscribe(
      () => fail(),
      () => expect().nothing(),
      () => fail());

    getLoadDashboardStatsWrapper().error(errorEvent);
  });
});

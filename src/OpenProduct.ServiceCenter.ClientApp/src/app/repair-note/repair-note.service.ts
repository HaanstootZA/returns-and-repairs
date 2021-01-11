import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ObservedValueOf, OperatorFunction } from 'rxjs/internal/types';
import { catchError, map, tap } from 'rxjs/operators';
import { Logger } from '../core/logger.service';

import { RepairNote } from './models/repair-note';
import { RepairNoteDashboardStats } from './models/repair-note-dashboard-stats';

@Injectable({
  providedIn: 'root'
})

export class RepairNoteService {
  private defaultUri = 'api/repairNotes';
  private dashboardUri = 'api/repairNotes/dashboard';
  private searchUri = 'api/repairNotes/search';

  constructor(
    private logger: Logger,
    private http: HttpClient) { }

  loadDashboardStats(): Observable<RepairNoteDashboardStats> {
    return this.http
      .get<RepairNoteDashboardStats>(this.dashboardUri)
      .pipe(catchError(this.handleError<RepairNoteDashboardStats>('loadDashboardStats')));
  }

  getRepairNotes(): Observable<RepairNote[]> {
    //THE API SHOULD RETURN AN EMPTY LIST IF THERE ARE NO REPAIR NOTES
    return this.http
      .get<RepairNote[]>(this.defaultUri)
      .pipe(catchError(this.handleError<RepairNote[]>('getRepairNotes')));
  }

  getRepairNote(id: string): Observable<RepairNote> {
    //THE API SHOULD RETURN A 404 NOT FOUND FOR AN EXACT REQUEST
    const params = new HttpParams().set('id', id);
    return this.http
      .get<RepairNote>(this.defaultUri, { params })
      .pipe(catchError(this.handleError<RepairNote>('getRepairNote')));
  }

  previewSearchRepairNote(term: string): Observable<RepairNote[]> {
    //THE API SHOULD RETURN AN EMPTY LIST NO REPAIR NOTES ARE FOUND
    const params = new HttpParams()
      .set('term', term)
      .set('type', 'wildcard');

    return this.http
      .get<RepairNote[]>(this.searchUri, { params })
      .pipe((r) => r ?? [] as RepairNote[])
      .pipe(catchError(this.handleError<RepairNote[]>('previewSearchRepairNote')));
  }

  searchRepairNote(term: string): Observable<RepairNote | null> {
    //THE API SHOULD RETURN NULL WHEN NO REPAIR NOTES ARE FOUND
    const params = new HttpParams()
      .set('term', term)
      .set('type', 'exact');

    return this.http
      .get<RepairNote>(this.searchUri, { params })
      .pipe(catchError(this.handleError<RepairNote>('searchRepairNote')));
  }

  private handleError<T>(operation = 'operation'): OperatorFunction<T, T> {
    // tslint:disable-next-line: no-any
    return (error: any): Observable<T> => {
      this.logger.resolveError(`${operation} failed: ${error.message}`, new Error(error));
      return throwError('An error has occurred while trying to access an HTTP server');
    };
  }
}

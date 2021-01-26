import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Logger } from '../core/logger.service';

import { RepairNote } from './models/repair-note';

@Injectable({
  providedIn: 'root'
})
export class RepairNoteService {
  private defaultUri = 'api/repairNote';
  private searchUri = `${this.defaultUri}/search`;

  private mostRecentUri = 'api/repairnotes';
  private previewSearchUri = `${this.mostRecentUri}/search`;

  constructor(
    private logger: Logger,
    private http: HttpClient) { }


  getRepairNote(id: string): Observable<RepairNote> {
    this.logger.unitOfWork(`Find a repair note by id ${id}`);

    const params = new HttpParams().set('id', id);
    return this.http
      .get<RepairNote>(this.defaultUri, { params })
      .pipe(
        tap((result: RepairNote) => this.logger.debugResponse(result, this.defaultUri)),
        catchError(this.logger.handleError<RepairNote>('getRepairNote')));
  }

  searchRepairNote(term: string): Observable<RepairNote | null> {
    this.logger.unitOfWork(`Search for a repair note by id ${term}`);

    if (!term.trim()) {
      return of(null);
    }
    const params = new HttpParams().set('term', term);

    return this.http
      .get<RepairNote>(this.searchUri, { params })
      .pipe(
        tap((result: RepairNote) => this.logger.debugResponse(result, this.searchUri)),
        catchError(this.logger.handleError<RepairNote>('searchRepairNote')));
  }

  getMostRecentRepairNotes(): Observable<RepairNote[]> {
    this.logger.unitOfWork('Get the most recent repair notes');

    return this.http
      .get<RepairNote[]>(this.mostRecentUri)
      .pipe(
        tap((result: RepairNote[]) => this.logger.debugResponse(result, this.mostRecentUri)),
        catchError(this.logger.handleError<RepairNote[]>('getMostRecentRepairNotes')));
  }

  previewSearchRepairNote(term: string): Observable<RepairNote[]> {
    this.logger.unitOfWork(`Preview repair notes for id:${term}`);

    if (!term.trim()) {
      return of([]);
    }

    const params = new HttpParams().set('term', term);
    return this.http
      .get<RepairNote[]>(this.previewSearchUri, { params })
      .pipe(
        (r) => r ?? [] as RepairNote[],
        tap((result: RepairNote[]) => this.logger.debugResponse(result, this.previewSearchUri)),
        catchError(this.logger.handleError<RepairNote[]>('previewSearchRepairNote')));
  }
}

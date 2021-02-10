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
  private defaultUri = 'api/repairNotes';

  private mostRecentUri = `${this.defaultUri}/mostRecent`;
  private previewSearchUri = `${this.defaultUri}/previewSearch`;
  private searchUri = `${this.defaultUri}/search`;

  constructor(
    private logger: Logger,
    private http: HttpClient) { }


  public getRepairNote(id: string): Observable<RepairNote> {
    this.logger.unitOfWork(`Find a repair note by id ${id}`);

    const params = new HttpParams().set('id', id);
    return this.http
      .get<RepairNote>(this.defaultUri, { params })
      .pipe(
        tap((result: RepairNote) => this.logger.responseBreakpoint(result, this.defaultUri)),
        catchError(this.logger.handleError<RepairNote>('getRepairNote')));
  }

  public getMostRecentRepairNotes(): Observable<RepairNote[]> {
    this.logger.unitOfWork('Get the most recent repair notes');

    return this.http.get<RepairNote[]>(this.mostRecentUri)
      .pipe(
        tap((result: RepairNote[]) => this.logger.responseBreakpoint(result, this.mostRecentUri)),
        catchError(this.logger.handleError<RepairNote[]>('getMostRecentRepairNotes')));
  }

  public searchRepairNote(repairNoteId: string): Observable<RepairNote[]> {
    this.logger.unitOfWork(`Search for a repair note by id ${repairNoteId}`);
    return this.searchRepairNotesInternal<RepairNote>(repairNoteId, this.searchUri, 'searchRepairNote');
  }

  public previewSearchRepairNote(repairNoteId: string): Observable<string[]> {
    this.logger.unitOfWork(`Preview a search repair notes for id:${repairNoteId}`);
    return this.searchRepairNotesInternal<string>(repairNoteId, this.previewSearchUri, 'previewSearchRepairNote');
  }

  private searchRepairNotesInternal<T>(repairNoteId: string, uri: string, callerMemberName: string): Observable<T[]> {
    if (!repairNoteId.trim()) {
      this.logger.breakpoint('No repair note id has ben defined, skipping search');
      return of([]);
    }

    const params = new HttpParams().set('id', repairNoteId);
    this.logger.breakpoint('No term has ben defined, skipping search');
    return this.http.get<T[]>(uri, { params })
      .pipe(tap((result: T[]) => this.logger.responseBreakpoint(result, uri)))
      .pipe(catchError(this.logger.handleError<T[]>(callerMemberName)));
  }
}

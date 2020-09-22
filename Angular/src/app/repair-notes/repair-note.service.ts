import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepairNote } from './models/repair-note';

@Injectable({
  providedIn: 'root'
})

export class RepairNoteService {

  constructor() { }

  getRepairNotes(): Observable<RepairNote[]> {
    throw new Error('Method not implemented.');
  }
}

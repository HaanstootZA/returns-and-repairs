import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RepairNote } from './repair-note/models/repair-note';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(): RepairNote[] {
    const repairNotes = [{
      id: 'RNT001', capturer: 'Charles Xavier', lines: [
        { partNumber: 'XMNWOLV', quantity: 9 },
        { partNumber: 'XMNGMBT', quantity: 7 }]
    },
    { id: 'RNT002', capturer: 'Charles Xavier', lines: [{ partNumber: 'XMNSTRM', quantity: 2 }] },
    { id: 'RNT003', capturer: 'Wolverine', lines: [{ partNumber: 'XMNPHNX', quantity: 200 }] },
    { id: 'RNT004', capturer: 'Neo', lines: [{ partNumber: 'XMNGMBT', quantity: 7 }] }];

    return repairNotes as RepairNote[];
  }

  genId(repairNotes: RepairNote[]): string {
    if (repairNotes.length < 10) {
      return 'RNT00' + (repairNotes.length + 1).toString();
    }

    if (repairNotes.length < 100) {
      return 'RNT0' + (repairNotes.length + 1).toString();
    }

    return 'RNT' + (repairNotes.length + 1).toString();
  }
}

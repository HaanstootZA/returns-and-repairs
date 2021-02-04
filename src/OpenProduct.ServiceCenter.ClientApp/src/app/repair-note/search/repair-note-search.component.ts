import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RepairNoteService } from '../repair-note.service';
import { RepairNote } from '../models/repair-note';
import { exception } from 'console';
import { Logger } from 'src/app/core/logger.service';

@Component({
  selector: 'rnt-search',
  templateUrl: './repair-note-search.component.html',
  styleUrls: ['./repair-note-search.component.scss']
})
export class RepairNoteSearchComponent implements OnInit {
  @Output() repairNoteFound = new EventEmitter<RepairNote>();
  @Output() repairNoteNotFound = new EventEmitter<RepairNote>();

  constructor(
    private logger: Logger,
    private repairNoteService: RepairNoteService) {
    throw exception('not implemented');
  }

  ngOnInit(): void {
    throw exception('not implemented');
  }

  onKeyUp(value: string): void {
    throw exception('not implemented');
  }

  onSearch(value: string): void {
    throw exception('not implemented');
  }
}

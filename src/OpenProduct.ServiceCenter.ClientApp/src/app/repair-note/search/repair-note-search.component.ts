import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RepairNoteService } from '../repair-note.service';
import { RepairNote } from '../models/repair-note';

@Component({
  selector: 'rnt-search',
  templateUrl: './repair-note-search.component.html',
  styleUrls: ['./repair-note-search.component.scss']
})
export class RepairNoteSearchComponent implements OnInit {
  @Output() repairNoteFound = new EventEmitter<RepairNote>();
  @Output() repairNoteNotFound = new EventEmitter<RepairNote>();

  constructor(private repairNoteService: RepairNoteService) { }

  ngOnInit(): void {
  }

  onKeyUp(value: string): void {

  }

  onSearch(value: string): void {
  }
}

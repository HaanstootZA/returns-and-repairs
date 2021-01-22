import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from 'src/app/core/logger.service';

import { RepairNote } from '../models/repair-note';
import { RepairNoteLine } from '../models/repair-note-line';
import { RepairNoteService } from '../repair-note.service';

@Component({
  selector: 'rnt-repair-note',
  templateUrl: './repair-note-detail.component.html',
  styleUrls: ['./repair-note-detail.component.scss']
})

export class RepairNoteDetailComponent implements OnInit {
  @Input() public repairNote: RepairNote;
  @Output() public lineSelected: EventEmitter<RepairNoteLine> = new EventEmitter<RepairNoteLine>();

  public selectedLine: RepairNoteLine | null;

  constructor(
    private logger: Logger,
    private route: ActivatedRoute,
    private repairNoteService: RepairNoteService
  ) {
    this.repairNote = { id: '', capturer: '', lines: [] };
    this.selectedLine = null;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.setRepairNoteByid(params.id);
    });
  }

  setRepairNoteByid(id: string): void {
    this.repairNoteService.getRepairNote(id).subscribe(
      (repairNote: RepairNote) => { this.repairNote = repairNote; },
      (error) => {},
      () => {});
  }

  selectLine(line: RepairNoteLine): void {
    this.selectedLine = line;
    this.lineSelected.emit(line);
  }
}

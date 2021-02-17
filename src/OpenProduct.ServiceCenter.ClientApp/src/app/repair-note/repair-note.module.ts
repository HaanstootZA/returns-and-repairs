import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { RepairNoteIndexComponent } from './repair-note-index.component';
import { RepairNoteSummaryComponent } from './summary/repair-note-summary.component';
import { RepairNoteDetailComponent } from './detail/repair-note-detail.component';
import { RepairNoteCaptureComponent } from './capture/repair-note-capture.component';
import { RepairNoteSearchComponent } from './search/repair-note-search.component';

@NgModule({
  declarations: [
    RepairNoteIndexComponent,
    RepairNoteDetailComponent,
    RepairNoteCaptureComponent,
    RepairNoteSearchComponent,
    RepairNoteSummaryComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    RepairNoteIndexComponent,
    RepairNoteDetailComponent,
    RepairNoteCaptureComponent,
    RepairNoteSearchComponent,
    RepairNoteSummaryComponent
  ]
})
export class RepairNoteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { RepairNoteDetailComponent } from './detail/repair-note-detail.component';
import { RepairNoteCaptureComponent } from './capture/repair-note-capture.component';
import { RepairNoteSearchComponent } from './search/repair-note-search.component';



@NgModule({
  declarations: [
    RepairNoteDetailComponent,
    RepairNoteCaptureComponent,
    RepairNoteSearchComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    RepairNoteDetailComponent,
    RepairNoteCaptureComponent,
    RepairNoteSearchComponent
  ]
})
export class RepairNotesModule { }

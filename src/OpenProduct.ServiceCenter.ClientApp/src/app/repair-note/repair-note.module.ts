import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { RepairNoteDashboardComponent } from './dashboard/repair-note-dashboard.component';
import { RepairNoteDetailComponent } from './detail/repair-note-detail.component';
import { RepairNoteCaptureComponent } from './capture/repair-note-capture.component';
import { RepairNoteSearchComponent } from './search/repair-note-search.component';



@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    RepairNoteDashboardComponent,
    RepairNoteDetailComponent,
    RepairNoteCaptureComponent
  ],
  declarations: [
    RepairNoteDashboardComponent,
    RepairNoteDetailComponent,
    RepairNoteCaptureComponent,
    RepairNoteSearchComponent
  ]
})
export class RepairNotesModule { }

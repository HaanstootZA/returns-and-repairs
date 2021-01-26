import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { RepairNoteDetailComponent } from './detail/repair-note-detail.component';
import { RepairNoteCaptureComponent } from './capture/repair-note-capture.component';
import { RepairNoteSearchComponent } from './search/repair-note-search.component';
import { RepairNoteIndexComponent } from './index/repair-note-index.component';

@NgModule({
  declarations: [
    RepairNoteDetailComponent,
    RepairNoteCaptureComponent,
    RepairNoteSearchComponent,
    RepairNoteIndexComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    RepairNoteDetailComponent,
    RepairNoteCaptureComponent,
    RepairNoteSearchComponent,
    RepairNoteIndexComponent
  ]
})
export class RepairNoteModule { }

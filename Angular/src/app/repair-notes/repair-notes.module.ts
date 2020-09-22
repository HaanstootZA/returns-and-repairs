import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RepairNoteComponent } from './repair-note/repair-note.component';
import { RepairNoteService } from './repair-note.service';



@NgModule({
  declarations: [
    DashboardComponent,
    RepairNoteComponent,
    RepairNoteService
  ],
  imports: [
    CommonModule
  ]
})
export class RepairNotesModule { }

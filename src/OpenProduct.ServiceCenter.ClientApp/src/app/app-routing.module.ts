import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairNoteDashboardComponent } from './repair-note/dashboard/repair-note-dashboard.component';
import { RepairNoteDetailComponent } from './repair-note/detail/repair-note-detail.component';
import { RepairNoteCaptureComponent } from './repair-note/capture/repair-note-capture.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'repair-notes', redirectTo: 'repair-notes/dashboard', pathMatch: 'full' },
  {
    path: 'repair-notes/dashboard',
    component: RepairNoteDashboardComponent,
    children: [
      { path: 'capture', component: RepairNoteCaptureComponent },
      { path: 'detail', component: RepairNoteDetailComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

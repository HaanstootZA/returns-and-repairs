import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairNoteDashboardComponent } from './dashboard/repair-notes/dashboard.component';
import { RepairNoteDetailComponent } from './repair-note/detail/repair-note-detail.component';
import { RepairNoteCaptureComponent } from './repair-note/capture/repair-note-capture.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent},
  { path: 'repair-note', redirectTo: 'repair-note/dashboard', pathMatch: 'full' },
  { path: 'repair-note/detail', component: RepairNoteDetailComponent },
  { path: 'repair-note/capture', component: RepairNoteCaptureComponent },
  { path: 'dashboard/repair-note', component: RepairNoteDashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

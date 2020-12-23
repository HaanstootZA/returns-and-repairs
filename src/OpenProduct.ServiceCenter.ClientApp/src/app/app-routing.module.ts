import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairNoteDashboardComponent } from './repair-note/dashboard/repair-note-dashboard.component';
import { RepairNoteDetailComponent } from './repair-note/detail/repair-note-detail.component';
import { RepairNoteCaptureComponent } from './repair-note/capture/repair-note-capture.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent},
  { path: 'repair-note', redirectTo: 'repair-note/dashboard', pathMatch: 'full' },
  { path: 'repair-note/detail', component: RepairNoteDetailComponent },
  { path: 'repair-note/capture', component: RepairNoteCaptureComponent },
  { path: 'repair-note/dashboard', component: RepairNoteDashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

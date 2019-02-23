import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoComponent } from './documento/documento.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  { path: '',
    component: DashboardComponent 
  },
  { path: 'dashboard',
    component: DashboardComponent 
  },
  { path: 'documento', 
    component: DocumentoComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

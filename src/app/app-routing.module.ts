import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoComponent } from './documento/documento.component'
import { SetorComponent } from './setor/setor.component'
import { SetorAddComponent } from './setor/add/setor-add.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard',
    component: DashboardComponent 
  },

  { path: 'documento', 
    component: DocumentoComponent 
  },

  { path: 'setor', 
    component: SetorComponent
  },
  { path: 'setor-add', 
    component: SetorAddComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

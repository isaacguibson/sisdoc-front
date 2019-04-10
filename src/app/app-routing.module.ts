import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoComponent } from './documento/documento.component'
import { OficioComponent } from './documento/add-oficio/oficio.component'
import { SetorComponent } from './setor/setor.component'
import { SetorAddComponent } from './setor/add/setor-add.component'
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard',
    component: DashboardComponent 
  },

  { path: 'documento', 
    component: DocumentoComponent 
  },

  { path: 'oficio-add', 
    component: OficioComponent 
  },

  { path: 'setor', 
    component: SetorComponent
  },
  { path: 'setor-add', 
    component: SetorAddComponent 
  },
  
  { path: 'tipo-documento', 
    component: TipoDocumentoComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

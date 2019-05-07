import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoComponent } from './sisdoc/documento/documento.component'
import { OficioComponent } from './sisdoc/documento/add-oficio/oficio.component'
import { SetorComponent } from './sisdoc/setor/setor.component'
import { SetorAddComponent } from './sisdoc/setor/add/setor-add.component'
import { TipoDocumentoComponent } from './sisdoc/tipo-documento/tipo-documento.component'
import { DashboardComponent } from './sisdoc/dashboard/dashboard.component'
import { SisdocComponent } from './sisdoc/sisdoc.component'

const routes: Routes = [

  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },

  { path: '', redirectTo: 'sisdoc/dashboard', pathMatch: 'full' },

  { path: 'sisdoc', redirectTo: 'sisdoc/dashboard', pathMatch: 'full' },

  { path: 'sisdoc',
    component: SisdocComponent,
    children: [
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
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

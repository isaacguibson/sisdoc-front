import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

import { DashboardComponent } from './sisdoc/dashboard/dashboard.component';
import { SisdocComponent } from './sisdoc/sisdoc.component';
import { DocumentoComponent } from './sisdoc/documento/documento.component';
import { OficioComponent } from './sisdoc/documento/add-oficio/oficio.component';
import { SetorComponent } from './sisdoc/setor/setor.component';
import { SetorAddComponent } from './sisdoc/setor/add/setor-add.component';
import { TipoDocumentoComponent } from './sisdoc/tipo-documento/tipo-documento.component';
import { CargoComponent } from './sisdoc/cargo/cargo.component';
import { CargoAddComponent } from './sisdoc/cargo/add/add.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },

  { path: 'sisdoc',
    component: SisdocComponent,
    children: [

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

      { path: 'cargo', 
        component: CargoComponent
      },

      { path: 'setor-edit/:id', 
        component: SetorAddComponent
      },

      { path: 'setor-add', 
        component: SetorAddComponent
      },

      { path: 'cargo-add', 
        component: CargoAddComponent
      },
      
      { path: 'tipo-documento', 
        component: TipoDocumentoComponent
      }
    ]
    //, canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

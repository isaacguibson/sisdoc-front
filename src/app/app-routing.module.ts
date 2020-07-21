import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

import { DashboardComponent } from './sisdoc/dashboard/dashboard.component';
import { SisdocComponent } from './sisdoc/sisdoc.component';
import { DocumentoComponent } from './sisdoc/documento/documento.component';
import { OficioComponent } from './sisdoc/documento/add-oficio/oficio.component';
import { SetorComponent } from './sisdoc/setor/setor.component';
import { SetorAddComponent } from './sisdoc/setor/add/setor-add.component';
import { ColegiadoComponent } from './sisdoc/colegiado/colegiado.component';
import { ColegiadoAddComponent } from './sisdoc/colegiado/add/add.component';
import { TipoDocumentoComponent } from './sisdoc/tipo-documento/tipo-documento.component';
import { CargoComponent } from './sisdoc/cargo/cargo.component';
import { CargoAddComponent } from './sisdoc/cargo/add/add.component';
import { PerfilComponent } from './sisdoc/perfil/perfil.component';
import { AddPortariaComponent } from './sisdoc/documento/add-portaria/add-portaria.component';
import { AddDeclaracaoComponent } from './sisdoc/documento/add-declaracao/add-declaracao.component';
import { AddDespachoComponent } from './sisdoc/documento/add-despacho/add-despacho.component';
import { AddRequerimentoComponent } from './sisdoc/documento/add-requerimento/add-requerimento.component';
import { AddAtaComponent } from './sisdoc/documento/add-ata/add-ata.component';

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
      { path: 'portaria-add', 
        component: AddPortariaComponent
      },
      { path: 'declaracao-add', 
        component: AddDeclaracaoComponent
      },
      { path: 'despacho-add', 
        component: AddDespachoComponent
      },
      { path: 'requerimento-add', 
        component: AddRequerimentoComponent
      },
      { path: 'ata-add', 
        component: AddAtaComponent
      },
      { path: 'oficio-add/:id', 
        component: OficioComponent
      },
      { path: 'declaracao-add/:id', 
        component: AddDeclaracaoComponent
      },
      { path: 'portaria-add/:id', 
        component: AddPortariaComponent
      },
      { path: 'despacho-add/:id', 
        component: AddDespachoComponent
      },
      { path: 'requerimento-add/:id', 
        component: AddRequerimentoComponent
      },
      { path: 'ata-add/:id', 
        component: AddAtaComponent
      },
      { path: 'setor', 
        component: SetorComponent
      },
      { path: 'colegiado', 
        component: ColegiadoComponent
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
      { path: 'colegiado-add', 
        component: ColegiadoAddComponent
      },
      { path: 'colegiado-edit/:id', 
        component: ColegiadoAddComponent
      },
      { path: 'cargo-add', 
        component: CargoAddComponent
      },
      { path: 'cargo-edit/:id', 
        component: CargoAddComponent
      },
      { path: 'tipo-doc', 
        component: TipoDocumentoComponent
      },
      { path: 'perfil', 
        component: PerfilComponent
      }
    ]
    , canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

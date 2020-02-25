import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EditorModule} from 'primeng/editor';
import { QuillModule } from 'ngx-quill';

// SERVICES
import { LoginService } from 'src/services/login.service';
import { DocumentoService } from '../services/documento.service';
import { PaginatorService } from '../services/paginator.service';
import { SetorService } from 'src/services/setor.service';
import { CargoService } from 'src/services/cargo.service';
import { UsuarioService } from 'src/services/usuario.service';
import { ColegiadoService } from 'src/services/colegiado.service';
import { TipoDocumentoService } from 'src/services/tipo-documento.service';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { AuthService } from 'src/services/auth.service';
import { JwtHelperService, JwtModule} from '@auth0/angular-jwt';

// HttpClient
import { HttpClientModule } from '@angular/common/http';

//TEXT EDITOR
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//Components
import { SisdocComponent } from './sisdoc/sisdoc.component';
import { DashboardComponent } from './sisdoc/dashboard/dashboard.component';
import { DocumentoComponent } from './sisdoc/documento/documento.component';
import { SetorComponent } from './sisdoc/setor/setor.component';
import { TipoDocumentoComponent } from './sisdoc/tipo-documento/tipo-documento.component';
import { OficioComponent } from './sisdoc/documento/add-oficio/oficio.component';
import { SetorAddComponent } from './sisdoc/setor/add/setor-add.component';
import { CargoComponent } from './sisdoc/cargo/cargo.component';
import { CargoAddComponent } from './sisdoc/cargo/add/add.component';
import { PerfilComponent } from './sisdoc/perfil/perfil.component';
import { AddPortariaComponent } from './sisdoc/documento/add-portaria/add-portaria.component';
import { AddDeclaracaoComponent } from './sisdoc/documento/add-declaracao/add-declaracao.component';
import { AddDespachoComponent } from './sisdoc/documento/add-despacho/add-despacho.component';
import { AddRequerimentoComponent } from './sisdoc/documento/add-requerimento/add-requerimento.component';
import { AddAtaComponent } from './sisdoc/documento/add-ata/add-ata.component';

@NgModule({
  
  declarations: [
    AppComponent,
    SisdocComponent,
    DashboardComponent,
    DocumentoComponent,
    SetorComponent,
    SetorAddComponent,
    TipoDocumentoComponent,
    OficioComponent,
    CargoComponent,
    CargoAddComponent,
    PerfilComponent,
    AddPortariaComponent,
    AddDeclaracaoComponent,
    AddDespachoComponent,
    AddRequerimentoComponent,
    AddAtaComponent
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    EditorModule,
    QuillModule.forRoot(),

    /* TEXT EDITOR */ CKEditorModule,

    /* Http Client */ HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [LoginService,
    PaginatorService,
    DocumentoService,
    CargoService,
    SetorService,
    UsuarioService,
    ColegiadoService,
    TipoDocumentoService,
    AuthGuardService,
    AuthService,
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

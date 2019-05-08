import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DocumentoComponent } from './sisdoc/documento/documento.component';
import { OficioComponent } from './sisdoc/documento/add-oficio/oficio.component'
import { SetorComponent } from './sisdoc/setor/setor.component';
import { SetorAddComponent } from './sisdoc/setor/add/setor-add.component';
import { TipoDocumentoComponent } from './sisdoc/tipo-documento/tipo-documento.component';
import { DashboardComponent } from './sisdoc/dashboard/dashboard.component';
import { SisdocComponent } from './sisdoc/sisdoc.component';

// SERVICES
import { LoginService } from 'src/services/login.service';
import { DocumentoService } from '../services/documento.service';
import { SetorService } from 'src/services/setor.service';
import { TipoDocumentoService } from 'src/services/tipo-documento.service';

// HttpClient
import { HttpClientModule } from '@angular/common/http';

//TEXT EDITOR
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    DocumentoComponent,
    OficioComponent,
    DashboardComponent,
    SetorComponent,
    SetorAddComponent,
    TipoDocumentoComponent,
    SisdocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    /* TEXT EDITOR */ CKEditorModule,

    /* Http Client */ HttpClientModule
  ],
  providers: [LoginService, DocumentoService, SetorService, TipoDocumentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

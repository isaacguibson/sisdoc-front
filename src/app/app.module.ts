import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentoComponent } from './documento/documento.component';
import { SetorComponent } from './setor/setor.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// SERVICES
import { DocumentoService } from '../services/documento.service';
import { SetorService } from 'src/services/setor.service';

// HttpClient
import { HttpClientModule } from '@angular/common/http';

//TEXT EDITOR
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    AppComponent,
    DocumentoComponent,
    DashboardComponent,
    SetorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    /* TEXT EDITOR */ CKEditorModule,

    /* Http Client */ HttpClientModule
  ],
  providers: [DocumentoService, SetorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

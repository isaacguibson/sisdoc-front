import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SisdocRoutingModule } from './sisdoc-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentoComponent } from './documento/documento.component';
import { SetorComponent } from './setor/setor.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';

@NgModule({
  declarations: [DashboardComponent, DocumentoComponent, SetorComponent, TipoDocumentoComponent],
  imports: [
    CommonModule,
    SisdocRoutingModule
  ]
})
export class SisdocModule { }

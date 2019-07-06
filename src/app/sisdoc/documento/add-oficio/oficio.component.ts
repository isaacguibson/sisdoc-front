import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

//Services
import { DocumentoService } from '../../../../services/documento.service'

// Interfaces
import { Documento } from '../../../../models/documento.model'

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-oficio',
  templateUrl: './oficio.component.html',
  styleUrls: ['./oficio.component.css']
})
export class OficioComponent implements OnInit {

  public Editor = ClassicEditor;

  documento: Documento;

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService,
    public router: Router
  ) {

    this.documento = this.newOficio()
   }

  ngOnInit() {
    /* ON INIT FUNCTION */
  }

  newOficio(): Documento{
    return {
      conteudo: null
    };
  }

  salvar(){

    this.documentoService.save(this.documento, 'oficio');
  }

  cancelar(){
    this.router.navigate(['/sisdoc/documento']);
  }

}

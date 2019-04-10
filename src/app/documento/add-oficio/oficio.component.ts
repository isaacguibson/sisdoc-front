import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Services
import { DocumentoService } from '../../../services/documento.service'

// Interfaces
import { Documento } from '../../../models/documento.model'

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
    public documentoService: DocumentoService
  ) {

    this.documento = this.newOficio()
   }

  ngOnInit() {
    /* ON INIT FUNCTION */
  }

  newOficio(): Documento{
    return {
      texto: null
    };
  }

  salvar(){
    this.documentoService.save(this.documento);
  }

}

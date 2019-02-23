import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Services
import { DocumentoService } from '../../services/documento.service'

// Interfaces
import { Documento } from '../../models/documento.model'

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  public Editor = ClassicEditor;

  documento: Documento;

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService
  ) {

    this.documento = this.newDocumento()
   }

  ngOnInit() {
    /* ON INIT FUNCTION */
  }

  newDocumento(): Documento{
    return {
      texto: null
    };
  }

  salvar(){
    this.documentoService.save(this.documento);
  }

}

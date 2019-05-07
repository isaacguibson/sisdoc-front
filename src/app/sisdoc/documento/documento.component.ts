import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Services
import { DocumentoService } from '../../../services/documento.service'

// Interfaces
import { Documento } from '../../../models/documento.model'

import {Router} from "@angular/router"

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  documento: Documento;
  searchResult = null;
  contentList = [];

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService,
    public router: Router
  ) {
    this.documento = this.newDocumento();
   }

  ngOnInit() {
    /* ON INIT FUNCTION */
  }

  newDocumento(): Documento{
    return {
      texto: null
    };
  }

  adicionarNovo(){
    this.router.navigate(['/oficio-add']);
  }

  pesquisar(){

    let pageableObj = {
      size:null,
      number:null,
      totalPages:null
    }

    this.documentoService.pesquisar().then(data => {
          console.log(data);

          this.searchResult = data;
          this.contentList = this.searchResult['content'];

          pageableObj.size = this.searchResult['size'];
          pageableObj.number = this.searchResult['number'];
          pageableObj.totalPages = this.searchResult['totalPages'];

          console.log(pageableObj );
      }).catch(error =>{
          console.log(error);
          this.contentList = [];
      })
    
  }

  downloadDocument(idTipoDocumento, idDocumento, tipoDocumentoNome){
    this.documentoService.download(idTipoDocumento, idDocumento).then(response => {
      
      var newBlob = new Blob([response], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
      }

      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = "Documento_"+tipoDocumentoNome+"_"+idDocumento+".pdf";
      
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);

    }).catch(error =>{
      console.log(error);
    });
  }

}

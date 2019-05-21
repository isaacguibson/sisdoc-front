import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Services
import { DocumentoService } from '../../../services/documento.service'
import { PaginatorService } from '../../../services/paginator.service'

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

  paginator = null;

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService,
    public paginatorService: PaginatorService,
    public router: Router
  ) {
    this.documento = this.newDocumento();
    this.paginator = this.paginatorService.newPaginator();
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

  pesquisar(page){

    this.paginator.currentPage = page;

    this.documentoService.pesquisar(this.paginator.currentPage, this.paginator.size).then(data => {
          console.log(data);

          this.searchResult = data;
          this.contentList = this.searchResult['content'];

          this.paginator 
            = this.paginatorService.fillPaginator(this.searchResult['totalPages'],
                                                  this.searchResult['totalElements'],
                                                  this.paginator.currentPage,
                                                  this.paginator.size);

            console.log(this.paginator);                                                  
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

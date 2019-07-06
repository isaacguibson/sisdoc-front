import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Services
import { DocumentoService } from '../../../services/documento.service';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import { PaginatorService } from '../../../services/paginator.service';

// Interfaces
import { Documento } from '../../../models/documento.model';

import {Router} from "@angular/router";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  documento: Documento;
  searchResult = null;
  contentList = [];

  tipoDocsList:any = [];
  htmlSelectString = null;

  paginator = null;

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService,
    public paginatorService: PaginatorService,
    public tipoDocumentoService: TipoDocumentoService,
    public router: Router
  ) {
    this.documento = this.newDocumento();
    this.paginator = this.paginatorService.newPaginator();
   }

  ngOnInit() {
    /* ON INIT FUNCTION */
    this.fillTipoDocLit();
  }

  newDocumento(): Documento{
    return {
      conteudo: null
    };
  }

  adicionarNovo(){

    Swal.fire({
      title: 'Escolha o tipo de documento',
      type: 'info',
      html: this.htmlSelectString,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'OK',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        'Cancelar',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then(result => {

      var element = document.getElementById("selectTipoDoc");
      var value = element['options'][element['selectedIndex']].value;

      switch (value) {
        case '1':
          this.router.navigate(['/sisdoc/oficio-add']);
          break;
      }
    });
  }

  pesquisar(page){

    this.paginator.currentPage = page;

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    this.documentoService.pesquisar(this.paginator.currentPage, this.paginator.size).then(data => {
          console.log(data);

          this.searchResult = data;
          this.contentList = this.searchResult['content'];

          this.paginator 
            = this.paginatorService.fillPaginator(this.searchResult['totalPages'],
                                                  this.searchResult['totalElements'],
                                                  this.paginator.currentPage,
                                                  this.paginator.size);

          Swal.close();
                                                              
      }).catch(error =>{
          console.log(error);
          this.contentList = [];
          Swal.close();
      })
    
  }

  downloadDocument(idTipoDocumento, idDocumento, tipoDocumentoNome){

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

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

      Swal.close();
    }).catch(error =>{
      console.log(error);
    });
  }

  fillTipoDocLit(){
    this.tipoDocumentoService.listar().then(data => {
      this.tipoDocsList = data;
      this.buildHtmlSelect();
    });
  }

  buildHtmlSelect(){

    this.htmlSelectString = '<select id="selectTipoDoc" class="custom-select">';
    this.htmlSelectString += '<option value="">Selecione</option>';

    for (let index in this.tipoDocsList){
      this.htmlSelectString += '<option value="'+this.tipoDocsList[index]['id']+'">'+this.tipoDocsList[index]['nome']+'</option>';
    }

    this.htmlSelectString += '</select>';
  }

}

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
  documentoSearch: Documento;
  searchResult = null;
  contentList = [];
  contentReceivedList = [];

  tipoDocsList:any = [];
  htmlSelectString = null;

  paginator = null;
  paginatorRecebidos = null;

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService,
    public paginatorService: PaginatorService,
    public tipoDocumentoService: TipoDocumentoService,
    public router: Router
  ) {
    this.documento = this.newDocumento();
    this.documentoSearch = this.newDocumento();
    this.paginator = this.paginatorService.newPaginator();
    this.paginatorRecebidos = this.paginatorService.newPaginator();
   }

  ngOnInit() {
    /* ON INIT FUNCTION */
    this.fillTipoDocList();
  }

  newDocumento(): Documento{
    return new Documento();
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

      if(result.value){
        var element = document.getElementById("selectTipoDoc");
        var value = element['options'][element['selectedIndex']].value;

        switch (value) {
          case '1': //Oficio
            this.router.navigate(['/sisdoc/oficio-add']);
            break;
          case '3': //PORTARIA
            this.router.navigate(['/sisdoc/portaria-add']);
            break;
          case '4': //REQUERIMENTO
            this.router.navigate(['/sisdoc/requerimento-add']);
            break;
          case '5': //DECLARAÇÃO
            this.router.navigate(['/sisdoc/despacho-add']);
            break;
          case '6': //DECLARAÇÃO
            this.router.navigate(['/sisdoc/declaracao-add']);
            break;
          case '7': //ATA
            this.router.navigate(['/sisdoc/ata-add']);
            break;
        }
      }
      
    });
  }

  /**
  * tipoLista: [ambos, enviados, recebidos]
  */
  pesquisar(page, tipoLista){

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    switch (tipoLista) {
      case 'ambos':
        this.pesquisarEnviados(page);
        this.pesquisarRecebidos(page);
        break;
      case 'enviados':
        this.pesquisarEnviados(page);
        break;
      case 'recebidos':
        this.pesquisarRecebidos(page);
        break;
      default:
        Swal.close();
    }
    
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

  deletar(id){

    Swal.fire({
      title: 'Tem certeza, que deseja deletar este registro?',
      text: "Esta operação não pode ser desfeita",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Não'
    }).then((result) => {

      //Delete apenas se usuario clicar em sim
      if(result.dismiss != Swal.DismissReason.cancel){
        this.documentoService.deletar(id).then(data => {
            
          Swal.close();
          this.pesquisaAposDelecao();
          
      }).catch(error =>{
          Swal.close();
          this.documentoService.showErrorMessage();
      });
      }
    });

  }

  pesquisaAposDelecao(){

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    if(this.paginator.currentPage == this.paginator.totalPages - 1 ){
      if((this.paginator.totalElements % this.paginator.size) == 1){
        this.paginator.currentPage = this.paginator.currentPage - 1;
      }
    }

    this.pesquisarEnviados(this.paginator.currentPage);
  }

  fillTipoDocList(){
    this.tipoDocumentoService.listar().then(data => {
      this.tipoDocsList = data;
      this.buildHtmlSelect();
    });
  }

  pesquisarEnviados(page){

    this.paginator.currentPage = page;

    this.documentoService.pesquisarEnviados(this.paginator.currentPage, 
      this.paginator.size, localStorage.getItem('userId'), this.documentoSearch).then(data => {
        
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
    });

  }

  pesquisarRecebidos(page){

    this.paginatorRecebidos.currentPage = page;

    this.documentoService.pesquisarRecebidos(this.paginatorRecebidos.currentPage, 
      this.paginatorRecebidos.size, localStorage.getItem('userId'), this.documentoSearch).then(data => {
        
        this.searchResult = data;
        this.contentReceivedList = this.searchResult['content'];

        console.log(this.searchResult['content']);

        this.paginatorRecebidos
          = this.paginatorService.fillPaginator(this.searchResult['totalPages'],
                                                this.searchResult['totalElements'],
                                                this.paginatorRecebidos.currentPage,
                                                this.paginatorRecebidos.size);

        Swal.close();
                                                            
    }).catch(error =>{
        console.log(error);
        this.contentList = [];
        Swal.close();
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

  editar(id, tipoDocId){

    //OFICIO
    if(tipoDocId == 1){
      this.router.navigate(['/sisdoc/oficio-add/'+id]);
    } else if (tipoDocId == 3) {
      this.router.navigate(['/sisdoc/portaria-add/'+id]);
    } else if(tipoDocId === 5){
      this.router.navigate(['/sisdoc/despacho-add/'+id]);
    } else if(tipoDocId === 4){
      this.router.navigate(['/sisdoc/requerimento-add/'+id]);
    } else if (tipoDocId == 6) {
      this.router.navigate(['/sisdoc/declaracao-add/'+id]);
    } else if (tipoDocId == 7) {
      this.router.navigate(['/sisdoc/ata-add/'+id]);
    }

  }

  enviar(id){
    Swal.showLoading();

    this.documentoService.enviar(id).then(response => {
      
      if(response == true){
        this.contentList.find(x => x.id == id).enviada=true;
      }

      Swal.close();
    }).catch(erro => {
      Swal.close();
    });
  }

  cancelarEnvio(id){
    Swal.showLoading();
    
    this.documentoService.cancelarEnvio(id).then(response => {
      
      if(response == true){
        this.contentList.find(x => x.id == id).enviada=false;
      }

      Swal.close();
    }).catch(erro => {
      Swal.close();
    });
  }

}

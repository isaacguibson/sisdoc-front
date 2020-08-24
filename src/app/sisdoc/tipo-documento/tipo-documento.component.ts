import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { TipoDocumentoService } from '../../../services/tipo-documento.service';

// Interfaces
import { TipoDocumento } from '../../../models/tipo-documento.model';

import {Router} from "@angular/router";

import { PaginatorService } from '../../../services/paginator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  tipoDocumento: TipoDocumento;
  tipoDocumentoSearch: TipoDocumento;
  searchResult = null;
  contentList = [];

  paginator = null;

  constructor(
    public httpClient: HttpClient,
    public tipoDocumentoService: TipoDocumentoService,
    public paginatorService: PaginatorService,
    public router: Router
  ) {

    this.tipoDocumento = this.newTipoDocumento();
    this.tipoDocumentoSearch = this.newTipoDocumento();

    this.paginator = this.paginatorService.newPaginator();
    this.pesquisar(0);

  }

   ngOnInit() {
  }

  newTipoDocumento(){

    return {
      id: null,
      nome: null
    }

  }

  adicionarNovo(){
    // this.router.navigate(['/sisdoc/tipo-documento-add']);
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
    
    this.tipoDocumentoService.pesquisar(this.paginator.currentPage, 10, this.tipoDocumentoSearch).then(data => {
          
          this.searchResult = data;
          this.contentList = this.searchResult['content'];

          this.paginator 
            = this.paginatorService.fillPaginator(this.searchResult['totalPages'],
                                                  this.searchResult['totalElements'],
                                                  this.paginator.currentPage,
                                                  this.paginator.size);
          
          Swal.close();
      }).catch(error =>{
          this.contentList = [];
          Swal.close();
      })
    
  }

  salvar(){

    this.tipoDocumentoService.save(this.tipoDocumento);

  }

  editar(id){

    this.router.navigate(['/sisdoc/cargo-edit/'+id]);
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
        this.tipoDocumentoService.deletar(id);
      }
    });

  }

  limpar() {
    this.tipoDocumentoSearch = this.newTipoDocumento();
    this.pesquisar(0);
  }

}
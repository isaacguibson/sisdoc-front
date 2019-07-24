import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { SetorService } from '../../../services/setor.service'

// Interfaces
import { Setor } from '../../../models/setor.model'

import {Router} from "@angular/router"

import { PaginatorService } from '../../../services/paginator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {

  setor: Setor;
  searchResult = null;
  contentList = [];

  paginator = null;

  constructor(
    public httpClient: HttpClient,
    public setorService: SetorService,
    public paginatorService: PaginatorService,
    public router: Router
  ) {

    this.setor = this.newSetor();
    // this.pesquisar();
    this.paginator = this.paginatorService.newPaginator();
   }

   ngOnInit() {
  }

  newSetor(){

    return {
      id: null,
      nome: null
    }

  }

  adicionarNovo(){
    this.router.navigate(['/sisdoc/setor-add']);
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

    this.setorService.pesquisar(this.paginator.currentPage, this.paginator.size).then(data => {
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

  salvar(){

    this.setorService.save(this.setor);

  }

  editar(id){

    this.router.navigate(['/sisdoc/setor-edit/'+id]);
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
        this.setorService.deletar(id)
        .then(data => {
            
            Swal.close();
            this.setorService.showDeletedMessage();
            this.pesquisaAposDelecao();
            
        }).catch(error =>{
            console.log(error);
            Swal.close();
            this.setorService.showErrorMessage();
        });
      }
    });

  }

  pesquisaAposDelecao(){
    if(this.paginator.currentPage == this.paginator.totalPages - 1 ){
      if((this.paginator.totalElements % this.paginator.size) == 1){
        console.log("AQUIIII");
        this.pesquisar(this.paginator.currentPage - 1);
      }
    } else {
      this.pesquisar(this.paginator.currentPage);
    }
  }

}
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { CargoService } from '../../../services/cargo.service'

// Interfaces
import { Cargo } from '../../../models/cargo.model'

import {Router} from "@angular/router"

import { PaginatorService } from '../../../services/paginator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  cargo: Cargo;
  searchResult = null;
  contentList = [];

  paginator = null;

  constructor(
    public httpClient: HttpClient,
    public cargoService: CargoService,
    public paginatorService: PaginatorService,
    public router: Router
  ) { 

    this.cargo = this.newCargo();
    // this.pesquisar();
    this.paginator = this.paginatorService.newPaginator();

  }

  newCargo(){

    return {
      id: null,
      nome: null,
      setorId: null
    }

  }

  ngOnInit() {
  }

  adicionarNovo(){
    this.router.navigate(['/sisdoc/cargo-add']);
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

    this.cargoService.pesquisar(this.paginator.currentPage, this.paginator.size).then(data => {
          
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

    this.cargoService.save(this.cargo);

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
        this.cargoService.deletar(id).then(data => {
            
          Swal.close();
          // this.cargoService.showDeletedMessage();
          Swal.fire('Registro deletado', 'Operação de deleção realizada com sucesso', 'success');
          this.pesquisaAposDelecao();
          
      }).catch(error =>{
          Swal.close();
          this.cargoService.showErrorMessage();
      });
      }
    });

  }

  pesquisaAposDelecao(){
    if(this.paginator.currentPage == this.paginator.totalPages - 1 ){
      if((this.paginator.totalElements % this.paginator.size) == 1){
        this.pesquisar(this.paginator.currentPage - 1);
      }
    } else {
      this.pesquisar(this.paginator.currentPage);
    }
  }
}

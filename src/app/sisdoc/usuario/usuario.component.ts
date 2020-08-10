import { Component, OnInit } from '@angular/core';
import { PaginatorService } from '../../../services/paginator.service';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/models/usuario.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  contentList;
  paginator = null;
  usuarioSearch: Usuario;
  searchResult = null;
  constructor(public paginatorService: PaginatorService,
              public usuarioService: UsuarioService,
              public router: Router) {
    this.paginator = this.paginatorService.newPaginator();
    this.usuarioSearch = new Usuario();
    this.usuarioSearch.nome = null;
    this.usuarioSearch.email = null;
    this.contentList = [];

    this.pesquisar(0);
  }

  ngOnInit() {
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

    this.usuarioService.pesquisar(this.paginator.currentPage,
                                  this.paginator.size,
                                  this.usuarioSearch).then(res => {

      this.searchResult = res;
      this.contentList = this.searchResult['content'];

      this.paginator 
            = this.paginatorService.fillPaginator(this.searchResult['totalPages'],
                                                  this.searchResult['totalElements'],
                                                  this.paginator.currentPage,
                                                  this.paginator.size);

      Swal.close();
    }).catch(err => {
      console.log(err);
      Swal.close();
      this.contentList = [];
    });
  }

  adicionarNovo(){
    this.router.navigate(['/sisdoc/usuario-add']);
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
        this.usuarioService.deletar(id)
        .then(data => {
            
            Swal.close();
            this.usuarioService.showDeletedMessage();
            this.pesquisaAposDelecao();
            
        }).catch(error =>{
            console.log(error);
            Swal.close();
            this.usuarioService.showErrorMessage();
        });
      }
    });

  }

  pesquisaAposDelecao(){
    if(this.paginator.currentPage == this.paginator.totalPages - 1 ){
      if((this.paginator.totalElements % this.paginator.size) == 1){
        this.pesquisar(this.paginator.currentPage - 1);
      } else {
        this.pesquisar(this.paginator.currentPage);
      }
    } else {
      this.pesquisar(this.paginator.currentPage);
    }
  }

}

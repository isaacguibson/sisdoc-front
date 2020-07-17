import { Component, OnInit } from '@angular/core';
import { PaginatorService } from '../../../services/paginator.service';
import { ColegiadoService } from '../../../services/colegiado.service';
import { Colegiado } from 'src/models/colegiado.model';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-colegiado',
  templateUrl: './colegiado.component.html',
  styleUrls: ['./colegiado.component.css']
})
export class ColegiadoComponent implements OnInit {

  paginator = null;
  colegiadoSearch = new Colegiado();
  searchResult = null;
  contentList = [];
  constructor(public paginatorService: PaginatorService,
              public colegiadoService: ColegiadoService,
              public router: Router) {

      this.paginator = this.paginatorService.newPaginator();
      this.pesquisar(0);

  }

  ngOnInit() {
  }

  pesquisar(page) {

    this.paginator.currentPage = page;
    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    this.colegiadoService.pesquisar(this.paginator.currentPage, this.paginator.size, this.colegiadoSearch).then(data => {
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

  adicionarNovo() {
    this.router.navigate(['/sisdoc/colegiado-add']);
  }

  editar(id){

    this.router.navigate(['/sisdoc/colegiado-edit/'+id]);
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
        this.colegiadoService.deletar(id)
        .then(data => {
            
            Swal.close();
            this.colegiadoService.showDeletedMessage();
            this.pesquisaAposDelecao();
            
        }).catch(error =>{
            console.log(error);
            Swal.close();
            this.colegiadoService.showErrorMessage();
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

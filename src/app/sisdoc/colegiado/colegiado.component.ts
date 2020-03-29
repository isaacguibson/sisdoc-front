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

}

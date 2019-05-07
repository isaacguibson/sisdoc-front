import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { SetorService } from '../../../services/setor.service'

// Interfaces
import { Setor } from '../../../models/setor.model'

import {Router} from "@angular/router"

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {

  setor: Setor;
  searchResult = null;
  contentList = [];

  constructor(
    public httpClient: HttpClient,
    public setorService: SetorService,
    public router: Router
  ) {

    this.setor = this.newSetor();
    // this.pesquisar();

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
    this.router.navigate(['/setor-add']);
  }

  pesquisar(){
    
    this.setorService.pesquisar().then(data => {
          console.log(data);
          this.searchResult = data;
          this.contentList = this.searchResult['content'];
      }).catch(error =>{
          console.log(error);
          this.contentList = [];
      })
    
  }

  salvar(){

    this.setorService.save(this.setor);

  }

}
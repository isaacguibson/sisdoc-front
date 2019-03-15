import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { TipoDocumentoService } from '../../services/tipo-documento.service'

// Interfaces
import { TipoDocumento } from '../../models/tipo-documento.model'

import {Router} from "@angular/router"

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  tipoDocumento: TipoDocumento;
  searchResult = null;
  contentList = [];

  constructor(
    public httpClient: HttpClient,
    public tipoDocumentoService: TipoDocumentoService,
    public router: Router
  ) {

    this.tipoDocumento = this.newTipoDocumento();

  }

   ngOnInit() {
  }

  newTipoDocumento(){

    return {
      id: null,
      nome: null
    }

  }

  pesquisar(){
    
    this.tipoDocumentoService.pesquisar().then(data => {
          console.log(data);
          this.searchResult = data;
          this.contentList = this.searchResult['content'];
      }).catch(error =>{
          console.log(error);
          this.contentList = [];
      })
    
  }

}
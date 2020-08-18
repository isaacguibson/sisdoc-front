import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { SetorService } from '../../../../services/setor.service'

// Interfaces
import { Setor } from '../../../../models/setor.model'

import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setor-add',
  templateUrl: './setor-add.component.html',
  styleUrls: ['./setor-add.component.css']
})
export class SetorAddComponent implements OnInit {

  setor: Setor;

  constructor(
    public httpClient: HttpClient,
    public setorService: SetorService,
    public router: Router,
    public activeRoute: ActivatedRoute
  ) {
    this.setor = this.newSetor();

    let id = this.activeRoute.snapshot.paramMap.get("id");

    if(id){
      this.setorService.get(id).then(data => {

        this.setor.id=data["id"];
        this.setor.nome=data["nome"];
        this.setor.sigla=data["sigla"];
      });
    } else {
      this.setor = this.newSetor();
    }

   }

   ngOnInit() {
  }

  newSetor(){

    return {
      id: null,
      nome: null,
      sigla: null
    }

  }

  salvar(){

    if(!this.validar()){
      return;
    }
    
    this.setorService.save(this.setor);
    
    this.router.navigate(['/sisdoc/setor']);
  }

  validar(): Boolean {
    if (!this.setor.nome || this.setor.nome === '') {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de informar o nome.', 'error');
      return false;
    }

    return true;
  }
  
  voltar(){
    this.router.navigate(['/sisdoc/setor']);
  }

}
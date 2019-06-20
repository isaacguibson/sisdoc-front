import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { SetorService } from '../../../../services/setor.service'

// Interfaces
import { Setor } from '../../../../models/setor.model'

import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';

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
      nome: null
    }

  }

  salvar(){

    this.setorService.save(this.setor);
    
    this.router.navigate(['/sisdoc/setor']);
  }

  

  voltar(){
    this.router.navigate(['/sisdoc/setor']);
  }

}
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { SetorService } from '../../../services/setor.service'

// Interfaces
import { Setor } from '../../../models/setor.model'

import {Router} from "@angular/router"
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
    public router: Router
  ) {

    this.setor = this.newSetor();

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
    this.showSavedMessage();
    this.router.navigate(['/setor']);
  }

  showSavedMessage(){
    swal.fire('Registro Salvo', 'Um novo setor foi criado com sucesso', 'success');
  }

  voltar(){
    this.router.navigate(['/setor']);
  }

}
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Services
import { SetorService } from '../../services/setor.service'

// Interfaces
import { Setor } from '../../models/setor.model'

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {

  setor: Setor;  

  constructor(
    public httpClient: HttpClient,
    public setorService: SetorService
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
    console.log(this.setor)
    this.setorService.save(this.setor);
  }  

}

import { Component } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import {Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-sisdoc',
  templateUrl: './sisdoc.component.html',
  styleUrls: ['./sisdoc.component.css']
})
export class SisdocComponent {

  usuario :Usuario

  constructor(
    public router: Router,
    public location: Location
  ) { 

    this.usuario = this.getUserLogado();

  }

  getUserLogado(){
    return {
      id: parseInt(localStorage.getItem("userId")),
      nome: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      setor: null,
      cargo: null,
      tratamento: localStorage.getItem("userTreatment"),
      nomeSetor: localStorage.getItem("userDepartment"),
      nomeCargo: localStorage.getItem("userOffice")
    }
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

}

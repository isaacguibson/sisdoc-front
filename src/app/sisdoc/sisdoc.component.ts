import { Component } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-sisdoc',
  templateUrl: './sisdoc.component.html',
  styleUrls: ['./sisdoc.component.css']
})
export class SisdocComponent {

  usuario :Usuario

  constructor() { 

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

}

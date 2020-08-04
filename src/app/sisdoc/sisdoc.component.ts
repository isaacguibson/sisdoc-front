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
  admin = false;
  permissoes = [];
  constructor(
    public router: Router,
    public location: Location
  ) { 

    (localStorage.getItem('permissions').split(',')).forEach(permissao => {
      this.permissoes.push(Number.parseInt(permissao));
    });

    this.usuario = this.getUserLogado();
    if(this.usuario.nomeCargo === 'Administrador(a)') {
      this.admin = true;
    }
  }

  getUserLogado(){
    return {
      id: parseInt(localStorage.getItem("userId")),
      nome: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      senha: null,
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

  containsPermission(permissao: number): boolean {

    if(this.permissoes.includes(permissao)) {
      return true;
    } else {
      return false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario = null;

  constructor(public router: Router) {

    this.usuario = {
      id: localStorage.getItem("userId"),
      nome: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      cargo: localStorage.getItem("userOffice"),
      setor: localStorage.getItem("userDepartment")
    }
  }

  ngOnInit() {
  }

  editar(){
    this.router.navigate(['/sisdoc/usuario-edit/'+this.usuario.id]);
  }

}

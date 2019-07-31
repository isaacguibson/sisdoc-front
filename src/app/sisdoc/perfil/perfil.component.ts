import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario = null;

  constructor() {

    this.usuario = {
      nome: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      cargo: localStorage.getItem("userOffice"),
      setor: localStorage.getItem("userDepartment")
    }
  }

  ngOnInit() {
  }

}

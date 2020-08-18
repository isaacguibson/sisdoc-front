import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";

import { ActivatedRoute } from "@angular/router";

//Services
import { CargoService } from '../../../../services/cargo.service';
import { SetorService } from '../../../../services/setor.service';
import { Cargo } from 'src/models/cargo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class CargoAddComponent implements OnInit {

  listSetores;

  cargo: Cargo;

  constructor(
    public cargoService :CargoService,
    public setorService :SetorService,
    public router :Router,
    public activeRoute :ActivatedRoute
  ) {
    this.cargo = this.newCargo();

    let id = this.activeRoute.snapshot.paramMap.get("id");

    if(id){
      this.cargoService.get(id).then(data => {

        this.cargo.id=data["id"];
        this.cargo.nome=data["nome"];
        this.cargo.setorId=data["setor"]["id"];
      });
    } else {
      this.cargo = this.newCargo();
    }

  }

  newCargo(){

    return {
      id: null,
      nome: null,
      setorId: null
    }

  }

  ngOnInit() {
    this.loadListSetores();
  }

  loadListSetores(){
    this.setorService.listAll().then(data => {
      
      this.listSetores = data;
    });
  }

  salvar(){

    if(!this.validar()){
      return;
    }

    this.cargoService.save(this.cargo);

    this.cargo = this.newCargo();
    
    this.router.navigate(['/sisdoc/cargo']);
  }

  validar(): Boolean {
    console.log(this.cargo);
    if (!this.cargo.nome || this.cargo.nome === '') {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de informar o nome.', 'error');
      return false;
    }

    if (!this.cargo.setorId) {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de informar o setor.', 'error');
      return false;
    }

    return true;
  }

  voltar(){
    this.router.navigate(['/sisdoc/cargo']);
  }

}

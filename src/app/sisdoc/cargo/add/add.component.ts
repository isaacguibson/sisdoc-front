import { Component, OnInit } from '@angular/core';

//Services
import { CargoService } from '../../../../services/cargo.service';
import { SetorService } from '../../../../services/setor.service';
import { Cargo } from 'src/models/cargo.model';

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
    public setorService :SetorService
  ) {
    this.cargo = this.newCargo();
  }

  newCargo(){

    return {
      id: null,
      nome: null,
      id_setor: null
    }

  }

  ngOnInit() {
    this.loadListSetores();
  }

  loadListSetores(){
    this.setorService.listAll().then(data => {
      console.log(data);
      this.listSetores = data;
  });
  }

}

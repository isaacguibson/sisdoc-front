import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { SetorService } from '../../../../services/setor.service';
import { CargoService } from '../../../../services/cargo.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario: Usuario;
  setores;
  cargos: any[];
  setorSelecionado = null;
  cargoSelecionado = null;
  constructor(public setorService: SetorService,
              public cargoService: CargoService) { 
    this.usuario = new Usuario();
    this.usuario.senha = this.gerarSenha();
    this.obterTodosSetores();
    this.cargos = [];
    console.log(this.cargos.length);
  }

  ngOnInit() {
  }

  obterTodosSetores() {
    this.setorService.listAll().then(res => {
      this.setores = res;
    }).catch(err => {
      console.log(err);
    })
  }

  changeSetor(){
    if(this.setorSelecionado !== null) {
      this.obterCargosDoSetor(this.setorSelecionado);
    }
  }

  obterCargosDoSetor(id) {
    this.cargoService.cargosPorSetor(id).then(res => {
      this.cargos = res;
    }).catch(err => {
      console.log(err);
    });
  }

  gerarSenha(): string {
    let i = 0;
    let senha = '';
    while (i < 6) {
      
      senha = senha + this.gerarNumeroAleatorio(0, 9);

      i++;
    }

    return senha;
  }

  gerarNumeroAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

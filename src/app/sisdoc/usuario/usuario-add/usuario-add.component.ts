import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { SetorService } from '../../../../services/setor.service';
import { CargoService } from '../../../../services/cargo.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { ActivatedRoute } from "@angular/router";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

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
  id = null;
  showSenha = true;
  constructor(public setorService: SetorService,
              public cargoService: CargoService,
              public usuarioService: UsuarioService,
              public activeRoute: ActivatedRoute,
              public router: Router) { 
    this.usuario = new Usuario();
    this.usuario.senha = this.gerarSenha();
    this.obterTodosSetores();
    this.cargos = [];
    console.log(this.cargos.length);

    this.id = this.activeRoute.snapshot.paramMap.get("id");

    if(this.id){
      this.showSenha = false;
      this.usuarioService.get(this.id).then(data => {

        console.log(data);
        this.usuario.nome = data['nome'];
        this.usuario.tratamento = data['tratamento'];
        this.usuario.email = data['email'];
        this.usuario.curso = data['curso'];
        this.usuario.matricula = data['matricula'];
        this.usuario.senha = null;
        this.usuario.id = this.id;
      });
    }
  }

  ngOnInit() {
  }

  validarSalvar(): boolean {
    console.log(this.usuario);

    if(!this.usuario.nome || this.usuario.nome === ''){
      Swal.fire('Oops!', 'Você deve informar o nome.', 'error');
      return false;
    }

    if(!this.usuario.tratamento || this.usuario.nome === ''){
      Swal.fire('Oops!', 'Você deve informar o tratamento.', 'error');
      return false;
    }

    if(!this.usuario.email || this.usuario.nome === ''){
      Swal.fire('Oops!', 'Você deve informar o email.', 'error');
      return false;
    }

    if(!this.usuario.setorId){
      Swal.fire('Oops!', 'Você deve informar o setor.', 'error');
      return false;
    }

    if(!this.usuario.cargoId){
      Swal.fire('Oops!', 'Você deve informar o cargo.', 'error');
      return false;
    }

    if(this.showSenha){
      if(this.usuario.senha == null || this.usuario.senha == ''){
        Swal.fire('Oops!', 'Você deve informar a senha.', 'error');
        return false;
      }
    }

    return true;
  }

  salvar(){

    this.usuario.cargoId = this.cargoSelecionado;
    this.usuario.setorId = this.setorSelecionado;

    if(!this.validarSalvar()){
      return;
    }

    this.usuarioService.save(this.usuario);

  }

  obterTodosSetores() {
    this.setorService.listAll().then(res => {
      this.setores = res;
      if(this.id) {
        this.setorSelecionado = Number.parseInt(localStorage.getItem("userDepartmentId"));
      }
      if(this.setorSelecionado) {
        this.obterCargosDoSetor(this.setorSelecionado);
      }
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
      if(this.id) {
        this.cargoSelecionado = Number.parseInt(localStorage.getItem("userOfficeId"));
      }
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

  voltar(){
    if(this.id) {
      this.router.navigate(['/sisdoc/perfil']);
    } else {
      this.router.navigate(['/sisdoc/usuario']);
    }
  }

  toogleSenha(){
    this.showSenha = !this.showSenha;
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { ColegiadoService } from '../../../../services/colegiado.service';
import {Router} from "@angular/router";
import {Colegiado} from "../../../../models/colegiado.model";
import { ActivatedRoute } from "@angular/router";
import { SetorService } from '../../../../services/setor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class ColegiadoAddComponent implements OnInit {

  colegiadoToSave;
  objectsForList;
  placeHoldMembros;
  listSetores;
  constructor(public usuarioService: UsuarioService,
              public colegiadoService: ColegiadoService,
              public setorService: SetorService,
              public router: Router,
              public activeRoute: ActivatedRoute) {
    this.colegiadoToSave = new Colegiado();                
    this.objectsForList = [];
    this.initObjects();
    this.placeHoldMembros = 'Selecione os Membros'
  }

  ngOnInit() {
    this.loadListSetores();
  }

  initUsuariosList(){
    this.usuarioService.listAllForList().then(result => {
      this.objectsForList = result;
    }).catch(error => {
      console.log(error);
      this.objectsForList = [];
    });
  }

  initObjects(){
    let id = this.activeRoute.snapshot.paramMap.get("id");

    if(id){
      this.colegiadoService.getDTO(id).then(data => {
        console.log(data);
        
        this.colegiadoToSave.id=data["id"];
        this.colegiadoToSave.nome=data["nome"];
        this.colegiadoToSave.descricao=data["descricao"];
        this.colegiadoToSave.membrosIds=data["membrosIds"];
        this.colegiadoToSave.setorId=data["setorId"];
        
        this.initUsuariosList();
      });
    } else {
      this.initUsuariosList();
    }
  }

  salvar(){

    if(!this.validar()) {
      return;
    }

    this.colegiadoService.save(this.colegiadoToSave);
    
    this.router.navigate(['/sisdoc/colegiado']);
  }

  validar(): Boolean {
    if (!this.colegiadoToSave.nome || this.colegiadoToSave.nome === '') {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de informar o nome.', 'error');
      return false;
    }

    if (!this.colegiadoToSave.descricao || this.colegiadoToSave.descricao === '') {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de informar a descrição.', 'error');
      return false;
    }

    if (!this.colegiadoToSave.membrosIds || this.colegiadoToSave.membrosIds.length == 0) {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de informar pelo menos um membro.', 'error');
      return false;
    }

    return true;
  }

  voltar() {
    this.router.navigate(['/sisdoc/colegiado']);
  }

  loadListSetores(){
    this.setorService.listAll().then(data => {
      
      this.listSetores = data;
    });
  }

}

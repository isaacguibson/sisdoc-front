import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { ColegiadoService } from '../../../../services/colegiado.service';
import {Router} from "@angular/router";
import {Colegiado} from "../../../../models/colegiado.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class ColegiadoAddComponent implements OnInit {

  colegiadoToSave;
  objectsForList;
  placeHoldMembros;
  constructor(public usuarioService: UsuarioService,
              public colegiadoService: ColegiadoService,
              public router: Router,
              public activeRoute: ActivatedRoute) {
    this.colegiadoToSave = new Colegiado();                
    this.objectsForList = [];
    this.initObjects();
    this.placeHoldMembros = 'Selecione os Membros'
  }

  ngOnInit() {
    
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
        this.colegiadoToSave.id=data["id"];
        this.colegiadoToSave.nome=data["nome"];
        this.colegiadoToSave.descricao=data["descricao"];
        this.colegiadoToSave.membrosIds=data["membrosIds"];
        console.log(this.colegiadoToSave);
        
        this.initUsuariosList();
      });
    } else {
      this.initUsuariosList();
    }
  }

  salvar(){
    this.colegiadoService.save(this.colegiadoToSave);
    
    this.router.navigate(['/sisdoc/colegiado']);
  }

  voltar() {
    this.router.navigate(['/sisdoc/colegiado']);
  }

}

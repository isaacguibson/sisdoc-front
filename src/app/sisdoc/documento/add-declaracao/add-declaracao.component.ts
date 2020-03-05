import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";

import { Documento } from 'src/models/documento.model';
import { DocumentoService } from 'src/services/documento.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-add-declaracao',
  templateUrl: './add-declaracao.component.html',
  styleUrls: ['./add-declaracao.component.css']
})
export class AddDeclaracaoComponent implements OnInit {

  documento: Documento;
  allUsersSelect = false;
  usersForList;
  id = null;

  constructor(public documentoService: DocumentoService,
              public router: Router,
              public usuarioService: UsuarioService,
              public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.documento = new Documento();
    this.usersForList=[];

    this.id = this.activeRoute.snapshot.paramMap.get("id");

    if(this.id){
      this.documentoService.get(this.id).then(data => {

        this.documento.assunto = data['assunto'];
        this.documento.conteudo = data['conteudo'];
        this.documento.mensagemGeral = data['mensagemGeral'];
        this.documento.mensagemSetor = data['mensagemSetor'];

        if(this.documento.mensagemGeral === true){
          this.allUsersSelect = true;
          this.documento.destinatariosIds = [];
        } else {
          this.documento.destinatariosIds = data['destinatariosIds'];
        }
        
        this.documento.id = data['id'];

        this.initUsersForList();
        
      });
    }
  }

  cancelar(){
    this.router.navigate(['/sisdoc/documento']);
  }

  salvar() {
    this.documentoService.save(this.documento, 'declaracao');
  }

  initUsersForList(){
    this.usuarioService.listAllForList().then(result => {
      console.log(result);
      if(this.id != null){
        this.usersForList = result;
      }

    }).catch(error => {
      this.usersForList = [];
    })
  }

  selectAllUsers(){

    if(this.allUsersSelect === true){
      this.documento.mensagemGeral = true;
    } else {
      this.documento.mensagemGeral = false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { UsuarioService } from '../../../../services/usuario.service';
import { ActivatedRoute } from "@angular/router";

//Services
import { DocumentoService } from '../../../../services/documento.service'

// Interfaces
import { Documento } from '../../../../models/documento.model'

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oficio',
  templateUrl: './oficio.component.html',
  styleUrls: ['./oficio.component.css']
})
export class OficioComponent implements OnInit {

  public Editor = ClassicEditor;

  documento: Documento;

  usersForList;
  allUsersSelect = false;

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService,
    public router: Router,
    public usuarioService: UsuarioService,
    public activeRoute: ActivatedRoute
  ) {

    this.documento = this.newOficio();
    let id = this.activeRoute.snapshot.paramMap.get("id");

    if(id){
      this.documentoService.get(id).then(data => {

        console.log(data);
        this.documento.conteudo = data['conteudo'];
        this.documento.destinatariosIds = data['destinatariosIds'];
        this.documento.id = data['id'];
        
      });
    } else {

    }
    
    this.usersForList=[];
    this.initUsersForList();
   }

  ngOnInit() {
    /* ON INIT FUNCTION */
  }

  initUsersForList(){
    this.usuarioService.listAllForList().then(result => {
      this.usersForList = result;
    }).catch(error => {
      this.usersForList = error;
    })
  }

  newOficio(): Documento{
    return {
      id: null,
      conteudo: null,
      identificador: null,
      dataInicial: null,
      dataFinal: null,
      tipoDocumentoId: null,
      destinatariosIds: []
    };
  }

  salvar(){
  
    if(this.allUsersSelect === false && this.documento.destinatariosIds.length === 0){
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de escolher pelo menos uma pessoa para enviar este documento.', 'error');
      return;
    }

    if (this.allUsersSelect === true){
      this.documento.destinatariosIds = [];
    }

    this.documentoService.save(this.documento, 'oficio');
  }

  cancelar(){
    this.router.navigate(['/sisdoc/documento']);
  }

  selectAllUsers(){

    if(this.allUsersSelect === true){

    } else {

    }
  }

}

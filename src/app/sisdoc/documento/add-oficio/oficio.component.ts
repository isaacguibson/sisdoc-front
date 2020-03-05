import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { UsuarioService } from '../../../../services/usuario.service';
import { ActivatedRoute } from "@angular/router";

//Services
import { DocumentoService } from '../../../../services/documento.service';
import { SetorService } from '../../../../services/setor.service'

// Interfaces
import { Documento } from '../../../../models/documento.model'

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {EditorModule} from 'primeng/editor';
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

  objectsForList;
  usersForList;
  setoresForList;
  allUsersSelect = false;
  tipoEnvio;
  placeHoldEnvio;
  id = null;

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService,
    public setorService: SetorService,
    public router: Router,
    public usuarioService: UsuarioService,
    public activeRoute: ActivatedRoute
  ) {
    this.allUsersSelect = false;
    this.tipoEnvio = 0;
    this.placeHoldEnvio = "Escolha o tipo de envio antes de selecionar os destinatários!";

    this.documento = this.newOficio();
    this.id = this.activeRoute.snapshot.paramMap.get("id");

    this.usersForList=[];
    this.setoresForList = [];
    this.objectsForList=[];

    if(this.id){
      this.documentoService.get(this.id).then(data => {

        this.documento.assunto = data['assunto'];
        this.documento.conteudo = data['conteudo'];
        this.documento.mensagemGeral = data['mensagemGeral'];
        this.documento.mensagemSetor = data['mensagemSetor'];

        if(this.documento.mensagemSetor === true){
          this.tipoEnvio = 2; //Tipo de envio para setor
        } else {
          this.tipoEnvio = 1; //Tipo de envio para usuario
        }

        if(this.documento.mensagemGeral === true){
          this.allUsersSelect = true;
          this.documento.destinatariosIds = [];
        } else {
          this.documento.destinatariosIds = data['destinatariosIds'];
        }
        
        this.documento.id = data['id'];

        this.initUsersForList();
        this.initSetoresForList();
        
      });
    } else {
      this.initUsersForList();
      this.initSetoresForList();
    }
    
   }

  ngOnInit() {
    /* ON INIT FUNCTION */
  }

  initUsersForList(){
    this.usuarioService.listAllForList().then(result => {
      this.usersForList = result;

      if(this.documento.mensagemSetor !== true && this.id != null){
        this.objectsForList = this.usersForList;
      }

    }).catch(error => {
      this.usersForList = [];
    })
  }

  initSetoresForList(){
    this.setorService.listAll().then(result => {
      this.setoresForList = result;

      if(this.documento.mensagemSetor === true){
        this.objectsForList = this.setoresForList;
      }

    }).catch(error => {
      this.setoresForList = [];
    });
  }

  newOficio(): Documento{
    return new Documento();
  }

  salvar(){
  
    if(this.tipoEnvio === 0 || this.tipoEnvio === "0"){
      Swal.fire('Oops!', 'Você deve escolher o tipo de envio.', 'error');
      return;
    }

    if(this.allUsersSelect === false && this.documento.destinatariosIds.length === 0){
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de escolher pelo menos uma pessoa para enviar este documento.', 'error');
      return;
    }

    if (this.allUsersSelect === true){
      this.documento.destinatariosIds = [];

      this.documento.mensagemGeral = true;
    }

    this.documentoService.save(this.documento, 'oficio');
  }

  cancelar(){
    this.router.navigate(['/sisdoc/documento']);
  }

  selectAllUsers(){

    if(this.allUsersSelect === true){
      this.documento.mensagemGeral = true;
    } else {
      this.documento.mensagemGeral = false;
    }
  }

  alterarTipoEnvio(){

    if(this.tipoEnvio === 0 || this.tipoEnvio === "0"){

      this.documento.mensagemSetor = false;
      this.placeHoldEnvio = "Escolha o tipo de envio antes de selecionar os destinatários!";
      this.objectsForList = [];
    
    } else if (this.tipoEnvio === 1 || this.tipoEnvio === "1"){
      
      this.documento.mensagemSetor = false;
      this.placeHoldEnvio = "Para quem vai enviar este documento?";
      this.objectsForList = this.usersForList;

    } else if(this.tipoEnvio === 2 || this.tipoEnvio === "2"){
      
      this.documento.mensagemSetor = true;
      this.placeHoldEnvio = "Para onde vai enviar este documento?";
      this.objectsForList = this.setoresForList;

    }
  }

}

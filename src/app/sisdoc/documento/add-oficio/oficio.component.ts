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
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

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
  urlPdf;
  urlDocumento: SafeResourceUrl;
  TIPO_OFICIO: Number = 1;

  constructor(
    public httpClient: HttpClient,
    public documentoService: DocumentoService,
    public setorService: SetorService,
    public router: Router,
    public usuarioService: UsuarioService,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
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
        this.documento.dataCriacao = data['dataCriacao'];

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
        this.initialRender();
      });
    } else {
      this.initUsersForList();
      this.initSetoresForList();

      const today = new Date();
      this.documento.dataCriacao = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

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

  validarSalvar(): boolean {
    if(this.tipoEnvio === 0 || this.tipoEnvio === "0"){
      Swal.fire('Oops!', 'Você deve escolher o tipo de envio.', 'error');
      return false;
    }

    if(this.allUsersSelect === false && this.documento.destinatariosIds.length === 0){
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de escolher pelo menos uma pessoa para enviar este documento.', 'error');
      return false;
    }

    if(this.tipoEnvio === 0 || this.tipoEnvio === "0"){
      Swal.fire('Oops!', 'Você deve escolher o tipo de envio.', 'error');
      return false;
    }

    if(this.allUsersSelect === false && this.documento.destinatariosIds.length === 0){
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de escolher pelo menos uma pessoa para enviar este documento.', 'error');
      return false;
    }

    return true;
  }
  
  salvar(){
    if(!this.validarSalvar()){
      return;
    }

    this.documentoService.save(this.documento, 'oficio');
  }

  cancelar(){

    Swal.fire({
      title: 'Salvar alterações',
      text: "Deseja salvar o documento antes de sair?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, salvar!',
      cancelButtonText: 'Não, apenas sair.'
    }).then((result) => {

      //Delete apenas se usuario clicar em sim
      if(result.dismiss != Swal.DismissReason.cancel){
        this.salvar();
      } else {
        this.router.navigate(['/sisdoc/documento']);
      }
    });
  }

  selectAllUsers(){

    this.documento.destinatariosIds = [];
    if(this.allUsersSelect === true){
      this.documento.mensagemGeral = true;
    } else {
      this.documento.mensagemGeral = false;
    }
  }

  alterarTipoEnvio(){
    this.documento.destinatariosIds = [];
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

  initialRender(){

    if(this.id) {
      console.log(this.id);
      this.documentoService.download(this.TIPO_OFICIO, this.id).then(response => {
        const newBlob = new Blob([response], { type: "application/pdf" });
        this.urlPdf = window.URL.createObjectURL(newBlob);
        this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(newBlob));
      }).catch(error =>{
        console.log(error);
      });
    }
    
  }

  render() {
    if(!this.validarSalvar()){
      return;
    }

    if (this.allUsersSelect === true){
      this.documento.destinatariosIds = [];

      this.documento.mensagemGeral = true;
    }

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    const noBackSave: Promise<any> = this.documentoService.noBackSave(this.documento, 'oficio');
    
    if(noBackSave) {
      noBackSave.then(data => {
        if(data['mensagem']) {
          this.showSpecificErrorMessage(data['mensagem']);
        } else {
          this.id = data['id'];
          this.documento.id = this.id;
          this.initialRender();
          Swal.close();
        }
      }).catch(error => {
        console.log(error);
        Swal.close();
      });
    }
  }

  noSaveRender() {

    this.documento.usuarioId = Number.parseInt(localStorage.getItem("userId"));
    this.documento.tipoDocumentoId = this.TIPO_OFICIO;

    if(!this.validarSalvar()){
      return;
    }

    if (this.allUsersSelect === true){
      this.documento.destinatariosIds = [];

      this.documento.mensagemGeral = true;
    }

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });
    

    this.documentoService.render(this.documento).then(response => {
      const newBlob = new Blob([response], { type: "application/pdf" });
        this.urlPdf = window.URL.createObjectURL(newBlob);
        this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(newBlob));
        this.id = -1; // Apenas para renderizar
        Swal.close();
      }).catch(error => {
      console.log(error);
      Swal.close();
    });
  }

  showSpecificErrorMessage(mensagem){
    Swal.fire('Oops!', mensagem, 'error');
}

}

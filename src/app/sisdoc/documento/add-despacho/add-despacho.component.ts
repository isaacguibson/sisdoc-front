import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";

// Interfaces
import { Documento } from '../../../../models/documento.model';

//Services
import { DocumentoService } from '../../../../services/documento.service';
import { UsuarioService } from 'src/services/usuario.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-despacho',
  templateUrl: './add-despacho.component.html',
  styleUrls: ['./add-despacho.component.css']
})
export class AddDespachoComponent implements OnInit {

  documento: Documento;
  id = null;
  usersForList: any = [];
  selectedUser: any = '';
  urlPdf;
  urlDocumento: SafeResourceUrl;
  TIPO_DESPACHO: Number = 5;

  constructor(public documentoService: DocumentoService,
              public usuarioService: UsuarioService,
              public router: Router,
              public sanitizer: DomSanitizer,
              public activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.documento = new Documento();
    this.documento.destinatariosIds = [];

    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.initUsersForList();
    if(this.id){
      this.documentoService.get(this.id).then(data => {
        this.documento.assunto = data['assunto'];
        this.documento.conteudo = data['conteudo'];
        this.documento.mensagemGeral = data['mensagemGeral'];
        this.documento.mensagemSetor = data['mensagemSetor'];
        this.documento.id = data['id'];
        this.documento.destinatariosIds = data['destinatariosIds'];
        this.documento.dataCriacao = data['dataCriacao'];
        this.selectedUser = this.documento.destinatariosIds[0];
        this.initialRender();
      });
    } else {
      const today = new Date();
      this.documento.dataCriacao = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }
  }

  initUsersForList(){
    this.usuarioService.listAllForList().then(result => {
      this.usersForList = result;

    }).catch(error => {
      this.usersForList = [];
    })
  }

  validar() {

    if (this.documento.assunto == null || this.documento.assunto === undefined
      || this.documento.assunto === '') {
      
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de digitar o assunto do documento.', 'error');
      return false;
    }

    if (this.documento.conteudo == null || this.documento.conteudo === undefined
      || this.documento.conteudo === '') {
      
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de digitar o conteúdo do documento.', 'error');
      return false;
    }

    if (!this.documento.destinatariosIds || this.documento.destinatariosIds.length == 0) {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de escolher pelo menos uma pessoa para enviar este documento.', 'error');
      return false;
    }

    return true;
  }

  salvar() {

    this.documento.destinatariosIds = [];
    if(this.selectedUser) {
      this.documento.destinatariosIds.push(this.selectedUser);
    }

    if(!this.validar()){
      return;
    }

    this.documentoService.save(this.documento, 'despacho');
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

  initialRender(){

    if(this.id) {
      console.log(this.id);
      this.documentoService.download(this.TIPO_DESPACHO, this.id).then(response => {
        const newBlob = new Blob([response], { type: "application/pdf" });
        this.urlPdf = window.URL.createObjectURL(newBlob);
        this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(newBlob));
      }).catch(error =>{
        console.log(error);
      });
    }
    
  }

  render() {
    this.documento.destinatariosIds = [];
    if(this.selectedUser) {
      this.documento.destinatariosIds.push(this.selectedUser);
    }
    if(!this.validar()){
      return;
    }

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    
    const noBackSave: Promise<any> = this.documentoService.noBackSave(this.documento, 'despacho');
    
    if(noBackSave) {
      noBackSave.then(data => {
        this.id = data['id'];
        this.documento.id = this.id;
        this.initialRender();
        Swal.close();
      }).catch(error => {
        console.log(error);
        Swal.close();
      });
    }
  }

  noSaveRender() {

    this.documento.usuarioId = Number.parseInt(localStorage.getItem("userId"));
    this.documento.tipoDocumentoId = this.TIPO_DESPACHO;
    this.documento.destinatariosIds = [];
    if(this.selectedUser) {
      this.documento.destinatariosIds.push(this.selectedUser);
    }

    if(!this.validar()){
      return;
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

}

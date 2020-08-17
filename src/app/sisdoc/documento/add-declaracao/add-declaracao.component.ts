import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";

import { Documento } from 'src/models/documento.model';
import { DocumentoService } from 'src/services/documento.service';
import { UsuarioService } from 'src/services/usuario.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

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
  urlPdf;
  urlDocumento: SafeResourceUrl;
  TIPO_DECLARACAO: Number = 6;

  constructor(public documentoService: DocumentoService,
              public router: Router,
              public usuarioService: UsuarioService,
              public sanitizer: DomSanitizer,
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
        this.documento.dataCriacao = data['dataCriacao'];

        if(this.documento.mensagemGeral === true){
          this.allUsersSelect = true;
          this.documento.destinatariosIds = [];
        } else {
          this.documento.destinatariosIds = data['destinatariosIds'];
        }
        
        this.documento.id = data['id'];
        this.initialRender();
      });
    } else {
      const today = new Date();
      this.documento.dataCriacao = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    this.initUsersForList();
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

  salvar() {
    this.documentoService.save(this.documento, 'declaracao');
  }

  initUsersForList(){
    this.usuarioService.listAllForList().then(result => {
      this.usersForList = result;

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

  initialRender(){

    if(this.id) {
      console.log(this.id);
      this.documentoService.download(this.TIPO_DECLARACAO, this.id).then(response => {
        const newBlob = new Blob([response], { type: "application/pdf" });
        this.urlPdf = window.URL.createObjectURL(newBlob);
        this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(newBlob));
      }).catch(error =>{
        console.log(error);
      });
    }
    
  }

  render() {

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

    const noBackSave: Promise<any> = this.documentoService.noBackSave(this.documento, 'declaracao');
    
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
    this.documento.tipoDocumentoId = this.TIPO_DECLARACAO;

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

}

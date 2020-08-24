import { Component, OnInit } from '@angular/core';
import { Documento } from 'src/models/documento.model';
import { DocumentoService } from '../../../../services/documento.service';
import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-add-parecer',
  templateUrl: './add-parecer.component.html',
  styleUrls: ['./add-parecer.component.css']
})
export class AddParecerComponent implements OnInit {

  documento: Documento;
  TIPO_PARECER: Number = 8;
  id;
  urlPdf;
  urlDocumento: SafeResourceUrl;
  objectsForList;
  allUsersSelect = false;
  constructor(public documentoService: DocumentoService,
              public sanitizer: DomSanitizer,
              public router: Router,
              public usuarioService: UsuarioService,
              public activeRoute: ActivatedRoute) {
    this.documento = new Documento();
   }

  ngOnInit() {
    this.initUsersForList();
    this.objectsForList=[];
    this.allUsersSelect = false;
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if(this.id){
      this.documentoService.get(this.id).then(data => {
        this.documento.assunto = data['assunto'];
        this.documento.conteudo = data['conteudo'];
        this.documento.mensagemGeral = data['mensagemGeral'];
        this.documento.mensagemSetor = data['mensagemSetor'];
        this.documento.id = data['id'];
        this.documento.dataCriacao = data['dataCriacao'];
        this.documento.origem = data['origem'];

        if(this.documento.mensagemGeral === true){
          this.allUsersSelect = true;
          this.documento.destinatariosIds = [];
        } else {
          this.documento.destinatariosIds = data['destinatariosIds'];
        }

        this.initialRender();
      });
    } else {
      const today = new Date();
      this.documento.dataCriacao = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }
  }

  initUsersForList(){
    this.usuarioService.listAllForList().then(result => {
      this.objectsForList = result;
    }).catch(error => {
      this.objectsForList = [];
    })
  }

  validar() {
    if (this.documento.assunto == null || this.documento.assunto === undefined
      || this.documento.assunto === '') {
      
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de digitar o assunto do documento.', 'error');
      return false;
    }

    if (this.documento.origem == null || this.documento.origem === undefined
      || this.documento.origem === '') {
      
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de digitar a origem do documento.', 'error');
      return false;
    }

    return true;
  }

  salvar() {

    if(!this.validar()){
      return;
    }

    this.documentoService.save(this.documento, 'parecer');
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

  noSaveRender() {

    this.documento.usuarioId = Number.parseInt(localStorage.getItem("userId"));
    this.documento.tipoDocumentoId = this.TIPO_PARECER;

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

  selectAllUsers(){

    this.documento.destinatariosIds = [];
    if(this.allUsersSelect === true){
      this.documento.mensagemGeral = true;
    } else {
      this.documento.mensagemGeral = false;
    }
  }

  initialRender(){

    if(this.id) {
      console.log(this.id);
      this.documentoService.download(this.TIPO_PARECER, this.id).then(response => {
        const newBlob = new Blob([response], { type: "application/pdf" });
        this.urlPdf = window.URL.createObjectURL(newBlob);
        this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(newBlob));
      }).catch(error =>{
        console.log(error);
      });
    }
    
  }

}

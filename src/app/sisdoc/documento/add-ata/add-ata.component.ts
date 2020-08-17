import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Documento } from 'src/models/documento.model';
import { ColegiadoService } from '../../../../services/colegiado.service';
import { DocumentoService } from '../../../../services/documento.service';
import { Colegiado } from 'src/models/colegiado.model';
import Swal from 'sweetalert2';
import { Reuniao } from 'src/models/reuniao.model';
import { ActivatedRoute } from "@angular/router";
import { NgSelectComponent } from '@ng-select/ng-select';
import {Router} from "@angular/router";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-ata',
  templateUrl: './add-ata.component.html',
  styleUrls: ['./add-ata.component.css']
})
export class AddAtaComponent implements OnInit {

  public Editor = ClassicEditor;

  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  objectsForList = [];
  documento: Documento = new Documento();
  allUsersSelect = false;
  colegiados: Colegiado[] = [];
  colegiadoSelecionado: Colegiado = new Colegiado();
  idColegiadoSelecionado: number = null;
  placeHoldMembros = 'Selecione os membros do colegiado';
  id = null; // Caso venha de edição
  urlPdf;
  urlDocumento: SafeResourceUrl;
  TIPO_ATA: Number = 7;

  constructor(public colegiadoService: ColegiadoService,
    public documentoService: DocumentoService,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public router: Router) { }

  ngOnInit() {
    this.colegiadoSelecionado = new Colegiado();
    this.documento.destinatariosIds = [];
    this.initColegiados();
  }

  initColegiados() {
    this.colegiadoService.findAll().then(res => {
      this.colegiados = res;
      
      this.id = this.activeRoute.snapshot.paramMap.get("id");

      if(this.id){ 
        this.documentoService.get(this.id).then(data => {
          this.documento.conteudo = data['conteudo'];
          this.documento.mensagemGeral = data['mensagemGeral'];
          this.idColegiadoSelecionado = data['reuniao']['colegiadoId'];
          this.documento.reuniao = data['reuniao'];
          this.documento.assunto = data['assunto'];
          this.documento.dataCriacao = data['dataCriacao'];

          if(this.documento.mensagemGeral === true){
            this.allUsersSelect = true;
            this.documento.destinatariosIds = [];
          } else {
            this.documento.destinatariosIds = data['destinatariosIds'];
          }
          
          this.documento.id = data['id'];

          this.colegiadoService.getMembros(this.idColegiadoSelecionado).then(res => {
            this.objectsForList = res;
          });
        });
        this.initialRender();
      } else {
        const today = new Date();
        this.documento.dataCriacao = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
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

  alterarColegiado(event) {
    this.objectsForList = [];
    this.documento.destinatariosIds = [];
    this.ngSelectComponent.handleClearClick();
    if (event.target.value) {
      this.colegiadoSelecionado = this.colegiados.find(col => col.id == event.target.value);
      this.colegiadoService.getMembros(this.colegiadoSelecionado.id).then(res => {
        this.objectsForList = res;
      });
    } else {
      this.colegiadoSelecionado = new Colegiado();
      this.idColegiadoSelecionado = null;
    }
    
  }

  validarSalvar(): Boolean {

    if (!this.colegiadoSelecionado) {
      Swal.fire('Oops!', 'Selecione o colegiado', 'error');
      return false;
    }

    if(this.allUsersSelect === false && this.documento.destinatariosIds.length === 0){
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de escolher pelo menos uma pessoa para enviar este documento.', 'error');
      return false;
    }

    if(!this.documento.assunto || this.documento.assunto === '') {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de informar o título da ATA.', 'error');
      return false;
    }

    return true;
  }

  salvar() {

    if(!this.validarSalvar()){
      return;
    }

    if (!this.colegiadoSelecionado) {
      Swal.fire('Oops!', 'Selecione o colegiado', 'error');
      return;
    } else {
      if(!this.id) { // Caso não seja uma edição
        this.documento.reuniao = new Reuniao();
      }
      if (this.colegiadoSelecionado.id) {
        this.documento.reuniao.colegiadoId = this.colegiadoSelecionado.id;
      }
      
    }

    if (this.allUsersSelect === true){
      this.documento.destinatariosIds = [];

      this.documento.mensagemGeral = true;
    }

    this.documentoService.save(this.documento, 'ata');
  }

  cancelar() {
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
      this.documentoService.download(this.TIPO_ATA, this.id).then(response => {
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

    if (!this.colegiadoSelecionado) {
      Swal.fire('Oops!', 'Selecione o colegiado', 'error');
      return;
    } else {
      if(!this.id) { // Caso não seja uma edição
        this.documento.reuniao = new Reuniao();
      }
      if (this.colegiadoSelecionado.id) {
        this.documento.reuniao.colegiadoId = this.colegiadoSelecionado.id;
      }
      
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

    const noBackSave: Promise<any> = this.documentoService.noBackSave(this.documento, 'ata');
    
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
    this.documento.tipoDocumentoId = this.TIPO_ATA;

    if(!this.validarSalvar()){
      return;
    }

    if (!this.colegiadoSelecionado) {
      Swal.fire('Oops!', 'Selecione o colegiado', 'error');
      return;
    } else {
      if(!this.id) { // Caso não seja uma edição
        this.documento.reuniao = new Reuniao();
      }
      if (this.colegiadoSelecionado.id) {
        this.documento.reuniao.colegiadoId = this.colegiadoSelecionado.id;
      }
      
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
}

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
  idColegiadoSelecionado: number;
  placeHoldMembros = 'Selecione os membros do colegiado';
  id = null; // Caso venha de edição

  constructor(public colegiadoService: ColegiadoService,
    public documentoService: DocumentoService,
    public activeRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.colegiadoSelecionado = new Colegiado();
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
      }
    });
  }

  selectAllUsers(){

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

  salvar() {

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

    if(this.allUsersSelect === false && this.documento.destinatariosIds.length === 0){
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de escolher pelo menos uma pessoa para enviar este documento.', 'error');
      return;
    }

    if(!this.documento.assunto || this.documento.assunto === '') {
      Swal.fire('Oops!', 'Estou vendo aqui que você esqueceu de informar o título da ATA.', 'error');
      return;
    }

    if (this.allUsersSelect === true){
      this.documento.destinatariosIds = [];

      this.documento.mensagemGeral = true;
    }
    console.log(this.documento);
    this.documentoService.save(this.documento, 'ata');
  }

  cancelar() {
    this.router.navigate(['/sisdoc/documento']);
  }
}

import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Documento } from 'src/models/documento.model';
import { ColegiadoService } from '../../../../services/colegiado.service';
import { Colegiado } from 'src/models/colegiado.model';

@Component({
  selector: 'app-add-ata',
  templateUrl: './add-ata.component.html',
  styleUrls: ['./add-ata.component.css']
})
export class AddAtaComponent implements OnInit {

  public Editor = ClassicEditor;

  objectsForList = [];
  documento: Documento = new Documento();
  allUsersSelect = false;
  colegiados: Colegiado[] = [];
  colegiadoSelecionado: Colegiado;
  placeHoldMembros = 'Selecione os membros do colegiado'

  constructor(public colegiadoService: ColegiadoService) { }

  ngOnInit() {
    this.colegiadoSelecionado = new Colegiado();
    this.initColegiados();
  }

  initColegiados() {
    this.colegiadoService.findAll().then(res => {
      this.colegiados = res;
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
    if (event.target.value) {
      this.colegiadoSelecionado = this.colegiados.find(col => col.id == event.target.value);
      this.colegiadoService.getMembros(this.colegiadoSelecionado.id).then(res => {
        this.objectsForList = res;
      })
    } else {
      this.colegiadoSelecionado = new Colegiado();
    }
    
  }
}

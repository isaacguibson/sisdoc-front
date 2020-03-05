import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DocumentoService } from '../../../../services/documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { Documento } from 'src/models/documento.model';

@Component({
  selector: 'app-add-requerimento',
  templateUrl: './add-requerimento.component.html',
  styleUrls: ['./add-requerimento.component.css']
})
export class AddRequerimentoComponent implements OnInit {

  outraRotinaAdd = "";
  outraInformacoesAdd = "";
  rotinas = [];
  outrasRotinas = [];
  outrasInformacoes = [];
  requerimentoObject = {
    id: null,
    requerAo: 0,
    vinculo: 0,
    rotinas: [],
    outrasRotinas: [],
    outrasInformacoes: []
  };
  id = null;
  constructor(public documentoService: DocumentoService,
              public activeRoute: ActivatedRoute,
              public router: Router) {

    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if(this.id){
      this.documentoService.get(this.id).then(data => {
        this.requerimentoObject.id = data['id'];
        this.requerimentoObject.requerAo = data['requerido'];
        this.requerimentoObject.vinculo = data['vinculo'];
        this.requerimentoObject.rotinas = data['rotinas'];
        this.outrasRotinas = data['outrasRotinas'];
        this.requerimentoObject.outrasRotinas = data['outrasRotinas'];
        this.outrasInformacoes = data['informacoes'];
        this.requerimentoObject.outrasInformacoes = data['informacoes'];
      });
    }      
  }

  ngOnInit() {
    this.rotinas = [
      {label: "ABONO DE PERMANÊNCIA", value: 24},
      {label: "AFASTAMENTO PARA PÓS-GRADUAÇÃO", value: 2},
      {label: "ALTERAÇÃO DO REGIME DE TRABALHO", value: 18},
      {label: "APOSENTADORIA", value: 17},
      {label: "APOSTILAMENTO DE DIPLOMA", value: 21},
      {label: "ASCENSÃO FUNCIONAL: PROGRESSÃO POR INTERSTÍCIO", value: 4},
      {label: "ASCENSÃO FUNCIONAL: PROMOÇÃO POR TITULAÇÃO", value: 5},
      {label: "ASCENSÃO FUNCIONAL: PROMOÇÃO POR TITULAÇÃO E INTERSTÍCIO", value: 6},
      {label: "AUXÍLIO FUNERAL", value: 11},
      {label: "AVALIAÇÃO DE ESTÁGIO PROBATÓRIO", value: 1},
      {label: "AVERBAÇÃO DE TEMPO DE SERVIÇO", value: 15},
      {label: "CESSÃO/DISPOSIÇÃO", value: 13},
      {label: "COMUNICAÇÃO DE FALECIMENTO", value: 10},
      {label: "EMISSÃO DE SEGUNDA VIA DE DIPLOMA", value: 22},
      {label: "EXONERAÇÃO", value: 14},
      {label: "GRATIFICAÇÃO DE INCENTIVO PROFISSIONAL", value: 7},
      {label: "ISENÇÃO DE IMPOSTO DE RENDA", value: 25},
      {label: "LICENÇA MATERNIDADE", value: 8},
      {label: "LICENÇA MÉDICA/LICENÇA PARA INTERESSE PARTICULAR", value: 9},
      {label: "MUDANÇA DE NOME", value: 19},
      {label: "PENSÃO", value: 12},
      {label: "PRORROGAÇÃO DE AFASTAMENTO PARA PÓS-GRADUAÇÃO", value: 3},
      {label: "REGISTRO DE DIPLOMA", value: 20},
      {label: "REMOÇÃO", value: 23},
      {label: "SUSPENSÃO DE VÍNCULO", value: 16}
    ];
  }

  adicionarRotina() {
    if(this.outraRotinaAdd !== '' && this.outraRotinaAdd != null) {
      if(this.outrasRotinas.length < 4) {
        this.outrasRotinas.push(
          {
            value: this.outrasRotinas.length + 1,
            label: this.outraRotinaAdd
          }
        );
      } else {
        Swal.fire({
          title: 'Erro',
          text: 'Não é possível adicionar mais do que 4 rotinas',
          type: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
    this.outraRotinaAdd = "";
  }

  deletarRotina(index) {
    this.outrasRotinas.splice(this.outrasRotinas.indexOf(this.outrasRotinas.find(rot => rot.value == index)), 1);
  }

  adicionarInformacao() {
    if(this.outraInformacoesAdd !== '' && this.outraInformacoesAdd != null) {
      if(this.outrasInformacoes.length < 4) {
        this.outrasInformacoes.push(
          {
            value: this.outrasInformacoes.length + 1,
            label: this.outraInformacoesAdd
          }
        );
      } else {
        Swal.fire({
          title: 'Erro',
          text: 'Não é possível adicionar mais do que 4 informações',
          type: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
    this.outraInformacoesAdd = "";
  }

  deletarInformacao(index) {
    this.outrasInformacoes.splice(this.outrasInformacoes.indexOf(this.outrasInformacoes.find(rot => rot.value == index)), 1);
  }

  salvar() {
    this.requerimentoObject.outrasRotinas = this.outrasRotinas;
    this.requerimentoObject.outrasInformacoes = this.outrasInformacoes;
    console.log(this.requerimentoObject);
    if(this.requerimentoObject.requerAo == null || this.requerimentoObject.requerAo === 0){
      Swal.fire({
        title: 'Erro',
        text: 'Informe para quem deve ser esse requerimento!',
        type: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if(this.requerimentoObject.vinculo == null || this.requerimentoObject.vinculo === 0){
      Swal.fire({
        title: 'Erro',
        text: 'Informe seu tipo de vinculo!',
        type: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if(this.requerimentoObject.rotinas == null || this.requerimentoObject.rotinas.length === 0){
      if (this.requerimentoObject.outrasRotinas == null || this.requerimentoObject.outrasRotinas.length === 0) {
        Swal.fire({
          title: 'Erro',
          text: 'Informe pelo menos uma rotina!',
          type: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
    }

    let documentoToSave = new Documento();
    if(this.requerimentoObject.id) {
      documentoToSave.id = this.requerimentoObject.id;
    }
    documentoToSave.requerido = this.requerimentoObject.requerAo;
    documentoToSave.vinculo = this.requerimentoObject.vinculo;
    documentoToSave.rotinas = this.requerimentoObject.rotinas;
    documentoToSave.outrasRotinas = this.requerimentoObject.outrasRotinas;
    documentoToSave.informacoes = this.requerimentoObject.outrasInformacoes;
    this.documentoService.save(documentoToSave, 'requerimento');
  }

  cancelar(){
    this.router.navigate(['/sisdoc/documento']);
  }

}

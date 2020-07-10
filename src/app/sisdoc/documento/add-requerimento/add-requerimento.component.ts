import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DocumentoService } from '../../../../services/documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { Documento } from 'src/models/documento.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentCloner } from 'html2canvas/dist/types/dom/document-cloner';

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
  urlPdf;
  urlDocumento: SafeResourceUrl;
  TIPO_REQUERIMENTO: Number = 4;
  dataCriacao: string;

  constructor(public documentoService: DocumentoService,
              public activeRoute: ActivatedRoute,
              public sanitizer: DomSanitizer,
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
        this.dataCriacao = data['dataCriacao'];
        this.initialRender();
      });
    } else {
      const today = new Date();
      this.dataCriacao = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
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

  validarSalvar(): Boolean {

    if(this.requerimentoObject.requerAo == null || this.requerimentoObject.requerAo === 0){
      Swal.fire({
        title: 'Erro',
        text: 'Informe para quem deve ser esse requerimento!',
        type: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    if(this.requerimentoObject.vinculo == null || this.requerimentoObject.vinculo === 0){
      Swal.fire({
        title: 'Erro',
        text: 'Informe seu tipo de vinculo!',
        type: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    if(this.requerimentoObject.rotinas == null || this.requerimentoObject.rotinas.length === 0){
      if (this.requerimentoObject.outrasRotinas == null || this.requerimentoObject.outrasRotinas.length === 0) {
        Swal.fire({
          title: 'Erro',
          text: 'Informe pelo menos uma rotina!',
          type: 'error',
          confirmButtonText: 'OK'
        });
        return false;
      }
    }

    return true;

  }

  gerarDocumentoParaSalvar(): Documento {
    let documentoToSave = new Documento();
    if(this.requerimentoObject.id) {
      documentoToSave.id = this.requerimentoObject.id;
    }
    documentoToSave.requerido = this.requerimentoObject.requerAo;
    documentoToSave.vinculo = this.requerimentoObject.vinculo;
    documentoToSave.rotinas = this.requerimentoObject.rotinas;
    documentoToSave.outrasRotinas = this.requerimentoObject.outrasRotinas;
    documentoToSave.informacoes = this.requerimentoObject.outrasInformacoes;
    documentoToSave.dataCriacao = this.dataCriacao;
    return documentoToSave;
  }

  salvar() {
    this.requerimentoObject.outrasRotinas = this.outrasRotinas;
    this.requerimentoObject.outrasInformacoes = this.outrasInformacoes;
    
    if(!this.validarSalvar()){
      return;
    }

    this.documentoService.save(this.gerarDocumentoParaSalvar(), 'requerimento');
  }

  cancelar(){
    this.router.navigate(['/sisdoc/documento']);
  }

  initialRender(){

    if(this.id) {
      console.log(this.id);
      this.documentoService.download(this.TIPO_REQUERIMENTO, this.id).then(response => {
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

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
    });

    const noBackSave: Promise<any> = this.documentoService.noBackSave(this.gerarDocumentoParaSalvar(), 'requerimento');
    
    if(noBackSave) {
      noBackSave.then(data => {
        console.log(data);
        this.id = data['id'];
        this.requerimentoObject.id = this.id;
        this.initialRender();
        Swal.close();
      }).catch(error => {
        console.log(error);
        Swal.close();
      });
    }
  }

}

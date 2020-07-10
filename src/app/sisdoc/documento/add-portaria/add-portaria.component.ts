import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";

// Interfaces
import { Documento } from '../../../../models/documento.model';

//Services
import { DocumentoService } from '../../../../services/documento.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-portaria',
  templateUrl: './add-portaria.component.html',
  styleUrls: ['./add-portaria.component.css']
})
export class AddPortariaComponent implements OnInit {

  documento: Documento;
  id = null;
  urlPdf;
  urlDocumento: SafeResourceUrl;
  TIPO_PORTARIA: Number = 3;

  constructor(public documentoService: DocumentoService,
              public router: Router,
              public sanitizer: DomSanitizer,
              public activeRoute: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.documento = new Documento();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    if(this.id){
      this.documentoService.get(this.id).then(data => {

        this.documento.assunto = data['assunto'];
        this.documento.conteudo = data['conteudo'];
        this.documento.mensagemGeral = data['mensagemGeral'];
        this.documento.mensagemSetor = data['mensagemSetor'];
        this.documento.dataCriacao = data['dataCriacao'];
        
        this.documento.id = data['id'];
        this.initialRender();
      });
    } else {
      const today = new Date();
    this.documento.dataCriacao = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }
  }

  salvar() {
    this.documentoService.save(this.documento, 'portaria');
  }

  cancelar(){
    this.router.navigate(['/sisdoc/documento']);
  }

  recompilar() {

    const div = document.createElement('div');

    div.innerHTML = this.documento.conteudo;

    document.getElementById('conteudo-portaria').appendChild(div);
  }

  //METODO PARA GERAR PDF A PARTIR DE UMA IMAGEM DA TELA
  captureScreen() {
    var data = document.getElementById('contentToConvert');  
    
    html2canvas(document.querySelector("#contentToConvert")).then(canvas => {
        // Few necessary setting options 
        
       //var imgWidth = 208;   
        //var pageHeight = 295;    
        //var imgHeight = canvas.height * imgWidth / canvas.width;  
        //var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png');  
        //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        //var position = 0;  
        //pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        console.log(contentDataURL);
        //pdf.save('MYPdf.pdf'); // Generated PDF
    });
    
  }

  delay(ms: number): Promise<boolean> {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, ms);
    });
  }

  initialRender(){

    if(this.id) {
      console.log(this.id);
      this.documentoService.download(this.TIPO_PORTARIA, this.id).then(response => {
        const newBlob = new Blob([response], { type: "application/pdf" });
        this.urlPdf = window.URL.createObjectURL(newBlob);
        this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(newBlob));
      }).catch(error =>{
        console.log(error);
      });
    }
    
  }

  render() {

    Swal.fire({
      title: 'Aguarde...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false
  });

    const noBackSave: Promise<any> = this.documentoService.noBackSave(this.documento, 'portaria');
    
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

}

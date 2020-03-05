import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import { ActivatedRoute } from "@angular/router";

// Interfaces
import { Documento } from '../../../../models/documento.model';

//Services
import { DocumentoService } from '../../../../services/documento.service';

@Component({
  selector: 'app-add-despacho',
  templateUrl: './add-despacho.component.html',
  styleUrls: ['./add-despacho.component.css']
})
export class AddDespachoComponent implements OnInit {

  documento: Documento;
  id = null;

  constructor(public documentoService: DocumentoService,
              public router: Router,
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
        this.documento.id = data['id'];
      });
    }
  }

  salvar() {
    this.documentoService.save(this.documento, 'despacho');
  }

  cancelar(){
    this.router.navigate(['/sisdoc/documento']);
  }

}

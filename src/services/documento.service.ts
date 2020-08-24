import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import swal from 'sweetalert2';
import {Router} from "@angular/router"
import { Documento } from 'src/models/documento.model';

@Injectable()
export class DocumentoService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient,
        public router: Router
    ) { 
          
    }

    showLoad(){
        swal.fire({
            title: 'Aguarde...',
            onBeforeOpen: () => {
              swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
          });
    }

    noBackSave(documento, tipo): Promise<any> {
        if(tipo === 'oficio'){
            documento.tipoDocumentoId = 1;
        }

        if(tipo === 'portaria'){
            documento.tipoDocumentoId = 3;
        }

        if(tipo === 'requerimento'){
            documento.tipoDocumentoId = 4;
        }
        
        if(tipo === 'despacho'){
            documento.tipoDocumentoId = 5;
        }

        if(tipo === 'declaracao'){
            documento.tipoDocumentoId = 6;
        }

        if(tipo === 'ata'){
            documento.tipoDocumentoId = 7;
        }

        documento.usuarioId = localStorage.getItem("userId");

        if(documento.id){
            //EDITANDO
           return this.httpClient.put(this.apiUrl+'documento', documento,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise();
        } else {
            //INSERINDO
            return this.httpClient.post(this.apiUrl+'documento/'+tipo, documento,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise();
        }
    }

    save(documento, tipo){


        if(tipo === 'oficio'){
            documento.tipoDocumentoId = 1;
        }

        if(tipo === 'portaria'){
            documento.tipoDocumentoId = 3;
        }

        if(tipo === 'requerimento'){
            documento.tipoDocumentoId = 4;
        }
        
        if(tipo === 'despacho'){
            documento.tipoDocumentoId = 5;
        }

        if(tipo === 'declaracao'){
            documento.tipoDocumentoId = 6;
        }

        if(tipo === 'ata'){
            documento.tipoDocumentoId = 7;
        }

        if(tipo === 'parecer'){
            documento.tipoDocumentoId = 8;
        }


        documento.usuarioId = localStorage.getItem("userId");

        swal.fire({
            title: 'Aguarde...',
            onBeforeOpen: () => {
              swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
        });
        
        if(documento.id){
            //EDITANDO
            this.httpClient.put(this.apiUrl+'documento', documento,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise()
                .then(data => {
                    swal.close();

                    if(data['mensagem']) {
                        this.showSpecificErrorMessage(data['mensagem']);
                    } else {
                        this.showEditedMessage(tipo);
                        this.router.navigate(['/sisdoc/documento']);
                    }
                    
                }).catch(error =>{
                    console.log(error);
                    swal.close();
                    this.showErrorMessage();
                    this.router.navigate(['/sisdoc/documento']);
                })
        } else {
            //INSERINDO
            this.httpClient.post(this.apiUrl+'documento/'+tipo, documento,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise()
                .then(data => {
                    if(data['mensagem']) {
                        console.log(data);
                        this.showSpecificErrorMessage(data['mensagem']);
                    } else {
                        swal.close();
                        this.showSavedMessage(tipo);
                        this.router.navigate(['/sisdoc/documento']);
                    }
                    
                }).catch(error =>{
                    console.log(error);
                    swal.close();
                    this.showErrorMessage();
                    this.router.navigate(['/sisdoc/documento']);
                })
        }

    }
    
    get(id){

        return this.httpClient.get(this.apiUrl+'documento/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();

    }

    pesquisar(page, size){

        let apiURLPaginated = this.apiUrl+'documento';
        if(page != null && size!= null){
            apiURLPaginated = apiURLPaginated + '?page='+page+'&size='+size;
        }
        
        return this.httpClient.get(apiURLPaginated,
            {headers:
                {'Authorization':localStorage.getItem("token")}
            }).toPromise();
    }

    pesquisarEnviados(page, size, userId, documento:Documento){

        let apiURLPaginated = this.apiUrl+'documento/from-user/'+userId+'?';
        if(page != null && size!= null){
            apiURLPaginated = apiURLPaginated + 'page='+page+'&size='+size;
        }

        if(documento.identificador && documento.identificador !== ""){
            apiURLPaginated = apiURLPaginated + '&identificador='+documento.identificador;
        }

        if(documento.dataInicial){
            apiURLPaginated = apiURLPaginated + '&dataInicial='+documento.dataInicial;
        }

        if(documento.dataFinal){
            apiURLPaginated = apiURLPaginated + '&dataFinal='+documento.dataFinal;
        }

        if(documento.tipoDocumentoId){
            apiURLPaginated = apiURLPaginated + '&tipoDocumentoId='+documento.tipoDocumentoId;
        }
        
        return this.httpClient.get(apiURLPaginated,
            {headers:
                {'Authorization':localStorage.getItem("token")}
            }).toPromise();
    }

    pesquisarRecebidos(page, size, userId, documento:Documento){

        let apiURLPaginated = this.apiUrl+'documento/to-user/'+userId+'?';
        if(page != null && size!= null){
            apiURLPaginated = apiURLPaginated + 'page='+page+'&size='+size;
        }

        console.log(documento.identificador);
        
        if(documento.identificador && documento.identificador !== ""){
            apiURLPaginated = apiURLPaginated + '&identificador='+documento.identificador;
        }

        if(documento.dataInicial){
            apiURLPaginated = apiURLPaginated + '&dataInicial='+documento.dataInicial;
        }

        if(documento.dataFinal){
            apiURLPaginated = apiURLPaginated + '&dataFinal='+documento.dataFinal;
        }

        if(documento.tipoDocumentoId){
            apiURLPaginated = apiURLPaginated + '&tipoDocumentoId='+documento.tipoDocumentoId;
        }
        
        return this.httpClient.get(apiURLPaginated,
            {headers:
                {'Authorization':localStorage.getItem("token")}
            }).toPromise();
    }

    deletar(id){

        this.showLoad();

        return this.httpClient.delete(this.apiUrl+'documento/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    enviar(id){
        return this.httpClient.put(this.apiUrl+'documento/send/'+id, null,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    cancelarEnvio(id){
        return this.httpClient.put(this.apiUrl+'documento/cancelsend/'+id, null,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    download(idTipoDocumento, idDocumento){

        switch (idTipoDocumento) {
            case 1: //Oficio
                return this.downloadTipo(idDocumento, 'oficio');
            case 3:
                return this.downloadTipo(idDocumento, 'portaria');
            case 4:
                return this.downloadTipo(idDocumento, 'requerimento');
            case 5:
                return this.downloadTipo(idDocumento, 'despacho');
            case 6:
                return this.downloadTipo(idDocumento, 'declaracao');
            case 7:
                return this.downloadTipo(idDocumento, 'ata');
            case 8:
                return this.downloadTipo(idDocumento, 'parecer');
            default:
                break;
        }
        
        return null;
        
    }

    downloadDocWord(idDocumento, tipoDocumento){

        return this.httpClient.get(this.apiUrl+'documento/word/'+idDocumento+'?cargoId='+localStorage.getItem("userOfficeId")+'&tipoDocumento='+tipoDocumento,
                    {headers: 
                        {
                            Authorization: localStorage.getItem("token")
                        },
                        responseType: 'blob'
                    })
                .toPromise();
    }

    downloadTipo(idDocumento, tipo){

        return this.httpClient.get(this.apiUrl+'documento/'+tipo+'/'+idDocumento+'?cargoId='+localStorage.getItem("userOfficeId"),
                    {headers: 
                        {
                            Authorization: localStorage.getItem("token")
                        },
                        responseType: 'blob'
                    })
                .toPromise();
    }

    render(documento: Documento){

        return this.httpClient.post(this.apiUrl+'documento/render?cargoId='+localStorage.getItem("userOfficeId"), documento,
                    {headers: 
                        {
                            Authorization: localStorage.getItem("token")
                        },
                        responseType: 'blob'
                    })
                .toPromise();
    }

    showSavedMessage(tipo){
        swal.fire('Registro Salvo', 'Um novo ' + tipo + ' foi criado com sucesso', 'success');
    }

    showEditedMessage(tipo){
        swal.fire('Registro Salvo ', tipo + ' editado sucesso', 'success');
    }

    showDeletedMessage(){
        swal.fire('Registro deletado', 'Operação de deleção realizada com sucesso', 'success');
    }

    showErrorMessage(){
        swal.fire('Oops!', 'Algo de errado aconteceu.', 'error');
    }

    showSpecificErrorMessage(mensagem){
        swal.fire('Oops!', mensagem, 'error');
    }

}
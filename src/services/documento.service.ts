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

    save(documento, tipo){


        if(tipo === 'oficio'){
            documento.tipoDocumentoId = 1;
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
                    this.showEditedMessage(tipo);
                    this.router.navigate(['/sisdoc/documento']);
                    
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
                    swal.close();
                    this.showSavedMessage(tipo);
                    this.router.navigate(['/sisdoc/documento']);
                    
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

        if(documento.identificador !== null && documento.identificador !== ""){
            apiURLPaginated = apiURLPaginated + '&identificador='+documento.identificador;
        }

        if(documento.dataInicial !== null){
            apiURLPaginated = apiURLPaginated + '&dataInicial='+documento.dataInicial;
        }

        if(documento.dataFinal !== null){
            apiURLPaginated = apiURLPaginated + '&dataFinal='+documento.dataFinal;
        }

        if(documento.tipoDocumentoId !== null){
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

        if(documento.identificador !== null && documento.identificador !== ""){
            apiURLPaginated = apiURLPaginated + '&identificador='+documento.identificador;
        }

        if(documento.dataInicial !== null){
            apiURLPaginated = apiURLPaginated + '&dataInicial='+documento.dataInicial;
        }

        if(documento.dataFinal !== null){
            apiURLPaginated = apiURLPaginated + '&dataFinal='+documento.dataFinal;
        }

        if(documento.tipoDocumentoId !== null){
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
            default:
                break;
        }
        
        return null;
        
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

}
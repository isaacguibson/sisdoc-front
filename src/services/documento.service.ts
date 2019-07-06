import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import swal from 'sweetalert2';

@Injectable()
export class DocumentoService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
    ) { 
          
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
            this.httpClient.put(this.apiUrl+'documento/'+tipo, documento,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise()
                .then(data => {
                    console.log(data);
                    swal.close();
                    this.showEditedMessage(tipo);
                    
                }).catch(error =>{
                    console.log(error);
                    swal.close();
                    this.showErrorMessage();
                })
        } else {
            //INSERINDO
            this.httpClient.post(this.apiUrl+'documento/'+tipo, documento,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise()
                .then(data => {
                    console.log(data);
                    swal.close();
                    this.showSavedMessage(tipo);
                    
                }).catch(error =>{
                    console.log(error);
                    swal.close();
                    this.showErrorMessage();
                })
        }

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

        return this.httpClient.get(this.apiUrl+'documento/'+tipo+'/'+idDocumento,
                    {headers: 
                        {
                            Authorization: localStorage.getItem("token")
                        },
                        responseType: 'blob'
                    })
                .toPromise();
    }


    showSavedMessage(tipo){
        swal.fire('Registro Salvo', 'Um novo' + tipo + 'foi criado com sucesso', 'success');
    }

    showEditedMessage(tipo){
        swal.fire('Registro Salvo', tipo + 'editado sucesso', 'success');
    }

    showDeletedMessage(){
        swal.fire('Registro deletado', 'Operação de deleção realizada com sucesso', 'success');
    }

    showErrorMessage(){
        swal.fire('Oops!', 'Algo de errado aconteceu.', 'error');
    }

}
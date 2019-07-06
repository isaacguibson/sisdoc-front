import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import swal from 'sweetalert2';

@Injectable()
export class TipoDocumentoService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
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

    save(tipoDocumento){

        swal.fire({
            title: 'Aguarde...',
            onBeforeOpen: () => {
              swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
        });
        
        if(tipoDocumento.id){
            //EDITANDO
            this.httpClient.put(this.apiUrl+'tipo_documento', tipoDocumento,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise()
                .then(data => {
                    console.log(data);
                    swal.close();
                    this.showEditedMessage();
                    
                }).catch(error =>{
                    console.log(error);
                    swal.close();
                    this.showErrorMessage();
                })
        } else {
            //INSERINDO
            this.httpClient.post(this.apiUrl+'tipo_documento', tipoDocumento,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise()
                .then(data => {
                    console.log(data);
                    swal.close();
                    this.showSavedMessage();
                    
                }).catch(error =>{
                    console.log(error);
                    swal.close();
                    this.showErrorMessage();
                })
        }
        
        

    }

    deletar(id){

        this.showLoad();

        this.httpClient.delete(this.apiUrl+'tipo_documento/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise()
        .then(data => {
            console.log(data);
            swal.close();
            this.showDeletedMessage();
            
        }).catch(error =>{
            console.log(error);
            swal.close();
            this.showErrorMessage();
        })
    }

    get(id){
        return this.httpClient.get(this.apiUrl+'tipo_documento/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    pesquisar(page, size){

        let apiURLPaginated = this.apiUrl+'tipo_documento';
        if(page != null && size!= null){
            apiURLPaginated = apiURLPaginated + '?page='+page+'&size='+size;
        }

        return this.httpClient.get(apiURLPaginated,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();

    }

    listar(){

        let apiURLPaginated = this.apiUrl+'tipo_documento/listAll';

        return this.httpClient.get(apiURLPaginated,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();

    }

    showSavedMessage(){
        swal.fire('Registro Salvo', 'Um novo tipo de documento foi criado com sucesso', 'success');
    }

    showEditedMessage(){
        swal.fire('Registro Salvo', 'Tipo de documento editado sucesso', 'success');
    }

    showDeletedMessage(){
        swal.fire('Registro deletado', 'Operação de deleção realizada com sucesso', 'success');
    }

    showErrorMessage(){
        swal.fire('Oops!', 'Algo de errado aconteceu.', 'error');
    }

}
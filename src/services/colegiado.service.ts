import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Colegiado } from '../models/colegiado.model';
import { Usuario } from 'src/models/usuario.model';
import swal from 'sweetalert2';

@Injectable()
export class ColegiadoService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
    ) { 
        
    }

    get(id){
        return this.httpClient.get<Colegiado>(this.apiUrl+'colegiado/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    getDTO(id){
        return this.httpClient.get<Colegiado>(this.apiUrl+'colegiado/dto/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    findAll(){
        return this.httpClient.get<Colegiado[]>(this.apiUrl+'colegiado/all',
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    getMembros(id){
        return this.httpClient.get<Usuario[]>(this.apiUrl+'colegiado/membros/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    pesquisar(page, size, colegiado: Colegiado){
        
        let apiURLPaginated = this.apiUrl+'colegiado';
        if(page != null && size!= null){
            apiURLPaginated = apiURLPaginated + '?page='+page+'&size='+size;
        }

        if(colegiado.id){
            if(apiURLPaginated.includes('?')){
                apiURLPaginated = apiURLPaginated + '&id='+colegiado.id;
            } else {
                apiURLPaginated = apiURLPaginated + '?id='+colegiado.id;
            }
        }

        if(colegiado.nome){
            if(apiURLPaginated.includes('?')){
                apiURLPaginated = apiURLPaginated + '&nome='+colegiado.nome;
            } else {
                apiURLPaginated = apiURLPaginated + '?nome='+colegiado.nome;
            }
        }

        return this.httpClient.get(apiURLPaginated,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();

    }

    save(colegiado: Colegiado){
        swal.fire({
            title: 'Aguarde...',
            onBeforeOpen: () => {
              swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
        });
        
        if(colegiado.id){
            //EDITANDO
            this.httpClient.put(this.apiUrl+'colegiado', colegiado,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise()
                .then(data => {
                    swal.close();
                    this.showEditedMessage();
                    
                }).catch(error =>{
                    console.log(error);
                    swal.close();
                    this.showErrorMessage();
                })
        } else {
            //INSERINDO
            this.httpClient.post(this.apiUrl+'colegiado', colegiado,
                {headers:
                    {'Authorization':localStorage.getItem("token")}
                })
                .toPromise()
                .then(data => {
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

        return this.httpClient.delete(this.apiUrl+'colegiado/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
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

    showSavedMessage(){
        swal.fire('Registro Salvo', 'Um novo colegiado foi criado com sucesso', 'success');
    }

    showEditedMessage(){
        swal.fire('Registro Salvo', 'Colegiado editado sucesso', 'success');
    }

    showDeletedMessage(){
        swal.fire('Registro deletado', 'Operação de deleção realizada com sucesso', 'success');
    }

    showErrorMessage(){
        swal.fire('Oops!', 'Algo de errado aconteceu.', 'error');
    }

}
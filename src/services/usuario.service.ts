import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Usuario } from '../models/usuario.model';
import {Router} from "@angular/router";
import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient,
        public router: Router
    ) { 
        
    }

    listAllForList(){
        return this.httpClient.get(this.apiUrl+'usuario/all-for-list',
        {headers:
            {'Authorization':localStorage.getItem("token")}
        }).toPromise();
    }

    pesquisar(page, size, usuario: Usuario){

        let apiURLPaginated = this.apiUrl+'usuario?';
        if(page != null && size!= null){
            apiURLPaginated = apiURLPaginated + 'page='+page+'&size='+size;
        }

        if(usuario.nome !== null && usuario.nome !== '' && usuario.nome !== 'undefined'){
            apiURLPaginated = apiURLPaginated + '&nome='+usuario.nome;
        }

        if(usuario.email !== null && usuario.email !== '' && usuario.email !== 'undefined'){
            apiURLPaginated = apiURLPaginated + '&email='+usuario.email;
        }

        return this.httpClient.get(apiURLPaginated,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        }).toPromise();
    }

    get(id){
        return this.httpClient.get(this.apiUrl+'usuario/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    save(usuario){

        swal.fire({
            title: 'Aguarde...',
            onBeforeOpen: () => {
              swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
        });
        
        if(usuario.id){
            //EDITANDO
            this.httpClient.put(this.apiUrl+'usuario', usuario,
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
            this.httpClient.post(this.apiUrl+'usuario', usuario,
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

        return this.httpClient.delete(this.apiUrl+'usuario/'+id,
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
        swal.fire('Registro Salvo', 'Um novo usuário foi criado com sucesso', 'success').then(res => {
            this.router.navigate(['/sisdoc/usuario']);
        });
    }

    showEditedMessage(){
        swal.fire('Registro Salvo', 'Usuário editado sucesso', 'success').then(res => {
            this.router.navigate(['/sisdoc/perfil']);
        });
    }

    showDeletedMessage(){
        swal.fire('Registro deletado', 'Operação de deleção realizada com sucesso', 'success');
    }

    showErrorMessage(){
        swal.fire('Oops!', 'Algo de errado aconteceu.', 'error');
    }

}
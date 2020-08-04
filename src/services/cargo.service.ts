import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Cargo } from '../models/cargo.model';
import swal from 'sweetalert2';

@Injectable()
export class CargoService {

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

    save(cargo){

        swal.fire({
            title: 'Aguarde...',
            onBeforeOpen: () => {
              swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
        });
        
        if(cargo.id){
            //EDITANDO
            this.httpClient.put(this.apiUrl+'cargo', cargo,
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
            this.httpClient.post(this.apiUrl+'cargo', cargo,
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

        return this.httpClient.delete(this.apiUrl+'cargo/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    get(id){
        return this.httpClient.get(this.apiUrl+'cargo/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    cargosPorSetor(id) {
        return this.httpClient.get<any[]>(this.apiUrl+'cargo/setor/'+id,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();
    }

    pesquisar(page, size, cargo: Cargo){

        let apiURLPaginated = this.apiUrl+'cargo?';
        if(page != null && size!= null){
            apiURLPaginated = apiURLPaginated + 'page='+page+'&size='+size;
        }

        if(cargo.id){
            apiURLPaginated = apiURLPaginated + '&id='+cargo.id;
        }

        if(cargo.nome !== null && cargo.nome !== ''){
            apiURLPaginated = apiURLPaginated + '&nome='+cargo.nome;
        }

        if(cargo.setorId){
            apiURLPaginated = apiURLPaginated + '&setorId='+cargo.setorId;
        }

        return this.httpClient.get(apiURLPaginated,
        {headers:
            {'Authorization':localStorage.getItem("token")}
        })
        .toPromise();

    }

    showSavedMessage(){
        swal.fire('Registro Salvo', 'Um novo cargo foi criado com sucesso', 'success');
    }

    showEditedMessage(){
        swal.fire('Registro Salvo', 'Cargo editado sucesso', 'success');
    }

    showDeletedMessage(){
        swal.fire('Registro deletado', 'Operação de deleção realizada com sucesso', 'success');
    }

    showErrorMessage(){
        swal.fire('Oops!', 'Algo de errado aconteceu.', 'error');
    }

}
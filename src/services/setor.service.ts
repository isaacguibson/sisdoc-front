import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; 

@Injectable()
export class SetorService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
    ) { 
        
    }

    save(setor){

        this.httpClient.post(this.apiUrl+'setor', setor)
        .toPromise()
        .then(data => {
            console.log(data);
        }).catch(error =>{
            console.log(error)
        })

    }

    pesquisar(){

        return this.httpClient.get(this.apiUrl+'setor')
        .toPromise();

    }

}
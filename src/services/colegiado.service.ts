import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Colegiado } from '../models/colegiado.model';
import { Usuario } from 'src/models/usuario.model';

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

    findAll(){
        return this.httpClient.get<Colegiado[]>(this.apiUrl+'colegiado',
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

}
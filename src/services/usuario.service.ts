import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
    ) { 
        
    }

    listAllForList(){
        return this.httpClient.get(this.apiUrl+'usuario/all-for-list',
        {headers:
            {'Authorization':localStorage.getItem("token")}
        }).toPromise();
    }

}
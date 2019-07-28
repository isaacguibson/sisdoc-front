import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
    ) { 
        
    }

}
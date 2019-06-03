import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class LoginService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient,
        public router: Router
    ) { 
        
    }

    doLogin(loginObject){

        this.httpClient.post(this.apiUrl+'login', loginObject).toPromise().then(data=>{

            Swal.fire({
                title: 'Sucesso',
                text: 'Login realizado com sucesso',
                type: 'success',
                confirmButtonText: 'OK'
            }).then(value => {
                localStorage.setItem("token", data['JWT']);

                this.router.navigate(['/sisdoc/dashboard']);
            })

            
        }).catch(reason => {

            Swal.fire({
                title: 'Erro',
                text: 'Não foi possível realizar login',
                type: 'error',
                confirmButtonText: 'OK'
            });

        });

        return null;
    }

}
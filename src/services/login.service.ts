import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class LoginService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient,
        public auth: AuthService,
        public router: Router
    ) { 
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['sisdoc/dashboard']);
        }
    }

    doLogin(loginObject){

        Swal.fire({
            title: 'Aguarde...',
            onBeforeOpen: () => {
              Swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
          });

        this.httpClient.post(this.apiUrl+'login', loginObject).toPromise().then(data=>{

            Swal.close();

            Swal.fire({
                title: 'Sucesso',
                text: 'Login realizado com sucesso',
                type: 'success',
                confirmButtonText: 'OK'
            }).then(value => {
                localStorage.setItem("token", data['JWT']);

                localStorage.setItem("userId", data['usuario']["id"]);
                localStorage.setItem("userEmail", data['usuario']["email"]);
                localStorage.setItem("userName", data['usuario']["nome"]);
                localStorage.setItem("userTreatment", data['usuario']["tratamento"]);
                localStorage.setItem("userOffice", data['usuario']["cargo"]);
                localStorage.setItem("userDepartment", data['usuario']["setor"]);

                this.router.navigate(['/sisdoc/dashboard']);
            })

            
        }).catch(reason => {
            
            console.log(reason);

            Swal.close();
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
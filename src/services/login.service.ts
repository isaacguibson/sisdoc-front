import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

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
            
            localStorage.setItem("token", data['JWT']);

            this.router.navigate(['/sisdoc/dashboard']);
        });

        return null;
    }

}
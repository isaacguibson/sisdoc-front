import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; 

@Injectable()
export class LoginService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
    ) { 
        
    }

    doLogin(loginObject){
        return this.httpClient.post(this.apiUrl+'login', loginObject).toPromise();
    }

}
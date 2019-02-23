import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DocumentoService {

    constructor(
        public httpClient: HttpClient
    ) { 
          
    }

    save(documento){

        this.httpClient.post('http://localhost:4200', documento)
        .toPromise()
        .then(data => {
            console.log(data);
        }).catch(error =>{
            console.log(error)
        })

    }

}
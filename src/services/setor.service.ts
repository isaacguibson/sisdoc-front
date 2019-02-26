import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SetorService {

    constructor(
        public httpClient: HttpClient
    ) { 
          
    }

    save(setor){

        this.httpClient.post('http://localhost:8082/sisdoc-0.0.1-SNAPSHOT/setor', setor)
        .toPromise()
        .then(data => {
            console.log(data);
        }).catch(error =>{
            console.log(error)
        })

    }

}
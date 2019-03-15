import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TipoDocumentoService {

    constructor(
        public httpClient: HttpClient
    ) {
        
    }

    pesquisar(){

        return this.httpClient.get('http://localhost:8082/sisdoc-0.0.1-SNAPSHOT/tipo_documento')
        .toPromise();

    }

}
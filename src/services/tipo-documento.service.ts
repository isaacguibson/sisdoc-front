import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class TipoDocumentoService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
    ) {
        
    }

    pesquisar(){

        return this.httpClient.get(this.apiUrl+'tipo_documento')
        .toPromise();

    }

}
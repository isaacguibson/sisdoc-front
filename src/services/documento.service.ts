import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class DocumentoService {

    apiUrl = environment.apiUrl;

    constructor(
        public httpClient: HttpClient
    ) { 
          
    }

    save(documento){

        this.httpClient.post(this.apiUrl+'documento', documento)
        .toPromise()
        .then(data => {
            console.log(data);
        }).catch(error =>{
            console.log(error)
        })

    }

    pesquisar(){

        return this.httpClient.get(this.apiUrl+'documento')
        .toPromise();

    }


    download(idTipoDocumento, idDocumento){

        switch (idTipoDocumento) {
            case 1: //Oficio
                return this.downloadOficio(idDocumento);
            default:
                break;
        }
        
        return null;
        
    }

    downloadOficio(idDocumento){
        return this.httpClient.get(this.apiUrl+'documento/oficio/'+idDocumento, { responseType: 'blob' })
                .toPromise();
    }

}
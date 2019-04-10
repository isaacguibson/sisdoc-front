import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DocumentoService {

    constructor(
        public httpClient: HttpClient
    ) { 
          
    }

    save(documento){

        this.httpClient.post('http://localhost:8082/sisdoc-0.0.1-SNAPSHOT/documento', documento)
        .toPromise()
        .then(data => {
            console.log(data);
        }).catch(error =>{
            console.log(error)
        })

    }

    pesquisar(){

        return this.httpClient.get('http://localhost:8082/sisdoc-0.0.1-SNAPSHOT/documento')
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
        return this.httpClient.get('http://localhost:8082/sisdoc-0.0.1-SNAPSHOT/documento/oficio/'+idDocumento, { responseType: 'blob' })
                .toPromise();
    }

}
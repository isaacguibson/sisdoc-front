import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class LoginService {

    apiUrl = environment.apiUrl;
    htmlSelectString = '';

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
            }).then(val => {

                if(data['usuario']['cargos'].length > 1){
                    this.buildHtmlSelect(data['usuario']['cargos']);
                    Swal.fire({
                        title: 'Em qual cargo você deseja se logar?',
                        type: 'info',
                        html: this.htmlSelectString,
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                          'OK',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                          'Cancelar',
                        cancelButtonAriaLabel: 'Thumbs down',
                      }).then(result => {
                        
                        var element = document.getElementById("selectCargo");
                        var value = element['options'][element['selectedIndex']].value;

                        if(value != null && value !== '' && value != undefined){
                            localStorage.setItem("token", data['JWT']);
                            localStorage.setItem("userId", data['usuario']["id"]);
                            localStorage.setItem("userEmail", data['usuario']["email"]);
                            localStorage.setItem("userName", data['usuario']["nome"]);
                            localStorage.setItem("userTreatment", data['usuario']["tratamento"]);
                            localStorage.setItem("userOfficeId", data['usuario']['cargos'][value]['cargoId']);
                            localStorage.setItem("userDepartmentId", data['usuario']['cargos'][value]['setor']['setorId']);
                            localStorage.setItem("userOffice", data['usuario']['cargos'][value]['cargoNome']);
                            localStorage.setItem("userDepartment", data['usuario']['cargos'][value]['setor']['setorNome']);
                        
                            this.router.navigate(['/sisdoc/dashboard']);
                        } else {
                            return;
                        }
                    });

                } else {
                    localStorage.setItem("token", data['JWT']);
                    localStorage.setItem("userId", data['usuario']["id"]);
                    localStorage.setItem("userEmail", data['usuario']["email"]);
                    localStorage.setItem("userName", data['usuario']["nome"]);
                    localStorage.setItem("userTreatment", data['usuario']["tratamento"]);
                    localStorage.setItem("userOfficeId", data['usuario']['cargos'][0]['cargoId']);
                    localStorage.setItem("userDepartmentId", data['usuario']['cargos'][0]['setor']['setorId']);
                    localStorage.setItem("userOffice", data['usuario']['cargos'][0]['cargoNome']);
                    localStorage.setItem("userDepartment", data['usuario']['cargos'][0]['setor']['setorNome']);
                
                    this.router.navigate(['/sisdoc/dashboard']);
                }
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

    buildHtmlSelect(cargoList){

        this.htmlSelectString = '<select id="selectCargo" class="custom-select">';
        this.htmlSelectString += '<option value="">Selecione</option>';
    
        for (let index in cargoList){
          this.htmlSelectString += '<option value="'+index+'">'+cargoList[index]['cargoNome']+' - '+cargoList[index]['setor']['setorNome']+'</option>';
        }
    
        this.htmlSelectString += '</select>';
    }

}
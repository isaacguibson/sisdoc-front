import { Component, OnInit } from '@angular/core';

//Services
import { LoginService } from '../../../services/login.service'

@Component({
  selector: 'app-login-core',
  templateUrl: './login-core.component.html',
  styleUrls: ['./login-core.component.css']
})
export class LoginCoreComponent implements OnInit {

  loginObject = {'username': null, 'password': null};

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginObject);
    this.loginService.doLogin(this.loginObject);
  }

}

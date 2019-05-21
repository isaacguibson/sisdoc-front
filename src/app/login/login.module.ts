import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginCoreComponent } from './login-core/login-core.component';

import { AuthGuardService } from 'src/services/auth-guard.service';
import { AuthService } from 'src/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginCoreComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    JwtHelperService]
})
export class LoginModule { }

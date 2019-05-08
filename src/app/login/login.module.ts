import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginCoreComponent } from './login-core/login-core.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginCoreComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ]
})
export class LoginModule { }

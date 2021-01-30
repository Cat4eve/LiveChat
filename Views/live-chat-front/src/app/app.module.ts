import { LoginGuardGuard } from './Auth/login-guard.guard';
import { AuthService } from './Auth/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegComponent } from './reg/reg.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserTableComponent } from './user-table/user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegComponent,
    CabinetComponent,
    UserTableComponent,
    UserComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [AuthService, LoginGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

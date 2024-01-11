import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './myComponent/welcome/welcome.component';
import { EntityCrudComponent } from './entity-crud/entity-crud.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ItemListComponent } from './myComponent/item-list/item-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ItemUpdateComponent } from './item-update/item-update.component';
import { ItemDetailsComponent } from './myComponent/item-details/item-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './myComponent/login/login.component';
import { SignUpComponent } from './myComponent/sign-up/sign-up.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    EntityCrudComponent,
    ItemListComponent,
    ItemUpdateComponent,
    ItemDetailsComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

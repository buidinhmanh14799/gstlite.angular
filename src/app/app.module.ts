import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CartComponent } from './cart/cart.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AddproductComponent,
    CartComponent,
    ProductdetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

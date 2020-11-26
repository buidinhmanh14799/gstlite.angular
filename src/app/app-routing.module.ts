import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import {CartComponent} from './cart/cart.component';
import {ProductdetailComponent} from './productdetail/productdetail.component'
import {BrowserModule} from '@angular/platform-browser'
import {ReactiveFormsModule} from '@angular/forms'
import {HomeComponent} from './home/home.component'
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/addproduct',
    component: AddproductComponent
  },
  {
    path: 'product/:id',
    component: ProductdetailComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];
@NgModule({
  imports: [BrowserModule,
    ReactiveFormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

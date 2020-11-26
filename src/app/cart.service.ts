import { Injectable } from '@angular/core';
import { CartItem } from '../app/model'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private urlAPI = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient){};
  addToCart(product) {

    var cartItem = new CartItem();
    cartItem.id = product.id;
    cartItem.name = product.name;
    cartItem.price = product.price;
    cartItem.quantity = 1;

    var products = JSON.parse(localStorage.getItem('cart'));
    if (products == null) {
      products = []
      products.push(cartItem);
    }
    else {
      var flag = false;
      console.log(products);
      for (var i = 0; i < products.length; i++) {
        console.log(product);

        if (products[i].id === cartItem.id) {
          products[i].quantity += 1;
          flag = true;
          break;
        }
      }
      if (flag === false) {
        products.push(cartItem);
      }
    }
    localStorage.setItem('cart', JSON.stringify(products));
  }
  removeFromCart(product) {
    var temps = []
    var products = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < products.length; i++) {
      if (products[i].id != product.id) {
        temps.push(products[i]);
      }
    }
    console.log(temps);
    localStorage.setItem('cart', JSON.stringify(temps));
  }
  getItems() {
    var products = JSON.parse(localStorage.getItem('cart'));
    return products;
  }

  clearCart() {
    localStorage.setItem('cart', JSON.stringify(null));
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../addproduct/product.service'
import { Product } from '../model';
import { Router } from '@angular/router'
import {CartService} from '../cart.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productName = '';
  products;
  bool = true;
  items = []
  constructor(private productService: ProductService, private router: Router,private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllItem(this.bool);
  }

  public getAllItem(bool) {
    if (bool == true) {
      this.products = this.productService.getAllProduct().subscribe(
        (data) => {
          this.items= [];
          if (data != null) {
            data.forEach(element => {
              if(element.unitInStock > 0)
              {
                this.items.push(element);
              }
            });
          }
        }
      );
    }
    console.log(JSON.parse(localStorage.getItem('cart')))
  }
  public goDetail(item) {
    var url = `/product/:id`;
    this.router.navigateByUrl(url.replace(':id', item.id));
  }
  public search(productName) {
    this.products = this.productService.getProductByName(productName).subscribe(
      (data) => {
        if (data != null) {
          this.items = []
          this.items = data;
          this.bool = false;
          this.ngOnInit();
        }
        else {
          this.bool = true;
          this.ngOnInit();
        }
      }
    )
    console.log(this.items);
  }
  public addToCart(item)
  {
      this.cartService.addToCart(item);
      window.alert("add " + item.name + " to cart")
  }
}

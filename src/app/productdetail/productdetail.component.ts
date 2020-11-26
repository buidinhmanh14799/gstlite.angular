import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ProductService} from '../addproduct/product.service'
import { map } from 'rxjs/operators';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent implements OnInit {

  public productId = '';
  @Input() productName = '';
  @Input() productDescription = '';
  @Input() unitPrice = 0;
  @Input() unitInStock = 0;
  @Input() category = '';
  @Input() condition = '';
  @Input() manufacturer = '';
  @Input() productImage = '';
  temp;
  product;
  constructor(private actRoute: ActivatedRoute,private productService: ProductService,private cartService: CartService) { }

  ngOnInit(): void {
    if(localStorage.getItem('username') != null)
    {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
    this.productId = this.actRoute.snapshot.params['id'];
    this.temp = this.productService.getProduct(this.productId).subscribe(
      (data) =>  {
        if(data != null)
        {
          this.productName = data.name;
          this.productDescription = data.description;
          this.unitInStock = data.unitInStock;
          this.unitPrice = data.price;
          this.manufacturer = data.manufacturer;
          this.productImage = data.image;
          this.category = data.category;
          this.condition = data.productCondition;
          this.product = data;
          console.log(data);
          console.log(this.product);
        }
      }
    );
  }
  public addToCart(product){
    const status = this.cartService.addToCart(product);
    if (status) {
      window.alert("add " + product.name + " to cart")
    }
  }

}

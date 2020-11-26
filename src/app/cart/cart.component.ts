import { Component, OnInit, Input } from '@angular/core';
import { CartService } from "../cart.service"
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items;
  @Input() total: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.total = 0;
    this.items = this.cartService.getItems();
    if (this.items != null) {
      this.items.forEach(element => {
        this.total += (element.price * element.quantity);
      });
    }
  }
  public removeFromCart(item) {
    this.cartService.removeFromCart(item);
    this.ngOnInit();
  }
  public clearCart() {
    this.cartService.clearCart();
    this.ngOnInit();
  }
}


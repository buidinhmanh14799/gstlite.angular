import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() buttonlogout = '';
  @Input() button = '';
  @Input() cartCount: '0';
  @Input() isAdmin = false;
  public amen = '';
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }
  ngOnInit(): void {
    if (this.isAdmin) {
      if (localStorage.getItem('username') != null) {
        this.buttonlogout = 'logout';
      }
      if (JSON.parse(localStorage.getItem('cart')) != null) {
        this.cartCount = JSON.parse(localStorage.getItem('cart')).length;
      }
    }
  }
  public onLogout = () => {
    this.authenticationService.logout();
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigateByUrl('/login');
  }

}

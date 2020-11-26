import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() loginfail = '';
  loginForm: FormGroup;
  submitted = false;
  public userName = '';
  public passWord = '';
  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {

  }
  login = () => {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.userName, this.passWord).subscribe(
      (data) => {
        if (data != null && data.username) {
          localStorage.setItem('username', data.username);
          localStorage.setItem('password', data.password);
          this.router.navigateByUrl("/admin/addproduct");
          console.log('Login success');
          this.router.navigateByUrl("/admin/addproduct");
        }
        else {
          this.loginfail = 'Tài khoản hoặc mật khẩu không chính xác';
          console.log('Login fail');
        }
      },
      (err) => console.error(err)
    )
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    var username = localStorage.getItem('username');
    console.log("username: " + username);
    if (username !== null) {
      var url = `/admin/addproduct`;
      this.router.navigateByUrl(url);
    }

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    });
  }

}

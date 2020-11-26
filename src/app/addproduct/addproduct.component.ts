import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from './product.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  addProductForm: FormGroup;
  submitted = false;
  fileData: File;

  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder) { }
  public name = '';
  public price: 0;
  public unitInStock: 0;
  public description = '';
  public manufacturer = '';
  public category = '';
  public productCondition = '';
  public image = '';

  get f() { return this.addProductForm.controls; }

  ngOnInit(): void {
    var username = localStorage.getItem('username');
    console.log("username: " + username);
    if (username === null) {
      var url = `/login`;
      this.router.navigateByUrl(url);
      return;
    }
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      unitInStock: ['', Validators.required],
      description: ['', Validators.required],
      manufacturer: ['', Validators.required],
      category: ['', Validators.required],
      productCondition: ['', Validators.required],
      image: ['', Validators.required]
    });

  }
  public addProduct = () => {

    this.submitted = true;
    if (this.addProductForm.invalid) {
      console.log(this.addProductForm.value);
      return;
    }

    let product = this.addProductForm.value as Product;
    product.image=this.image;

    this.productService.addProduct(product).subscribe(
      (data) => {
        if (data != null) {
          this.name = '';
          this.price = 0;
          this.unitInStock = 0;
          this.description = '';
          this.manufacturer = '';
          this.productCondition = '';
          this.image = '';
          this.category = '';
          this.submitted = false;
          this.addProductForm.reset();
          alert("Thêm sản phẩm thành công!")
        } else {
          alert("Thêm sản phẩm thất bại!")
        }
      }, error => console.log(error));
  }

  fileProgress(fileInput: any) {
    var me = this;
    this.fileData = <File>fileInput.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = function () {
      me.image = reader.result.toString();
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}

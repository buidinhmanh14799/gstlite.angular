import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { Product } from '../model'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private currentProductSubject: BehaviorSubject<Product>;
  public currentProduct: Observable<Product>;
  private urlAPI = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) {
    this.currentProductSubject = new BehaviorSubject<Product>(
      JSON.parse(localStorage.getItem('currentProduct'))
    );
    this.currentProduct = this.currentProductSubject.asObservable();
  }
  public get currentProductValue(): Product {
    return this.currentProductSubject.value;
  }
  public addProduct = (product: Product) => {
    const loginUrl = `${this.urlAPI}/api/product/add`;
    return this.http.post<any>(loginUrl, {
      name: product.name, price: product.price,
      unitInStock: product.unitInStock, description: product.description,
      manufacturer: product.manufacturer, category: product.category,
      productCondition: product.productCondition, image: product.image
    })
      .pipe(map((product) => {
        if (product != null) {
          const newProduct = {} as Product;
          newProduct.id = product.id;
          newProduct.name = product.name;
          newProduct.price = product.price;
          newProduct.unitInStock = product.unitInStock;
          newProduct.description = product.description;
          newProduct.category = product.category;
          newProduct.productCondition = product.productCondition;
          newProduct.manufacturer = product.manufacturer;
          newProduct.image = product.image;
          this.currentProductSubject.next(newProduct);
          return newProduct;
        } else {
          return null;
        }
      }))
  }
  public getAllProduct = () => {
    const getProductUrl = `${this.urlAPI}/api/product/list`;
    return this.http.get<any>(getProductUrl).pipe(
      map((products) => {
        if (products != null) {
          const getProduct = [];
          products.forEach(element => {
            getProduct.push(element);
            this.currentProductSubject.next(element);
          });
          return getProduct;
        }
        else {
          return null;
        }
      })
    )
  }
  public getProductByName = (productName: string) => {
    const getUrl = `${this.urlAPI}/api/product/search?productName=` + productName;
    return this.http.get<any>(getUrl).pipe(
      map((products) => {
        if (products != null) {
          const getProduct = [];
          products.forEach(element => {
            getProduct.push(element);
            this.currentProductSubject.next(element);
          });
          return getProduct;
        }
        else {
          return null;
        }
      })
    )
  }
  public getProduct = (id: string) => {
    const getProductUrl = `${this.urlAPI}/api/product/get/:id`;
    const x = getProductUrl.replace(":id", id);
    console.log(x);
    return this.http.get<Product>(x).pipe(
      map((product) => {
        if (product != null) {
          const getProduct = {} as Product;
          getProduct.id = product.id;
          getProduct.name = product.name;
          getProduct.image = product.image;
          getProduct.description = product.description;
          getProduct.category = product.category;
          getProduct.price = product.price;
          getProduct.unitInStock = product.unitInStock;
          getProduct.manufacturer = product.manufacturer;
          getProduct.productCondition = product.productCondition;
          this.currentProductSubject.next(getProduct);
          return getProduct;
        }
        else {
          return null;
        }
      })
    )
  }
}

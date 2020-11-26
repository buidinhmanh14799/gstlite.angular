export class User{
    id: Int32Array;
    username: string;
    password: string;
}
export class Product{
    id: Int32Array;
    name: string;
    price: number;
    unitInStock: number;
    description: string;
    manufacturer: string;
    category: string;
    productCondition: string;
    image: string;
}

export class CartItem{
  id: Int32Array;
  name: string;
  price: number;
  quantity: number
}

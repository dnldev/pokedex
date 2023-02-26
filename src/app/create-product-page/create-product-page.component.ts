import { Component } from '@angular/core';
import Product from "../types/Product";

@Component({
  selector: 'pokedex-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent {
  products = [new Product()];

  stringify = JSON.stringify;

  addProduct() {
    this.products.push(new Product());
  }
}

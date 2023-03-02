import { Component } from '@angular/core';
import {getLocalStorageProducts} from "../types/Product";

@Component({
  selector: 'pokedex-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  stringify = JSON.stringify;

  localStorageProducts = getLocalStorageProducts;
}

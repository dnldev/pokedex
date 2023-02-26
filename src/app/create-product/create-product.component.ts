import {Component, Input} from '@angular/core';
import Product from "../types/Product";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'pokedex-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  @Input() product!: Product;

  form: FormGroup;
  stringify = JSON.stringify;

  constructor(builder: FormBuilder) {
    this.form = builder.group({
      name: new FormControl(''),
      description: new FormControl(''),
    });
  }
}

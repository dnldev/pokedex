import {Component, Input} from '@angular/core';
import Product from "../types/Product";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'pokedex-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  @Input() product!: Product;
  @Input() form!: FormGroup;
  stringify = JSON.stringify;
  categories = ['Electronics', 'Clothes', 'Blankets'];
  phoneSelections = ['Mobile', 'Landline'];
  get invalidControls(): string[] {
    return Object.keys(this.form.controls).filter(controlName => this.form.controls[controlName].invalid);
  };
}

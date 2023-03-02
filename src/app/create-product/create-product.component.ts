import {Component, Input} from '@angular/core';
import {Product} from "../types/Product";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'pokedex-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  @Input() product!: Product;
  @Input() form!: FormGroup;
  categories = ['Electronics', 'Clothes', 'Blankets'];
  phoneSelections = ['Mobile', 'Landline'];
}

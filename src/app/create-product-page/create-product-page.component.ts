import { Component } from '@angular/core';
import Product from "../types/Product";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'pokedex-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.scss']
})
export class CreateProductPageComponent {
  products = [new Product()];
  forms: FormGroup[];
  phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

  stringify = JSON.stringify;
  alert = alert;
  private imageUrlRegex = /(http(s?):)([/.\w\s-])*\.(?:jpg|gif|png|jpeg)/i;

  constructor(private builder: FormBuilder) {
    this.forms = [this.getProductFormGroup()];
  }

  getProductFormGroup(): FormGroup {
    return this.builder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-z0-9]+$/i)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-z0-9]+$/i)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?:\d*\.\d{1,2}|\d+)$/)
      ]),
      category: new FormControl(''),
      imageUrl: new FormControl('', [
        Validators.required,
        Validators.pattern(this.imageUrlRegex)
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(this.phoneNumberRegex)
      ]),
      select: new FormControl(''),
    })
  }

  addProduct() {
    this.products.push(new Product());
    this.forms.push(this.getProductFormGroup());
  }

  get allFormsValidAndSelectionsPresent() {
    return this.forms.every(form => form.valid) && this.products.every(product => product.category && product.select);
  }

}

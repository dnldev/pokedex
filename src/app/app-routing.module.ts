import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pokemon-list/pokemon-list.component";
import {PokemonDetailComponent} from "./pokemon-detail/pokemon-detail.component";
import {CreateProductPageComponent} from "./create-product-page/create-product-page.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {getLocalStorageProducts} from "./types/Product";

const routes: Routes = [
  { path: '', redirectTo: 'pokemon-list', pathMatch: 'full' },
  { path: 'pokemon-list', component: PokemonListComponent },
  { path: 'pokemon-detail', component: PokemonDetailComponent },
  { path: 'create-product', component: CreateProductPageComponent },
  { path: 'product-list', component: ProductListComponent, canActivate: [() => getLocalStorageProducts().length > 0] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

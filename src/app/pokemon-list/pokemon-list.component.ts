import { Component } from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Observable} from "rxjs";
import {SimplePokemon} from "../types";

@Component({
  selector: 'pokedex-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemon: Observable<SimplePokemon[]>;

  constructor(pokemonService: PokemonService) {
    this.pokemon = pokemonService.getPokemon();
  }
}

import {Component} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "pokenode-ts";
import {Router} from "@angular/router";

const ELEMENTS_PER_PAGE = 30;

@Component({
  selector: 'pokedex-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  currentLimit = 0;
  pokemonPromise: Promise<Pokemon[]>;

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.pokemonPromise = pokemonService.getPokemon();
  }

  loadNext() {
    this.currentLimit += ELEMENTS_PER_PAGE;
    this.pokemonPromise = this.pokemonService.getPokemon(this.currentLimit, ELEMENTS_PER_PAGE);
  }

  loadPrevious() {
    this.currentLimit -= ELEMENTS_PER_PAGE;
    this.pokemonPromise = this.pokemonService.getPokemon(this.currentLimit, ELEMENTS_PER_PAGE);
  }

  navigateToPokemonDetail(pokemonId: number) {
    this.router.navigate(['/pokemon-detail'], {queryParams: {'pokemonId': pokemonId}});
  }
}

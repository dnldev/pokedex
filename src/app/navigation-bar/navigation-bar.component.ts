import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {PokemonService} from "../services/pokemon.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pokedex-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(
    private userService: UserService,
    private pokemonService: PokemonService,
    private router: Router,
  ) {}

  isAdmin = () => this.userService.isAdmin;
  search: string = '';

  async triggerSearch() {
    const searchResultPokemon = await this.pokemonService.getPokemonByName(this.search);
    if (!!searchResultPokemon) {
      this.router.navigate(['/pokemon-detail'], {queryParams: {'pokemonId': searchResultPokemon.id}});
    }
  }
}

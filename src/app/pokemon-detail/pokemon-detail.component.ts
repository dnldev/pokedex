import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "pokenode-ts";

@Component({
  selector: 'pokedex-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  pokemonPromise: Promise<Pokemon> | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    this.route.queryParams
      .subscribe(params => {
        const pokemonIdParam = params['pokemonId'];
        if (!pokemonIdParam) { // if clicked on detail in nav-bar, navigate to list
          router.navigate(['pokemon-list']);
        }
        const pokemonId = pokemonIdParam as number;
        this.pokemonPromise = pokemonService.getPokemonById(pokemonId);
      });
  }
}

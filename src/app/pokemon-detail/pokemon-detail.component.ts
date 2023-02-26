import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import {EvolutionChain, EvolutionDetail, Pokemon, PokemonStat} from "pokenode-ts";

@Component({
  selector: 'pokedex-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  private pokemonId: number = -1;
  pokemonPromise: Promise<Pokemon> | null = null;
  statNames: { [key: string]: string; } = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    'special-attack': 'Sp Atk',
    'special-defense': 'Sp Def',
  };
  evolutionPokemonAndLevel: { evolutionPokemon: Pokemon; evolutionLevel: number } | null = null;

  stringify = JSON.stringify;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    this.route.queryParams
      .subscribe(params => {
        const pokemonIdParam = params['pokemonId'];
        if (!pokemonIdParam) { // if clicked on detail in nav-bar, navigate to list
          router.navigate(['pokemon-list']);
        }
        this.pokemonId = pokemonIdParam as number;
        this.pokemonPromise = pokemonService.getPokemonById(this.pokemonId);
      });
  }

  ngOnInit() {
    this.pokemonPromise?.then(pokemon => {
      this.pokemonService.getEvolutionNameAndLevelByName(pokemon.name)
        .then((evolution) => {
          if (evolution == null) {
            return;
          }
          this.pokemonService.getPokemonByName(evolution.evolutionName)
            .then(pokemon => this.evolutionPokemonAndLevel = {evolutionPokemon: pokemon, evolutionLevel: evolution.evolutionLevel})
        });
    });
  }

  getStatList(pokemonStats: PokemonStat[]): { key: string, value: number }[] {
    return pokemonStats.map((pokemonStat) => (
      {key: pokemonStat['stat']['name'], value: pokemonStat['base_stat'] as number}
    ));
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import {EvolutionChain, EvolutionDetail, Pokemon, PokemonStat, PokemonType} from "pokenode-ts";
import {PokemonType as PokemonTypeEnum} from "../types/PokemonType";

@Component({
  selector: 'pokedex-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
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
  evolutionPokemonAndLevel: { evolutionPokemon: Pokemon; evolutionLevel: number | null } | null = null;

  stringify = JSON.stringify;
  log = console.log;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) {
    this.route.queryParams
      .subscribe(params => {
        const pokemonIdParam = params['pokemonId'];
        if (!pokemonIdParam) { // if clicked on detail in nav-bar, navigate to list
          router.navigate(['home']);
        }
        this.pokemonId = pokemonIdParam as number;
        this.loadEvolutionDetails(this.pokemonId);
        this.pokemonPromise = pokemonService.getPokemonById(this.pokemonId);
      });
  }

  getStatList(pokemonStats: PokemonStat[]): { key: string, value: number }[] {
    return pokemonStats.map((pokemonStat) => (
      {key: pokemonStat['stat']['name'], value: pokemonStat['base_stat'] as number}
    ));
  }

  private loadEvolutionDetails(pokemonId: number) {
    this.pokemonService.getEvolutionNameAndLevelById(this.pokemonId)
      .then((evolution) => {
        if (!!evolution) {
          this.pokemonService.getPokemonByName(evolution.evolutionName)
            .then(pokemon => this.evolutionPokemonAndLevel = {
              evolutionPokemon: pokemon,
              evolutionLevel: evolution.evolutionLevel
            });
        }
      });
  }

  getTypeEnumListFromApiTypes(types: PokemonType[]): PokemonTypeEnum[] {
    return types.map(({type}) => type.name as PokemonTypeEnum);
  }
}

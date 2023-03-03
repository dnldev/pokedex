import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonService} from "../services/pokemon.service";
import {EvolutionChain, EvolutionDetail, Pokemon, PokemonStat, PokemonType, TypeRelations} from "pokenode-ts";
import {PokemonType as PokemonTypeEnum} from "../types/PokemonType";
import {typeColors} from "../types/typeColors";
import {toTitleCase, unique} from "../helpers";

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
  profile: { [key: string]: string | null; } = {
    'Height': null,
    'Catch Rate': null,
    'Egg Groups': null,
    'Abilities': null,
    'Weight': null,
    'Gender Ratio': null,
    'Hatch Steps': null,
    'EVs': null,
  }
  evolutionPokemonAndLevel: { evolutionPokemon: Pokemon; evolutionLevel: number | null } | null = null;
  strongAgainst: PokemonTypeEnum[] = [];
  weakAgainst: PokemonTypeEnum[] = [];
  flavorText = '';

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
        this.fillProfileData(this.pokemonPromise);
        this.fillStrengthAndWeakness(this.pokemonPromise);
        this.fillFlavorText(this.pokemonId);
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

  async fillProfileData(pokemonPromise: Promise<Pokemon>) {
    const pokemon = await pokemonPromise;
    const species = await this.pokemonService.getSpeciesById(this.pokemonId)
    this.profile['Height'] = `${(pokemon.height / 10).toFixed(1)} m`;
    this.profile['Weight'] = `${(pokemon.weight / 10).toFixed(1)} kg`
    this.profile['Catch Rate'] = `${species.capture_rate}`;
    this.profile['Egg Groups'] = species.egg_groups.map(({name}) => toTitleCase(name)).join(', ');
    this.profile['Abilities'] = pokemon.abilities.map(({ability}) => toTitleCase(ability.name)).join(', ');
    const femaleChance = species.gender_rate * 0.125;
    this.profile['Gender Ratio'] = `${(1 - femaleChance) * 100}% ♂ / ${femaleChance * 100}% ♀`;
    const specialAttackAmount = pokemon.abilities.filter(({is_hidden}) => !is_hidden).length;
    this.profile['EVs'] = `${specialAttackAmount} Sp Att` + (specialAttackAmount > 1 ? 's' : '');
    this.profile['Hatch Steps'] = `${species.hatch_counter * 255} Steps`;
  }

  getTypeEnumListFromApiTypes(types: PokemonType[]): PokemonTypeEnum[] {
    return types.map(({type}) => type.name as PokemonTypeEnum);
  }

  getFirstTypeColorFromPokemon(pokemon: Pokemon): string {
    return typeColors[pokemon.types[0].type.name as PokemonTypeEnum];
  }

  async fillStrengthAndWeakness(pokemonPromise: Promise<Pokemon>) {
    const pokemon = await pokemonPromise;
    const damageRelationPromises = pokemon.types.map(type => this.pokemonService.getDamageRelationsOfType(type));
    Promise.all(damageRelationPromises).then((damageRelationsOfAllTypes: TypeRelations[]) => {
      damageRelationsOfAllTypes.forEach(damageRelations => {
        this.strongAgainst = unique([
          ...damageRelations.double_damage_to,
          ...damageRelations.no_damage_from,
          ...damageRelations.half_damage_from
        ].map(relation => relation.name as PokemonTypeEnum));
        this.weakAgainst = unique([
          ...damageRelations.no_damage_to,
          ...damageRelations.half_damage_from,
          ...damageRelations.double_damage_from
        ].map(relation => relation.name as PokemonTypeEnum));
      })
    });
  }

  async fillFlavorText(pokemonId: number) {
    this.flavorText = await this.pokemonService.getFlavorText(pokemonId);
  }
}

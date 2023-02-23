import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PokemonResponse, SimplePokemon} from "../types";
import { PokemonClient, Pokemon } from "pokenode-ts";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonClient: PokemonClient;

  constructor() {
    this.pokemonClient = new PokemonClient();
  }

  async getPokemon(offset = 0, limit = 20): Promise<Pokemon[]> {
    const pokemon: Pokemon[] = [];
    for (const {name} of (await this.pokemonClient.listPokemons(offset, limit)).results) {
      pokemon.push(await this.pokemonClient.getPokemonByName(name));
    }
    return pokemon;
  }

  async getPokemonById(pokemonId: number): Promise<Pokemon> {
    return this.pokemonClient.getPokemonById(pokemonId);
  }
}

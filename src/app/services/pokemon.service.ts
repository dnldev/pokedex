import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PokemonResponse, SimplePokemon} from "../types";

export const BASE_URL = 'https://pokeapi.co/api/v2';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  fetchNextPokemonUri = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30';

  constructor(private http: HttpClient) {
  }

  getPokemon(): Observable<SimplePokemon[]> {
    return new Observable<SimplePokemon[]>(subscriber => {
      this.http.get(this.fetchNextPokemonUri).subscribe(response => {
        const pokemonResponse = response as PokemonResponse;
        this.fetchNextPokemonUri = pokemonResponse.next;
        subscriber.next(pokemonResponse.results);
      });
    })

  }
}

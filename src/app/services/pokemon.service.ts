import {Injectable} from '@angular/core';
import {EvolutionClient, Pokemon, PokemonClient} from "pokenode-ts";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonClient: PokemonClient;
  private readonly evolutionClient: EvolutionClient;

  constructor() {
    this.pokemonClient = new PokemonClient();
    this.evolutionClient = new EvolutionClient();
  }

  async getPokemon(offset: number, limit: number): Promise<Pokemon[]> {
    const pokemon: Pokemon[] = [];
    for (const {name} of (await this.pokemonClient.listPokemons(offset, limit)).results) {
      pokemon.push(await this.pokemonClient.getPokemonByName(name));
    }
    return pokemon;
  }

  getPokemonById(pokemonId: number): Promise<Pokemon> {
    return this.pokemonClient.getPokemonById(pokemonId);
  }

  getPokemonByName(name: string): Promise<Pokemon> {
    return this.pokemonClient.getPokemonByName(name);
  }

  // return null if there is no more evolutions
  async getEvolutionNameAndLevelByName(speciesName: string): Promise<{ evolutionName: string; evolutionLevel: number } | null> {
    const species = await this.pokemonClient.getPokemonSpeciesByName(speciesName);
    const evolutionChainUrlParts = species.evolution_chain.url.split('/');
    // id is second last part because url ends with '/' so parts ends with empty string
    const evolutionChainId = evolutionChainUrlParts[evolutionChainUrlParts.length - 2] as unknown as number;
    const evolutionChain = await this.evolutionClient.getEvolutionChainById(evolutionChainId);
    let evolvesTo = evolutionChain.chain.evolves_to[0];

    if (evolutionChain.chain.species.name !== speciesName) {
      while (evolvesTo.species.name !== speciesName) {
        evolvesTo = evolvesTo.evolves_to[0];
        if (!evolvesTo) {
          return null;
        }
      }

      evolvesTo = evolvesTo.evolves_to[0];
    }

    return {
      evolutionName: evolvesTo.species.name,
      evolutionLevel: evolvesTo.evolution_details[0].min_level as unknown as number
    };
  }
}

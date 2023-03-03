import {Injectable} from '@angular/core';
import {
  EvolutionClient,
  Move,
  MoveClient,
  Pokemon,
  PokemonClient,
  PokemonSpecies,
  PokemonType,
  TypeRelations
} from "pokenode-ts";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonClient: PokemonClient;
  private readonly evolutionClient: EvolutionClient;
  private readonly moveClient: MoveClient;

  constructor() {
    this.pokemonClient = new PokemonClient();
    this.evolutionClient = new EvolutionClient();
    this.moveClient = new MoveClient();
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
  async getEvolutionNameAndLevelById(pokemonId: number): Promise<{ evolutionName: string; evolutionLevel: number } | null> {
    const species = await this.pokemonClient.getPokemonSpeciesById(pokemonId);
    const evolutionChainUrlParts = species.evolution_chain.url.split('/');
    // id is second last part because url ends with '/' so parts ends with empty string
    const evolutionChainId = evolutionChainUrlParts[evolutionChainUrlParts.length - 2] as unknown as number;
    const evolutionChain = await this.evolutionClient.getEvolutionChainById(evolutionChainId);
    let evolvesTo = evolutionChain.chain.evolves_to[0];
    if (evolvesTo == null) {
      return null;
    }

    if (evolutionChain.chain.species.name !== species.name) {
      while (evolvesTo.species.name !== species.name) {
        evolvesTo = evolvesTo.evolves_to[0];
        if (!evolvesTo) {
          return null;
        }
      }

      evolvesTo = evolvesTo.evolves_to[0];
    }

    return !evolvesTo ? null : {
      evolutionName: evolvesTo.species.name,
      evolutionLevel: evolvesTo.evolution_details[0].min_level as unknown as number
    };
  }

  async getDamageRelationsOfType(type: PokemonType): Promise<TypeRelations> {
    return (await this.pokemonClient.getTypeByName(type.type.name)).damage_relations;
  }

  async getSpeciesById(pokemonId: number): Promise<PokemonSpecies> {
    return await this.pokemonClient.getPokemonSpeciesById(pokemonId);
  }
}

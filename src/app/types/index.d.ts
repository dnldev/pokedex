export class PokemonResponse {
  count: number;
  next: string;
  previous?: string;
  results: SimplePokemon[];
}

export class SimplePokemon {
  name: string;
  url: string;
}

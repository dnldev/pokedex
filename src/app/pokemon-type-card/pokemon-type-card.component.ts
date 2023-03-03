import {Component, Input} from '@angular/core';
import {PokemonType} from "../types/PokemonType";
import {typeColors} from "../types/typeColors";

@Component({
  selector: 'pokedex-pokemon-type-card',
  templateUrl: './pokemon-type-card.component.html',
  styleUrls: ['./pokemon-type-card.component.scss']
})
export class PokemonTypeCardComponent {
  @Input() pokemonType!: PokemonType;
  @Input() height = 35;
  @Input() width = 120;

  get typeColor(): string {
    return typeColors[this.pokemonType];
  }
}

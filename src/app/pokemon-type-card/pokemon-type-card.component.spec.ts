import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeCardComponent } from './pokemon-type-card.component';

describe('PokemonTypeCardComponent', () => {
  let component: PokemonTypeCardComponent;
  let fixture: ComponentFixture<PokemonTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonTypeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

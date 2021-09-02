import { Component } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  pokemons: any = [];
  limit = '9';
  limits = ['9', '20', '50', '100'];
  pokemonLimit;
  isLoading: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  onChangeLimit() {
    // Zmena limitu, koľko pokémonov chceme zobraziť a zavolanie služby na fetchnutie dát s týmto počtom
    this.limit = this.pokemonLimit;
    this.getPokemonList();
  }

  private getPokemonList() {
    //Fetchnutie prvotného listu s objektami pokémonov
    this.pokemonService.getListOfPokemon(this.limit).subscribe(
      (response) => {
        this.getPokemonDetails(response.map((response: any) => response.url));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private getPokemonDetails(urlList: Array<string>) {
    //Mapovanie zoznamu url linkov ktoré sa nachádzajú v liste z prvého volania a naplnenie týchto dát s detailamy pokémonov do poľa 'pokemons'
    this.isLoading = true;
    this.pokemonService.getPokemonDetails(urlList).subscribe(
      (response) => {
        console.log(response);
        this.pokemons = response;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

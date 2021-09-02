import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getListOfPokemon(limit: string, offset?: string) {
    const params = new HttpParams()
      .set('offset', offset ? offset : '0')
      .set('limit', limit);
    return this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon`, {
        observe: 'response',
        params: params,
      })
      .pipe(
        map((res) => res.body.results),
        catchError((error) => of(error.url))
      );
  }

  getPokemonDetails(urlList: Array<any>) {
    urlList = urlList.map((url) => this.http.get<any>(url));
    return forkJoin(urlList);
  }
}

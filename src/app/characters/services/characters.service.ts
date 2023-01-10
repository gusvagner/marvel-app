import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../services/base/base.service';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService extends BaseService {
  private url = 'characters';
  public favoriteCharacters: Character[] = [];

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getCharacters(): Observable<any> {
    return this.get<any>(`${this.url}?`);
  }

  getCharacterById(id: number): Observable<any> {
    return this.get<any>(`${this.url}/${id}?`);
  }

  getOrderedCharacters(name: string, orderBy: string): Observable<any> {
    let nameStartsWith = `&nameStartsWith=${name}`;
    if (name === '') nameStartsWith = '';
    let order = `orderBy=${orderBy}`;
    return this.get<any>(`${this.url}?${order}${nameStartsWith}&`);
  }

  searchCharacters(name: string, orderBy: string, offset: number = 0): Observable<any> {
    let nameStartsWith = `&nameStartsWith=${name}`;
    if (name === '') nameStartsWith = '';
    let order = `orderBy=${orderBy}`;
    let offsetValue = `&offset=${offset}`;
    return this.get<any>(`${this.url}?${order}${nameStartsWith}${offsetValue}&`);
  }

}

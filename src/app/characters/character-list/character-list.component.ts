import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { CharactersService } from '../services/characters.service';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  public characters: Character[];
  public formGroup: FormGroup;
  public currentPage = 1;
  public totalItems = 0;
  public limit = 0;
  public offset = 0;

  constructor(
    private charactersService: CharactersService,
    private FormBuilder: FormBuilder,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getCharacters();
    this.configureForm();
    this.clearAllFavorites();
  }

  configureForm(): void {
    this.formGroup = this.FormBuilder.group({
      name: [''],
      orderBy: ['name']
    });
  }

  getCharacters() {
    this.charactersService.getCharacters().subscribe(result => {
      console.log(result);
      this.getResults(result);
    });
  }

  searchCharacters() {
    if (this.formGroup.value['orderBy'] === 'favorites') {
      this.orderByFavorites();
      return;
    }
    this.charactersService.searchCharacters(this.formGroup.value['name'], this.formGroup.value['orderBy']).subscribe(result => {
      this.getResults(result);
    });
  }

  clearAllFavorites(): void {
    this.localStorageService.clear();
  }

  getPaginatedCharacters(currentPage: number) {
    let characterName = this.formGroup.value['name'];
    let orderBy = this.formGroup.value['orderBy'];
    this.currentPage = currentPage;
    this.offset = this.currentPage * this.limit;
    this.charactersService.searchCharacters(characterName, orderBy, this.offset).subscribe(result => {
      this.characters = result.data.results;
    });
  }

  getResults(result: any) {
    this.totalItems = result.data.total;
    this.limit = result.data.limit;
    this.characters = result.data.results;
  }

  orderByFavorites() {
    if (this.localStorageService.getTotal() === 0) return;
    const favoritesFirst = this.characters.sort((a, b) => Number(!a.favorite) - Number(!b.favorite));
    this.characters = favoritesFirst;
  }

}

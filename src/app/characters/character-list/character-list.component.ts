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

  onSubmit(): void {
    this.getOrderedCharactersByName(this.formGroup.value['name'], this.formGroup.value['orderBy']);
  }

  getCharacters() {
    this.charactersService.getCharacters().subscribe(result => {
      this.characters = result.data.results;
    });
  }

  getOrderedCharactersByName(name: string, orderBy: string) {
    this.charactersService.getOrderedCharactersByName(name, orderBy).subscribe(result => {
      this.characters = result.data.results;
    });
  }

  searchCharacters(event: any) {
    let characterName = event.target.value;
    this.charactersService.getOrderedCharactersByName(characterName, this.formGroup.value['orderBy']).subscribe(result => {
      this.characters = result.data.results;
    });
  }

  clearAllFavorites(): void {
    this.localStorageService.clear();
  }

}

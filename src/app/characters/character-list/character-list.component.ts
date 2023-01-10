import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharactersService } from '../services/characters.service';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Source } from '../models/source.model';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  public source = new Source();
  public formGroup: FormGroup;
  public currentPage = 1;

  @ViewChild('characterDetail', { read: ViewContainerRef, static: true })
  public characterDetail: ViewContainerRef;
  public characterDetailRef: ComponentRef<CharacterDetailComponent>;

  constructor(
    private charactersService: CharactersService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.getCharacters();
    this.configureForm();
    this.clearAllFavorites();
  }

  private configureForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [''],
      orderBy: ['name']
    });
  }

  private getCharacters(): void {
    this.charactersService.getCharacters().subscribe(result => {
      this.source = result.data;
    });
  }

  public searchCharacters(): void {
    if (this.getFormValue('orderBy') === 'favorites') {
      this.orderByFavorites();
      return;
    }
    this.charactersService.searchCharacters(this.getFormValue('name'), this.getFormValue('orderBy')).subscribe(result => {
      this.source = result.data;
      this.setSelectedFavorites();
    });
  }

  private clearAllFavorites(): void {
    this.localStorageService.clear();
  }

  public getPaginatedCharacters(currentPage: number): void {
    let characterName = this.getFormValue('name');
    let orderBy = this.getFormValue('orderBy');
    this.currentPage = currentPage;
    this.source.offset = this.currentPage * this.source.limit;
    this.charactersService.searchCharacters(characterName, orderBy, this.source.offset).subscribe(result => {
      this.source = result.data;
    });
  }

  private orderByFavorites() {
    if (this.localStorageService.getTotal() === 0) return;
    const favoritesFirst = this.source.results.sort((a, b) => Number(!a.favorite) - Number(!b.favorite));
    this.source.results = favoritesFirst;
  }

  private getFormValue(fieldName: string): any {
    return this.formGroup.value[fieldName];
  }

  public showDetails(id: number) {
    let character = new Character();
    this.charactersService.getCharacterById(id).subscribe(result => {
      this.localStorageService.get(String(character.id));
      character = result.data.results[0];
      character.favorite = this.checkFavorite(id);
      this.createCharacterDetailComponent();
      this.characterDetailRef.instance.character = character;
      this.characterDetailRef.instance.openModal();
    });
  }

  private createCharacterDetailComponent() {
    const factory: ComponentFactory<CharacterDetailComponent> = this.componentFactoryResolver.resolveComponentFactory(CharacterDetailComponent);
    this.characterDetailRef = this.characterDetail.createComponent(factory);
  }

  private setSelectedFavorites() {
    let favorites = this.localStorageService.getList();
    if (favorites.length === 0) return;
    for (const favoriteId in favorites) {
      for (let i = 0; i < this.source.results.length; i++) {
        const element = this.source.results[i];
        if (favoriteId === String(element.id))
          this.source.results[i].favorite = true;
      }
    }
  }

  private checkFavorite(characterId: number): boolean {
    let favorite = this.localStorageService.get(String(characterId));
    return favorite ? true : false;
  }

}

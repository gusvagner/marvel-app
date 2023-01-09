import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {
  public maxNumberOfFavorites: number = 5;
  public disabledCheckbox: boolean = false;

  @Input() public character: Character;
  @ViewChild('star', { static: true }) star: ElementRef;

  @HostListener("click", ["$event"])
  onClick() {
    if (this.disabledCheckbox && !this.character.favorite)
      this.star.nativeElement.checked = false;
  }

  constructor(private localStorageService: LocalStorageService) { }

  setFavorite(character: Character) {
    if (this.character.favorite) {
      this.unsetFavorite(character);
      return;
    }
    if (this.maxNumberOfFavoritesAchieved()) {
      this.disableCheckbox(this.character.favorite);
      console.log("Max number of favorites selected");
      return;
    }
    character.favorite = true;
    this.localStorageService.set(String(character.id), character.favorite);
  }

  unsetFavorite(character: Character) {
    character.favorite = false;
    this.localStorageService.remove(String(character.id));
  }

  maxNumberOfFavoritesAchieved(): boolean {
    if (this.maxNumberOfFavorites === this.localStorageService.getTotal()) return true;
    return false;
  }

  disableCheckbox(value: any): void {
    if (!value)
      this.disabledCheckbox = true;
  }

}

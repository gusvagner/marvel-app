import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ModalMessageComponent } from 'src/app/common/modal-message/modal-message.component';
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
  @Output() public panelClick = new EventEmitter<any>();
  @ViewChild('star', { static: true }) star: ElementRef;
  @ViewChild('modalMessage', { static: true }) modalMessage: ModalMessageComponent;

  @HostListener("click", ["$event"])
  public onClick() {
    if (this.disabledCheckbox && !this.character.favorite)
      this.star.nativeElement.checked = false;
  }

  constructor(private localStorageService: LocalStorageService) { }

  public setFavorite(character: Character): void {
    if (this.character.favorite) {
      this.unsetFavorite(character);
      return;
    }
    if (this.maxNumberOfFavoritesAchieved()) {
      this.disableCheckbox(this.character.favorite);
      this.modalMessage.openModal();
      return;
    }
    character.favorite = true;
    this.localStorageService.set(String(character.id), character.favorite);
  }

  private unsetFavorite(character: Character) {
    character.favorite = false;
    this.localStorageService.remove(String(character.id));
  }

  private maxNumberOfFavoritesAchieved(): boolean {
    if (this.maxNumberOfFavorites === this.localStorageService.getTotal()) return true;
    return false;
  }

  private disableCheckbox(value: any): void {
    if (!value)
      this.disabledCheckbox = true;
  }

  public click(): void {
    this.panelClick.emit();
  }

}

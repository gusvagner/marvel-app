import { Component } from '@angular/core';
import { ModalComponent } from 'src/app/common/modal/modal.component';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent extends ModalComponent {
  public character = new Character();
}

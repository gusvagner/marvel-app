import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent extends ModalComponent {
  @Input() message: string;
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    ModalMessageComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    ModalMessageComponent
  ]
})
export class MyCommonModule { }

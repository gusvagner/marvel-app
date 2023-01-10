import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  private openedModal: boolean = false;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

  modalStyle() {
    return { 'display': this.openedModal ? 'block' : 'none' }
  }

  openModal() {
    this.openedModal = true;
  }

  closeModal() {
    this.openedModal = false;
  }

}

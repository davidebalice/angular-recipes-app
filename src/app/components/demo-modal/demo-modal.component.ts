import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrl: './demo-modal.component.css',
})
export class DemoModalComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  open() {
    const modalElement = document.getElementById(
      'demoModal'
    ) as HTMLElement;
    const modal = new Modal(modalElement);
    modal.show();
  }


}

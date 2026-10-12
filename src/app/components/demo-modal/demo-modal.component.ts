import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  standalone: false,
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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

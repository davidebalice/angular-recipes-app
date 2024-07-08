import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css'],
})
export class DeleteConfirmationModalComponent {
  @Input() recipeId: number;
  @Output() deleteConfirmed = new EventEmitter<number>();

  confirmDeletion() {
    this.deleteConfirmed.emit(this.recipeId);
    const modalElement = document.getElementById(
      'deleteConfirmationModal'
    ) as HTMLElement;
    const modalInstance = Modal.getInstance(modalElement);
    modalInstance?.hide();
  }

  open() {
    const modalElement = document.getElementById(
      'deleteConfirmationModal'
    ) as HTMLElement;
    const modal = new Modal(modalElement);
    modal.show();
  }
}

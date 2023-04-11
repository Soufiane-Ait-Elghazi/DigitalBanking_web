import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() title: string | undefined;
  @Input()
  @Input() message: string | undefined;
  @Output() confirm = new EventEmitter<boolean>();

  onCancel() {
    this.confirm.emit(false);
  }

  onConfirm() {
    this.confirm.emit(true);
  }
}

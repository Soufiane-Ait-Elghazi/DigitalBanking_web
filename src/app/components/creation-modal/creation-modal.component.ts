import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './creation-modal.component.html',
  styleUrls: ['./creation-modal.component.css']
})
export class CreationModalComponent {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Output() confirm = new EventEmitter<boolean>();


  onConfirm() {
    this.confirm.emit(true);
  }
}

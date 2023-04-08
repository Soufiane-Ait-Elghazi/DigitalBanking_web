import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-autorized-modal',
  templateUrl: './not-autorized-modal.component.html',
  styleUrls: ['./not-autorized-modal.component.css']
})
export class NotAutorizedModalComponent {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Output() confirm = new EventEmitter<boolean>();
  constructor(private router :Router) {
  }

  onConfirm() {
    this.router.navigateByUrl("/login");
  }
}

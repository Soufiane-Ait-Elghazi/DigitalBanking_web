import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAutorizedModalComponent } from './not-autorized-modal.component';

describe('NotAutorizedModalComponent', () => {
  let component: NotAutorizedModalComponent;
  let fixture: ComponentFixture<NotAutorizedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAutorizedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAutorizedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

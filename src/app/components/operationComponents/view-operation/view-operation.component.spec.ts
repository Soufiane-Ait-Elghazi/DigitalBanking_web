import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOperationComponent } from './view-operation.component';

describe('ViewOperationComponent', () => {
  let component: ViewOperationComponent;
  let fixture: ComponentFixture<ViewOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

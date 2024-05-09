import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTableViewControllerComponent } from './card-table-view-controller.component';

describe('CardTableViewControllerComponent', () => {
  let component: CardTableViewControllerComponent;
  let fixture: ComponentFixture<CardTableViewControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTableViewControllerComponent]
    });
    fixture = TestBed.createComponent(CardTableViewControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

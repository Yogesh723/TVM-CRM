import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterstoreComponent } from './interstore.component';

describe('InterstoreComponent', () => {
  let component: InterstoreComponent;
  let fixture: ComponentFixture<InterstoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterstoreComponent]
    });
    fixture = TestBed.createComponent(InterstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

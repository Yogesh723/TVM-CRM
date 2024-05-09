import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterMarkPageComponent } from './water-mark-page.component';

describe('WaterMarkPageComponent', () => {
  let component: WaterMarkPageComponent;
  let fixture: ComponentFixture<WaterMarkPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterMarkPageComponent]
    });
    fixture = TestBed.createComponent(WaterMarkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

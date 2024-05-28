import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailsMaintenanceComponent } from './team-details-maintenance.component';

describe('TeamDetailsMaintenanceComponent', () => {
  let component: TeamDetailsMaintenanceComponent;
  let fixture: ComponentFixture<TeamDetailsMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailsMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamDetailsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

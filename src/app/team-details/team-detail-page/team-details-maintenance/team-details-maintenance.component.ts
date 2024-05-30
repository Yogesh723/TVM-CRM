import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/common/communication.service';

@Component({
  selector: 'app-team-details-maintenance',
  templateUrl: './team-details-maintenance.component.html',
  styleUrl: './team-details-maintenance.component.scss'
})
export class TeamDetailsMaintenanceComponent {
  subSideNav: any = [
    {
      section: 'Asset',
      name: 'asset',
      label: 'Assets',
      iconClass: 'fas fa-info-circle details',
      tooltip: 'Assets'
    },
    {
      section: 'Projects',
      name: 'projects',
      label: 'Projects',
      iconClass: 'fas fa-briefcase projectiocn',
      tooltip: 'Projects'
    },
    {
      section: 'Employees',
      name: 'employee',
      label: 'Employees',
      iconClass: 'fas fa-user employeedetails',
      tooltip: 'Employees'
    },
    {
      section: 'time-sheet',
      name: 'timesheet',
      label: 'Attendance',
      iconClass: "fa-solid fa-clock",
      tooltip: 'Time Sheet'
    },
  ];
  selectedMenuItem: string = '';
  sideNavStatus: boolean = true;
  activeId = '';

  constructor (
    private communicationService: CommunicationService,
    private route: Router
  ) {
    communicationService.activeId$.subscribe((id: any) => {
      this.activeId = id;
    });
  }

  sideNavToggleStatus(event: any) {
    this.sideNavStatus = event;
  }

  sideNavClick(event: any) {
    this.selectedMenuItem = event.section;
    this.route.navigateByUrl('tvm/team/teamdetail/' + this.selectedMenuItem + '/' + this.activeId);
  }
}

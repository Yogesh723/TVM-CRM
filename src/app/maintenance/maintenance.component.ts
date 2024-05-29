import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/common/communication.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {
  selectedMenuItem: string = 'Teams';
  subSideNav = [
    {
      section: 'Teams',
      name: 'teams',
      label: 'Team Details',
      iconClass: "fa-solid fa-users",
      tooltip: 'Team Details',
      route: 'teamlist'
    },
    {
      section: 'Jira',
      name: 'jira',
      label: 'Jira',
      iconClass: "fa-brands fa-jira",
      tooltip: 'Jira',
      route: 'jira-page'
    },
  ];
  sideNavStatus: boolean = true;
  constructor(
    private communicationService: CommunicationService,
    private route: Router
  ) {}

  sideNavClick(event: any) {
    this.selectedMenuItem = event.section;
    this.route.navigateByUrl('tvm/team/'+event.route);
  }
  sideNavToggleStatus(event: any) {
    this.sideNavStatus = event;
  }
}

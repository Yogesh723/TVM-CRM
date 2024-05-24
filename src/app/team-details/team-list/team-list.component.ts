import { Component, OnInit } from '@angular/core';
import { TeamDetailServiceService } from '../team-detail-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommunicationService } from 'src/app/common/communication.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  listColumns: any = []
  listInfo: any = [];
  listObservable: any;
  selectedMenuItem: string = 'Teams';
  subSideNav: any = [];

  constructor(
    private communicationService: CommunicationService,
    private detailService: TeamDetailServiceService,
    private route: Router
  ) {}

  ngOnInit() {
    this.getTeamdetails();
    this.subSideNav = [
      {
        section: 'Teams',
        name: 'teams',
        label: 'Team Details'
      }
    ];
    this.listColumns = [
      {
        "name": "TeamName",
        "label": "Team Name",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "LeadName",
        "label": "Lead Name",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "TeamSize",
        "label": "Team Size",
        "widthPct": 10,
        "hidden": false
      }
    ];
  }

  getTeamdetails() {
    this.detailService.getTeamDetails().subscribe((result: any) => {
      this.listInfo = result;
      this.listObservable = new BehaviorSubject(this.listInfo);
    });
  }

  add(id: any) {
    this.route.navigateByUrl('tvm/team/teamdetail/'+id);
    this.communicationService.goBackClick(false);
  }

  sideNavClick(event: any) {
    this.selectedMenuItem = event.section;
    this.route.navigateByUrl('');
  }

 delete(id: any) {
    this.detailService.deleteTeamList(id).subscribe((res: any) => {
      this.getTeamdetails();
    })
  }
}

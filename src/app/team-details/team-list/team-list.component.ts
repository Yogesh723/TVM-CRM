import { Component, OnInit } from '@angular/core';
import { TeamDetailServiceService } from '../team-detail-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommunicationService } from 'src/app/common/communication.service';
import { BreadcrumbService } from 'src/app/bread-crumb/bread-crumb.service';

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
  acceptRole: any = [];
  subSideNav: any = [];

  constructor(
    private communicationService: CommunicationService,
    private detailService: TeamDetailServiceService,
    private route: Router,
    private breadcrumbService: BreadcrumbService

  ) {}

  ngOnInit() {    
    this.getTeamdetails();
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
    this.breadcrumbService.setBreadcrumbs([
      { active: 'Team Details'},
      { label: 'Home', url: '/' },
      { label: 'Team Details', url: this.route.url },
    ]);
    let data  : any= localStorage.getItem('credentials')
    const userData = JSON.parse(data);
      if(userData.Role == "A"){
        this.acceptRole.push("A");
      } else  if(userData.Role == "L"){
        this.acceptRole.push("");
      } else  if(userData.Role == "E"){
        this.acceptRole.push("");
      }
  }

  getTeamdetails() {
    this.detailService.getTeamDetails().subscribe((result: any) => {
      this.listInfo = result;
      this.listObservable = new BehaviorSubject(this.listInfo);
    });
  }

  add(id: any) {
    let path;
    if (id == 0) {
      path = 'tvm/team/teamlist/' + id;
    } else {
      path = 'tvm/team/teamdetail/' + 'Asset/' + id;
    }
    this.route.navigateByUrl(path);
    this.communicationService.goBackClick(false);
  }

 delete(id: any) {
    this.detailService.deleteTeamList(id).subscribe((res: any) => {
      this.detailService.deleteAssets(id).subscribe((assetres: any) => {
        this.detailService.deleteProjects(id).subscribe((prjctres: any) => {
          this.detailService.deleteemployee(id).subscribe((empres: any) => {
            this.getTeamdetails();
          });
        });
      });
    });
  }
}

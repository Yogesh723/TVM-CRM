import { Component } from '@angular/core';
import { TeamDetailServiceService } from '../../team-detail-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss']
})
export class ProjectsDetailsComponent {
  projectColumns: any = []
  projectListInfo: any = [];
  listObservable: any;

  constructor(
    private teamService: TeamDetailServiceService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.getAssets();
    this.projectColumns = [
      {
        "name": "profile",
        "label": "Profile",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "voice",
        "label": "Voice",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "developer",
        "label": "Developer",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "state",
        "label": "Active/Inactive",
        "widthPct": 10,
        "hidden": false
      }
    ];
  }
  getAssets() {
    this.teamService.getProjectDetails().subscribe((result: any) => {
      this.projectListInfo = result;
      this.listObservable = new BehaviorSubject(this.projectListInfo);
    });
  }

  addNew(id: any) {
    let path = this.route.routerState.snapshot.url;
    this.route.navigateByUrl(path+'/'+id);
  }

  rowClicked(id: any) {
    this.addNew(id);
  }

  delete(id: any) {
    this.teamService.deleteProjects(id).subscribe((res: any) => {
      this.getAssets();
    })
  }
}

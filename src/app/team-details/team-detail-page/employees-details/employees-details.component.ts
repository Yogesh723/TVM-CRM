import { Component } from '@angular/core';
import { TeamDetailServiceService } from '../../team-detail-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent {
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
        "name": "Employee",
        "label": "Employee Name",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "JoiningDate",
        "label": "Date of Joining",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "Experienceyear",
        "label": "Year of Experience",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "Specifications",
        "label": "Specifications",
        "widthPct": 10,
        "hidden": false
      }
    ];
  }
  getAssets() {
    this.teamService.getEmployeeDetails().subscribe((result: any) => {
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
    this.teamService.deleteemployee(id).subscribe((res: any) => {
      this.getAssets();
    })
  }
}

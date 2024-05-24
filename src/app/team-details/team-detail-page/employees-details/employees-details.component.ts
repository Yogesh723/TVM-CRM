import { Component } from '@angular/core';
import { TeamDetailServiceService } from '../../team-detail-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommunicationService } from 'src/app/common/communication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent {
  employeeColumns: any = []
  employeeListInfo: any = [];
  listObservable: any;

  constructor(
    private communicationService: CommunicationService,
    private teamService: TeamDetailServiceService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.getAssets();
    this.employeeColumns = [
      {
        "name": "Employee",
        "label": "Employee Name",
        "widthPct": 10,
        "hidden": false
      },
      {
        "name": "joining",
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
      this.employeeListInfo = result;
      this.employeeListInfo.forEach((element: any) => {
        element.state = element.state == true ? 'Yes' : 'No';
        element.joining = new DatePipe('en-US').transform(element.joining, 'MM/dd/yyyy');
      });
      this.listObservable = new BehaviorSubject(this.employeeListInfo);    });
  }

  addNew(id: any) {
    let path = this.route.routerState.snapshot.url;
    this.route.navigateByUrl(path+'/'+id);
    this.communicationService.goBackClick(false);
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

import { Component } from '@angular/core';
import { TeamDetailServiceService } from '../../team-detail-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommunicationService } from 'src/app/common/communication.service';
import { DatePipe } from '@angular/common';
import { BreadcrumbService } from 'src/app/bread-crumb/bread-crumb.service';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent {
  employeeColumns: any = []
  employeeListInfo: any = [];
  listObservable: any;
  activeId: any = '';
  listInfo: any = [];


  constructor(
    private communicationService: CommunicationService,
    private teamService: TeamDetailServiceService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private breadcrumbService: BreadcrumbService,
    private detailService: TeamDetailServiceService,
  ) {

  }

  ngOnInit(): void {
    this.activeId = this.activeRoute.snapshot.paramMap.get('teamId');
    this.communicationService.confirmActiveId(this.activeId);
    this.communicationService.confirmActiveSection('Employees');
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
    this.breadcrumbService.setBreadcrumbs([
      { active: 'Employee Details'},
      { label: 'Home', url: '/' },
      { label: 'Team Details', url: '/tvm/team/teamlist' },
      { label: 'Employee Details', url: this.route.url }
    ]);
  }
  getEmployeeDetails() {
    this.detailService.getTeamDetails().subscribe((result: any) => {
      this.listInfo = result;
      this.listObservable = new BehaviorSubject(this.listInfo);
    });
  }
  getAssets() {
    this.teamService.getEmployeeDetailById(this.activeId).subscribe((result: any) => {
      this.employeeListInfo = result.employees;
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

  saveImorteddetails(event: any) {
    this.teamService.addEmployee(this.activeId, event, 'importSave').subscribe((result: any) => {
      // this.route.navigateByUrl('/tvm/team/teamdetail/Employees/' + this.activeId);
    });
  }

  delete(id: any) {
    this.teamService.deleteEmployee(this.activeId, id).subscribe((res: any) => {
      this.getAssets();
    });
  }
}

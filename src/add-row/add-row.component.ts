import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JiraDataService } from 'src/assets/jira-data.service';
import { Row } from '../../src/app/jira-page/jira-interface';
import { TeamDetailServiceService } from 'src/app/team-details/team-detail-service.service';


@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss']
})
export class AddRowComponent implements OnInit {
  newRow: Row;
  currentDate = new Date();
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  Pageheader = 'Fill Status Update';
  formObject = {
    General: [
      {
        name: "date",
        label: "Date",
        value: this.currentDate.getDate(),
        type: "textArea",
        require: true
      },
      {
        name: "month",
        label: "Month",
        value: this.months[this.currentDate.getMonth()],
        type: "textArea",
        require: true
      },
      {
        name: "year",
        label: "Year",
        value: this.currentDate.getFullYear(),
        type: "textArea",
        require: true
      },
      {
        name: "team",
        label: "Team",
        type: "singleSelect",
        require: true,
        pickList: []  
      },
      {
        name: "employeeName",
        label: "Employee Name",
        type: "singleSelect",
        require: true
      },
      {
        name: "taskDetails",
        label: "Task Details"
      },
      {
        name: "status",
        label: "Status",
        type: "textArea",
        require: true
      },
      {
        name: "scrumTiming",
        label: "Scrum Timing",
        type: "textArea",
        require: true
      },
      {
        name: "morningSession",
        label: "9.30-11.30 AM"
      },
      {
        name: "middaySession",
        label: "11.30-1.00 AM"
      },
      {
        name: "afternoonSession",
        label: "2.00-4.00 PM"
      },
      {
        name: "eveningSession",
        label: "4.00-6.30 PM"
      },
      {
        name: "nonBillableHrs",
        label: "NonBillable Hrs",
        type: "textArea",
        require: true
      },
      {
        name: "nonBillableStatus",
        label: "NonBillable Status"
      },
      {
        name: "dailyScore",
        label: "Daily Score",
        type: "rating",
        value: 3,
        max: 5,
        readOnly: false,
        required: true
      },
      {
        name: "comments",
        label: "Comments",
        type: "textArea",
        require: true
      }
    ]
  };

  constructor(
    private router: Router,
    private jiradataservice: JiraDataService,
    private teamdetailService: TeamDetailServiceService,
  ) {
    this.newRow = {
      date: '',
      team: '',
      employeeName: '',
      taskDetails: '',
      status: '',
      scrumTiming: '',
      morningSession: '',
      middaySession: '',
      afternoonSession: '',
      eveningSession: '',
      nonBillableHrs: '',
      nonBillableStatus: '',
      dailyScore: '',
      comments: '',
      year: '',
      month: ''
    };
  }

  ngOnInit() {
    this.teamdetailService.getTeamDetails().subscribe((teams: any) => {

      const teamField = this.formObject.General.find(field => field.name === 'team');
      if (teamField) {
        teamField.pickList = teams.map((team: any) => { return {"label": team.TeamName, "value": team.id} });
      }
    });
  }

  saveRow(formValue: any) {
    this.jiradataservice.saveJira(formValue).subscribe((res: any) => {
      console.log(res);
    });
    this.router.navigate(['tvm/team/jira-page']);
  }

  save(event: any) { }

  cancel(): void {
    this.router.navigate(['tvm/team/jira-page']);
  }

  filterEmployeesByTeam(teamId: any) {
  this.teamdetailService.getEmployeeDetailById(teamId.value).subscribe((employees: any) => {
    const employeeField = this.formObject.General.find(field => field.name === 'employeeName');
    if (employeeField) {
      employeeField.pickList = employees.employees.map((employee: any) => { return { "label": employee.Employee, "value": employee.id } });
    }
  });
}

}

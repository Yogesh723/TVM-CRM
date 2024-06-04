import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JiraDataService } from 'src/assets/jira-data.service';
import { Row } from '../../src/app/jira-page/jira-interface'
import { TeamDetailServiceService } from 'src/app/team-details/team-detail-service.service';

@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss']
})
export class AddRowComponent {
  newRow: Row;
  currentDate = new Date();
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  Pageheader = 'Fill Status Update';
  formObject = {
    General: [
      {
        name: "date",
        label: "Date",
        value: this.currentDate.getDate()
      },
      {
        name: "month",
        label: "Month",
        value: this.months[this.currentDate.getMonth()]
      },
      {
        name: "year",
        label: "Year",
        value: this.currentDate.getFullYear()
      },

      {
        name: "team",
        label: "Team"
      },
      {
        name: "employeeName",
        label: "Employee Name"
      },
      {
        name: "taskDetails",
        label: "Task Details"
      },
      {
        name: "status",
        label: "Status"
      },
      {
        name: "scrumTiming",
        label: "Scrum Timing"
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
        label: "NonBillable Hrs"
      },
      {
        name: "nonBillableStatus",
        label: "NonBillable Status"
      },
      {
        name: "dailyScore",
        label: "Daily Score",
        value:"*"
      },
      {
        name: "comments",
        label: "Comments"
      },
      

      
    ]
  };

  constructor(private router: Router,private jiradataservice:JiraDataService, 
    private teamdetailService: TeamDetailServiceService
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

  saveRow(formValue: any) { debugger
    this.teamdetailService.saveJira(formValue).subscribe((res: any) => {
      console.log(res);
    });
    this.router.navigate(['tvm/team//jira-page']);
  }
  save(event: any) {

  }
  cancel(): void {
    this.router.navigate(['tvm/team//jira-page']);
  }
}

import { Component, OnInit } from '@angular/core';
import { TeamDetailServiceService } from '../team-detail-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-detail-page',
  templateUrl: './team-detail-page.component.html',
  styleUrls: ['./team-detail-page.component.scss']
})
export class TeamDetailPageComponent implements OnInit {

  formObject: any = {};
  activeId: any = 0;
  sideNav: any = [

  ];
  teamName: string = '';
  appForm!: FormGroup;
  selectedMenuItem: string = '';
  subSideNav: any = [];

  constructor(
    private detailService: TeamDetailServiceService,
    private activeRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    this.activeId = this.activeRoute.snapshot.paramMap.get('id');

    this.subSideNav = [
      {
        section: 'Asset',
        name: 'asset',
        label: 'Asset Details',
        iconClass: 'fas fa-info-circle details',
      },
      {
        section: 'Projects',
        name: 'projects',
        label: 'Projects',
        iconClass: 'fas fa-briefcase projectiocn',

      },
      {
        section: 'Employees',
        name: 'employee',
        label: 'Employees',
        iconClass: 'fas fa-user employeedetails',
      }
    ];

    this.getTeamDetail();
  }

  getTeamDetail() {
    this.detailService.edit(this.activeId).subscribe((result: any) => {
      let res = result.filter((item: any) => item.id == this.activeId)[0];
      this.formObject = res.formFields;
    });
  }

  saveForm(formValue: any) {
    this.detailService.save(formValue).subscribe((result: any) => {
      let saveForDetailPage = {
        "id": result.id,
        "formFields": {
          "General": [
            {
              "label": "Team Name",
              "name": "TeamName",
              "value": formValue.TeamName,
              "type": "String"
            },
            {
              "label": "Lead Name",
              "name": "LeadName",
              "value": formValue.LeadName,
              "type": "String"
            },
            {
              "label": "Team Size",
              "name": "TeamSize",
              "value": formValue.TeamSize,
              "type": "Numeric"
            }
          ]
        }
      };
      this.detailService.saveForDetail(saveForDetailPage).subscribe((result) => {
        this.route.navigateByUrl('tvm/team');
      });
    });
  }

  clear() {
    this.appForm.reset();
  }

  sideNavClick(event: any) {
    this.selectedMenuItem = event.section;
    this.route.navigateByUrl('tvm/team/teamdetail/'+this.activeId+'/'+this.selectedMenuItem);
  }
}

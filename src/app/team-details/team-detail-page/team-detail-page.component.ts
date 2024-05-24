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
  sideNavStatus: boolean = true;

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
        label: 'Assets',
        iconClass: 'fas fa-info-circle details',
        tooltip: 'Assets'
      },
      {
        section: 'Projects',
        name: 'projects',
        label: 'Projects',
        iconClass: 'fas fa-briefcase projectiocn',
        tooltip: 'Projects'
      },
      {
        section: 'Employees',
        name: 'employee',
        label: 'Employees',
        iconClass: 'fas fa-user employeedetails',
        tooltip: 'Employees'
      }
    ];
    this.formObject = {
      General: [
        {
          label: "Team Name",
          name: "TeamName",
          type: "String"
        },
        {
          label: "Lead Name",
          name: "LeadName",
          type: "String"
        },
        {
          label: "Team Size",
          name: "TeamSize",
          type: "Numeric"
        }
      ]
    };
  }

  saveForm(formValue: any) {
    this.detailService.save(formValue).subscribe((result: any) => {
      this.route.navigateByUrl('tvm/team');
    });
  }

  clear() {
    this.appForm.reset();
  }

  sideNavToggleStatus(event: any) {
    this.sideNavStatus = event;
  }

  sideNavClick(event: any) {
    this.selectedMenuItem = event.section;
    this.route.navigateByUrl('tvm/team/teamdetail/'+this.activeId+'/'+this.selectedMenuItem);
  }
}

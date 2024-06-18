import { Component, OnInit } from '@angular/core';
import { TeamDetailServiceService } from '../team-detail-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from 'src/app/common/communication.service';

@Component({
  selector: 'app-team-detail-page',
  templateUrl: './team-detail-page.component.html',
  styleUrls: ['./team-detail-page.component.scss']
})
export class TeamDetailPageComponent implements OnInit {

  formObject: any = {};
  activeId: any = 0;

  teamName: string = '';
  appForm!: FormGroup;

  constructor(
    private detailService: TeamDetailServiceService,
    private communicationService: CommunicationService,
    private activeRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    this.activeId = this.activeRoute.children.length > 0 ? this.activeRoute.children[0].snapshot.paramMap.get('teamId') : this.activeRoute.snapshot.paramMap.get('id');
    this.communicationService.confirmActiveId(this.activeId);
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
        },
        {
          label: "User Name",
          name: "UserName",
          type: "String"
        },
        {
          label: "Password",
          name: "Password",
          type: "String"
        }
      ]
    };
    
    this.appForm = this.formbuilder.group({
      TeamName: ['', Validators.required],
      LeadName: ['', Validators.required],
      TeamSize: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  saveForm(formValue: any) {
    const { UserName, Password, ...teamDetails } = formValue;
    
    this.detailService.save(teamDetails).subscribe((listResult: any) => {
      const credentialData = { id: listResult.id, UserName, Password };

      this.detailService.saveCredentials(credentialData).subscribe(() => {
        this.detailService.saveAssetDetails({ id: listResult.id, assets: [] }).subscribe(() => {
          this.detailService.saveProjectDetails({ id: listResult.id, projects: [] }).subscribe(() => {
            this.detailService.saveEmployeeDetails({ id: listResult.id, employees: [] }).subscribe(() => {
              this.route.navigateByUrl('tvm/team/teamlist');
            });
          });
        });
      });
    });
  }

  clear() {
    this.appForm.reset();
  }
}

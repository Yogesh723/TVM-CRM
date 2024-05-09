import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamDetailsRoutingModule } from './team-details-routing.module';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailPageComponent } from './team-detail-page/team-detail-page.component';
import { CommonTvmModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetDetailsComponent } from './team-detail-page/asset-details/asset-details.component';
import { ProjectsDetailsComponent } from './team-detail-page/projects-details/projects-details.component';
import { EmployeesDetailsComponent } from './team-detail-page/employees-details/employees-details.component';
import { EditAssetComponent } from './team-detail-page/asset-details/edit-asset/edit-asset.component';
import { EditProjectDetailsComponent } from './team-detail-page/projects-details/edit-project-details/edit-project-details.component';
import { EditEmployeeDetailsComponent } from './team-detail-page/employees-details/edit-employee-details/edit-employee-details.component';


@NgModule({
  declarations: [
    TeamListComponent,
    TeamDetailPageComponent,
    AssetDetailsComponent,
    ProjectsDetailsComponent,
    EmployeesDetailsComponent,
    EditAssetComponent,
    EditProjectDetailsComponent,
    EditEmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    TeamDetailsRoutingModule,
    CommonTvmModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class TeamDetailsModule { }

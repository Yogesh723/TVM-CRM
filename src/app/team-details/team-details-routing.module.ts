import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailPageComponent } from './team-detail-page/team-detail-page.component';
import { AssetDetailsComponent } from './team-detail-page/asset-details/asset-details.component';
import { ProjectsDetailsComponent } from './team-detail-page/projects-details/projects-details.component';
import { EmployeesDetailsComponent } from './team-detail-page/employees-details/employees-details.component';
import { EditAssetComponent } from './team-detail-page/asset-details/edit-asset/edit-asset.component';
import { EditProjectDetailsComponent } from './team-detail-page/projects-details/edit-project-details/edit-project-details.component';
import { EditEmployeeDetailsComponent } from './team-detail-page/employees-details/edit-employee-details/edit-employee-details.component';

const routes: Routes = [
  {
    path: '',
    component: TeamListComponent
  },
  {
    path: 'teamdetail/:id',
    component: TeamDetailPageComponent,
    children: [
      {
        path: 'Asset',
        component: AssetDetailsComponent
      },
      {
        path: 'Projects',
        component: ProjectsDetailsComponent
      },
      {
        path: 'Employees',
        component: EmployeesDetailsComponent
      },
      {
        path: 'Asset/:id',
        component: EditAssetComponent
      },
      {
        path: 'Projects/:id',
        component: EditProjectDetailsComponent
      },
      {
        path: 'Employees/:id',
        component: EditEmployeeDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamDetailsRoutingModule { }

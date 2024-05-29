import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterstoreComponent } from './interstore/interstore.component';
import { WaterMarkPageComponent } from './water-mark-page/water-mark-page.component';

const routes: Routes = [
    {
        path: '',
        component: InterstoreComponent,        
        children: [
            {
                path: 'team',
                loadChildren: () => import('../team-details/team-details.module').then(m => m.TeamDetailsModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonTvmRoutingModule { }

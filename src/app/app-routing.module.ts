import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaterMarkPageComponent } from './common/water-mark-page/water-mark-page.component';
import { InterstoreComponent } from './common/interstore/interstore.component';

const routes: Routes = [
   {
    path: '',
    component: WaterMarkPageComponent,
  },
  {
    path: 'tvm',
    loadChildren: () => import('./common/common.module').then(m => m.CommonTvmModule)
  //    path:'',
  //    component:InterstoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

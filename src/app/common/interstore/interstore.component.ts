import { Component } from '@angular/core';

@Component({
  selector: 'app-interstore',
  templateUrl: './interstore.component.html',
  styleUrls: ['./interstore.component.scss']
})
export class InterstoreComponent {
  public isLogin: boolean = false;
  topNavMenu = [
    {
      code: 1,
      name: 'TVM Infotech',
      routerLink: '/tvm/team/teamlist'
    }
  ];
}

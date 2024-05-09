import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit{
  @Input() subSideNav: any = [];
  @Input() selectedMenuItem = '';
  @Output() goToPath = new EventEmitter();

  constructor(
    public router: Router
  ) {}

  ngOnInit() { }

  setActiveTabAndGo(item: any) {
    // let route = item.name;
    // const label = item.label;
    // const section = item.section;
    // this.selectedMenuItem = label;
    // if (this.activatedRoute.snapshot.firstChild.url.length > 0) {
    //   const currentRoute = this.activatedRoute.snapshot.firstChild.url[0]
    //     .path;

    //   if (currentRoute === route) {
    //     // swap sections
    //     this.communicationService.confirmActiveSection(section);
    //   } else {
    //     this.goToPath.emit(route);
    //   }
    // } else {
    this.goToPath.emit(item);
    // }
  }
}

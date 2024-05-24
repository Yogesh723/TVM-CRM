import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit, OnDestroy{
  @Input() subSideNav: any[] = [];
  @Input() selectedMenuItem = '';
  @Output() goToPath = new EventEmitter();
  sideNavStatus: boolean = true;
  @Output() sideNavToggleStatus: EventEmitter<boolean> = new EventEmitter();
  subscriptions: Subscription[] = [];
  // subSideNavs = [
  //   // Example items, you should replace these with your actual data
  //   { section: 'section1', label: 'Section 1', mandatory: true, hasData: true },
  //   { section: 'section2', label: 'Section 2', mandatory: false, hasData: false },
  //   // Add more items as needed
  // ];
  constructor(
    private communicationService: CommunicationService,
    public router: Router
  ) {
    this.subscriptions.push(
      communicationService.activeSection$.subscribe((activesection: any)=> {
        this.selectedMenuItem = activesection;
      })
    )
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }

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
  
  toggleSideNav() {
    this.sideNavStatus = !this.sideNavStatus;
  }
}

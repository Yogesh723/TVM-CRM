import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './bread-crumb.service';
@Component({
  selector: 'app-bread-crumb',
  // standalone: true,
  // imports: [],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: any[] = [];
  activeCrum = 'Home';

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs.filter((element, index) => { return index !== 0 });
      this.activeCrum = breadcrumbs[0].active;
    });
  }

  nav(event: any) {
    this.activeCrum = event.label;
  }
}

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

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}

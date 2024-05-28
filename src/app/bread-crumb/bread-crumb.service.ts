import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbSubject = new BehaviorSubject<any[]>([]);
  breadcrumbs$ = this.breadcrumbSubject.asObservable();

  setBreadcrumbs(breadcrumbs: any[]) {
    this.breadcrumbSubject.next(breadcrumbs);
  }
}

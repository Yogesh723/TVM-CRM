import { TestBed } from '@angular/core/testing';

import { JiraDataService } from './jira-data.service';

describe('JiraDataService', () => {
  let service: JiraDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JiraDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

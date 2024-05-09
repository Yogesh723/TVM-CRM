import { TestBed } from '@angular/core/testing';

import { TeamDetailServiceService } from './team-detail-service.service';

describe('TeamDetailServiceService', () => {
  let service: TeamDetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

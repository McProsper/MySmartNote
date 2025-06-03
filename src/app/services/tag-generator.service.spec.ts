import { TestBed } from '@angular/core/testing';

import { TagGeneratorService } from './tag-generator.service';

describe('TagGeneratorService', () => {
  let service: TagGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

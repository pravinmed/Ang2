/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CouchServiceService } from './couch-service.service';

describe('CouchServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CouchServiceService]
    });
  });

  it('should ...', inject([CouchServiceService], (service: CouchServiceService) => {
    expect(service).toBeTruthy();
  }));
});

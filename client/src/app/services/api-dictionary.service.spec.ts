/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiDictionaryService } from './api-dictionary.service';

describe('ApiDictionaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDictionaryService]
    });
  });

  it('should ...', inject([ApiDictionaryService], (service: ApiDictionaryService) => {
    expect(service).toBeTruthy();
  }));
});

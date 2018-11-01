import { TestBed, inject } from '@angular/core/testing';

import { NgxTextHighlighterService } from './ngx-text-highlighter.service';

describe('NgxTextHighlighterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxTextHighlighterService]
    });
  });

  it('should be created', inject([NgxTextHighlighterService], (service: NgxTextHighlighterService) => {
    expect(service).toBeTruthy();
  }));
});

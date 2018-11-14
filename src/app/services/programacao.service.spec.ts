import { TestBed, inject } from '@angular/core/testing';

import { ProgramacaoService } from './programacao.service';

describe('CrawlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramacaoService]
    });
  });

  it('should be created', inject([ProgramacaoService], (service: ProgramacaoService) => {
    expect(service).toBeTruthy();
  }));
});

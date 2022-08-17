import { TestBed } from '@angular/core/testing';

import { ProductsParamsService } from './products-params.service';

describe('ProductsParamsService', () => {
  let service: ProductsParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

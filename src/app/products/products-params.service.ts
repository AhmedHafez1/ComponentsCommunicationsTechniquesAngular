import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsParamsService {
  filterBy: string;
  showImage: boolean;

  constructor() {}
}

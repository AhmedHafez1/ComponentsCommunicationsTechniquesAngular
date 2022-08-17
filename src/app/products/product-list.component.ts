import { Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductsParamsService } from './products-params.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(CriteriaComponent) criteriaComponent: CriteriaComponent;
  pageTitle = 'Product List';

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = '';

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  includeDetails = true;

  constructor(
    private productService: ProductService,
    private productParamsService: ProductsParamsService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        setTimeout(() => {
          this.criteriaComponent.listFilter =
            this.productParamsService.filterBy;
        }, 200);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  public get showImage(): boolean {
    return this.productParamsService.showImage;
  }

  public set showImage(v: boolean) {
    this.productParamsService.showImage = v;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onFilterChange(text: string) {
    this.performFilter(text);
    this.productParamsService.filterBy = text;
  }

  private performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}

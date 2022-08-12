import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild(CriteriaComponent) criteriaComponent: CriteriaComponent;

  pageTitle = 'Product List';
  parentListFilter!: string;

  showImage = false;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = '';

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  includeDetails = true;

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    this.parentListFilter = this.criteriaComponent.listFilter;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.performFilter(this.parentListFilter);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
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

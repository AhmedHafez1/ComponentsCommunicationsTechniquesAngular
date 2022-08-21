import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html',
})
export class ProductShellListComponent implements OnInit {
  pageTitle = 'Products';
  products: IProduct[] = [];
  errorMessage = '';
  selectedProductId$: Observable<number>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });

    this.selectedProductId$ = this.productService.selectedProductChange$.pipe(
      filter(Boolean),
      map((product) => product.id)
    );
  }

  onSelect(product: IProduct) {
    this.productService.changeSelectedProduct(product);
  }
}

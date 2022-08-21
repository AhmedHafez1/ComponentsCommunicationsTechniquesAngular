import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  pageTitle = 'Products';
  monthCount$: Observable<number>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.monthCount$ = this.productService.selectedProductChange$.pipe(
      filter(Boolean),
      map((p) => {
        const start = new Date(p.releaseDate);
        const end = new Date();
        const monthCount =
          end.getMonth() -
          start.getMonth() +
          12 * (end.getFullYear() - start.getFullYear());
        return monthCount;
      })
    );
  }
}

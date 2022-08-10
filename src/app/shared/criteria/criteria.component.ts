import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  private _sub: Subscription | undefined;
  listFilter!: string;

  @ViewChild('filterElement') filterElementRef!: ElementRef;

 private _filterElement!: NgModel;

  get filterElement(): NgModel {
    return this._filterElement;
  }

  @ViewChild(NgModel) set filterElement(value: NgModel) {
    this._filterElement = value;

    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }

    if (this.filterElement && !this._sub) {
      this._sub = this.filterElement.valueChanges?.subscribe((search) => {
        this.listFilter = search;
      });
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}

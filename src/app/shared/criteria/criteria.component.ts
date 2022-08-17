import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProductsParamsService } from 'src/app/products/products-params.service';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css'],
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() displayDetails!: boolean;
  @Input() hitCount!: number;

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();

  hitMessage: string;

  private _listFilter: string;
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.filterChange.emit(value);
  }

  @ViewChild('filterElement') filterElementRef!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && changes['hitCount'].currentValue == 0) {
      this.hitMessage = 'No Matches For your Search';
    } else {
      this.hitMessage = 'Number of hits: ' + this.hitCount;
    }
  }

  ngOnInit(): void {}
}

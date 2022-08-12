import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css'],
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() displayDetails!: boolean;
  @Input() hitCount!: number;

  hitMessage: string;
  listFilter: string;

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

import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../models/images';

@Component({
  selector: 'app-widget-carousel',
  templateUrl: './widget-carousel.component.html',
  styleUrls: ['./widget-carousel.component.scss']
})
export class WidgetCarouselComponent implements OnInit {
  @Input() images: Image[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

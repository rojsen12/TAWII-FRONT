import { Component, Input } from '@angular/core';
import {DateFormatPipe} from '../../pipes/date-format.pipe';

@Component({
  selector: 'notice-item',
  templateUrl: './notice-item.component.html',
  styleUrls: ['./notice-item.component.css'],
  imports: [
    DateFormatPipe
  ],
  standalone: true
})

export class NoticeItemComponent {
  @Input() title!: string;
  @Input() text!: string;
  @Input() image!: string;
  @Input() author!: string;
  @Input() date!: string;
}

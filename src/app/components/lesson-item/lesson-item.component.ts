import { Component, Input } from '@angular/core';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { ShortenTextPipe } from '../../pipes/shorten-text.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'lesson-item',
  standalone: true,
  imports: [
    DateFormatPipe,
    ShortenTextPipe,
    RouterLink
  ],
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css']
})

export class LessonItemComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() image!: string;
  @Input() author!: string;
  @Input() date!: string;
  @Input() id!: string;
}

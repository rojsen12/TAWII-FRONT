import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LessonsService } from '../../services/lessons.service';
import { Location } from '@angular/common';
import {RateLessonComponent} from "../rate-lesson/rate-lesson.component";

@Component({
  selector: 'single-lesson',
  templateUrl: './single-lesson.component.html',
  imports: [
    CommonModule,
    RateLessonComponent
  ],
  standalone: true,
  styleUrls: ['./single-lesson.component.css']
})
export class SingleLessonComponent implements OnInit {
  lesson: any;


  constructor(
      private route: ActivatedRoute,
      private lessonService: LessonsService,
      private location: Location
  ) {}

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    console.log('Lesson ID:', lessonId); // Debugging log
    if (lessonId) {
      this.lessonService.getLessonById(lessonId).subscribe(
          (lesson) => {
            this.lesson = lesson;
          },
          (error) => {
            console.error('Błąd podczas pobierania lekcji', error);
          }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}

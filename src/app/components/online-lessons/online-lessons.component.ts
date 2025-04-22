import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, BehaviorSubject } from 'rxjs';
import { LessonsService } from '../../services/lessons.service';
import { AsyncPipe } from '@angular/common';
import { LessonItemComponent } from '../lesson-item/lesson-item.component';
import { CommonModule } from '@angular/common';
import { AddLessonComponent } from '../add-lesson/add-lesson.component';

@Component({
  selector: 'app-online-lessons',
  imports: [
    AsyncPipe, LessonItemComponent, CommonModule, AddLessonComponent
  ],
  standalone: true,
  templateUrl: './online-lessons.component.html',
  styleUrls: ['./online-lessons.component.css'],
  providers: [LessonsService]
})
export class OnlineLessonsComponent implements OnInit {
  public mathLessons$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public polishLessons$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public englishLessons$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public loading: boolean = true;
  public error: string | null = null;

  constructor(private lessonsService: LessonsService) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessonsService.getAll().pipe(
      catchError((err) => {
        this.error = 'Wystąpił błąd podczas ładowania ogłoszeń';
        this.loading = false;
        console.error('Błąd podczas ładowania lekcji:', err);
        return of([]);
      })
    ).subscribe((lessons) => {

      this.loading = false;

      const mathLessons = lessons.filter((lesson) => lesson.subject === 'matematyka');
      const polishLessons = lessons.filter((lesson) => lesson.subject === 'polski');
      const englishLessons = lessons.filter((lesson) => lesson.subject === 'angielski');

      this.mathLessons$.next(mathLessons);
      this.polishLessons$.next(polishLessons);
      this.englishLessons$.next(englishLessons);
    });
  }

  onLessonAdded() {
    console.log('Dodano nową lekcję, odświeżam listę...');
    this.loadLessons();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}

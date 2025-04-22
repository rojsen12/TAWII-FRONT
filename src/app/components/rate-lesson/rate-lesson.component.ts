import { Component, Input, OnInit } from '@angular/core';
import {RatingService} from "../../services/rating.service";
import {CommonModule} from "@angular/common";
import {LessonsService} from "../../services/lessons.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'rate-lesson',
  templateUrl: './rate-lesson.component.html',
  standalone: true,
  styleUrls: ['./rate-lesson.component.css'],
  imports: [
    CommonModule,
  ],

})
export class RateLessonComponent implements OnInit {
  @Input() lessonId!: string;
  @Input() userId!: string | null;

  rating: number = 0;
  ratingSubmitted: boolean = false;
  averageRating: number = 0;
  totalRatings: number = 0;

  constructor(
      private route: ActivatedRoute,
      private lessonService: LessonsService,
      private ratingService: RatingService,
      private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log("Dostępne parametry w URL:", this.route.snapshot.paramMap.keys);
      this.lessonId = params.getAll("id")[0];
    });
    this.authService.getUserId().subscribe(userId => {this.userId = userId;
    console.log(userId)})
    if (this.lessonId && this.userId) {
      this.loadExistingRating();
    }
  }


  setRating(value: number): void {
    this.rating = value;
  }

  submitRating(): void {
    console.log("Próba dodania oceny...");
    console.log("lessonId:", this.lessonId);
    console.log("userId:", this.userId);
    console.log("rating:", this.rating);

    if (!this.lessonId) {
      console.error("Błąd: lessonId jest nieokreślone!");
      return;
    }
    if (!this.userId) {
      console.error("Błąd: userId jest nieokreślone! Użytkownik musi być zalogowany.");
      return;
    }
    if (this.rating <= 0 || this.rating > 5) {
      console.error("Błąd: Niepoprawna wartość oceny! Musi być w zakresie 1-5.");
      return;
    }

    this.ratingService.submitRating(this.lessonId, this.userId, this.rating).subscribe({
      next: () => {
        console.log("Ocena została pomyślnie wysłana!");
        this.ratingSubmitted = true;
        this.loadAverageRating();
      },
      error: (error) => {
        if (error.status === 400) {
          alert("Lekcja została już wcześniej oceniona!");
        } else {
          console.error("Wystąpił błąd podczas wysyłania oceny:", error);
        }
      }
    });
  }

  loadExistingRating(): void {
    console.log("Sprawdzanie istniejącej oceny...");
    console.log("lessonId:", this.lessonId);
    console.log("userId:", this.userId);

    if (!this.lessonId || !this.userId) {
      console.error("Błąd: Brak lessonId lub userId!");
      return;
    }

    this.ratingService.getUserRating(this.lessonId, this.userId).subscribe({
      next: (response) => {
        if (response && response.rating) {
          console.log("Znaleziono istniejącą ocenę:", response);
          this.rating = response.rating.score;
          this.ratingSubmitted = true;
        } else {
          console.log("Użytkownik nie ocenił jeszcze tej lekcji");
          this.ratingSubmitted = false;
          this.rating = 0;
        }
      },
      error: (error) => {
        if (error.status === 404) {
          console.log("Użytkownik nie ocenił jeszcze tej lekcji");
          this.ratingSubmitted = false;
          this.rating = 0;
        } else {
          console.error("Wystąpił błąd podczas sprawdzania istniejącej oceny:", error);
        }
      }
    });
  }


  loadAverageRating() {
    const lessonId = this.route.snapshot.paramMap.get('id'); // Check this!
    console.log('Lesson ID in rate-lesson:', lessonId); // Debugging

    if (!lessonId) {
      console.error('Lesson ID is undefined in rate-lesson.');
      return;
    }

    this.lessonService.getLessonRating(lessonId).subscribe(
        (rating: any) => {
          console.log('Lesson rating:', rating);
        },
        (error: any) => {
          console.error('Error fetching rating:', error);
        }
    );
  }

}

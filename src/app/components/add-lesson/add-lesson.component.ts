import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { LessonsService } from '../../services/lessons.service';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'add-lesson',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  providers: [LessonsService],
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class AddLessonComponent{

  lessonForm: FormGroup;

  showForm: boolean = false;

  author: string;

  isTokenPresent$: Observable<boolean>;

  @Output() lessonAdded = new EventEmitter<void>();


  constructor(private fb: FormBuilder,   private authService: AuthService, private lessonService: LessonsService) {

    this.author = localStorage.getItem('name') || ''; // Pobierz autora z localStorage

    this.lessonForm = this.fb.group({

      title: ['', Validators.required],

      content: ['', Validators.required],

      image: ['', Validators.required],

      author: [this.author, Validators.required], // Możesz ustawić to, ale nie jest to konieczne

      subject: ['', Validators.required]

    });
    this.isTokenPresent$ = this.authService.getLoggedIn();
  }


  onSubmit() {
    if (this.lessonForm.valid) {
      const newLesson = {
        title: this.lessonForm.value.title,
        content: this.lessonForm.value.content,
        image: this.lessonForm.value.image,
        author: this.author,
        subject: this.lessonForm.value.subject
      };

      this.lessonService.addLesson(newLesson).subscribe(() => {
        this.lessonForm.reset();
        this.lessonAdded.emit();
      });
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    console.log("Form visibility:", this.showForm);
  }
}
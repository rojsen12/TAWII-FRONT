import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticesService } from '../../services/notices.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service"; // Zaimportuj CommonModule

@Component({
  providers: [NoticesService],
  selector: 'add-notice',
  standalone: true,
  styleUrls: ['./add-notice.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-notice.component.html',
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

export class AddNoticeComponent {
  noticeForm: FormGroup;
  showForm: boolean = false;

  author: string;

  isTokenPresent$: Observable<boolean>;

  @Output() noticeAdded = new EventEmitter<void>();


  constructor(private fb: FormBuilder,private authService: AuthService, private noticeService: NoticesService) {
    this.author = localStorage.getItem('name') || '';

    this.noticeForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      image: ['', Validators.required],
      author: [this.author, Validators.required]
    });
    this.isTokenPresent$ = this.authService.getLoggedIn();

  }

  onSubmit() {
    if (this.noticeForm.valid) {
      const newNotice = {
        title: this.noticeForm.value.title,
        text: this.noticeForm.value.text,
        image: this.noticeForm.value.image,
        author: this.noticeForm.value.author
      };
      this.noticeService.addNotice(newNotice).subscribe(() => {
        this.noticeForm.reset();
        this.noticeAdded.emit();
      });
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    console.log("Form visibility:", this.showForm);
  }
}

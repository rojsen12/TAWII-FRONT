import { Component, OnInit } from '@angular/core';
import { NoticesService } from '../../services/notices.service';
import { NoticeItemComponent } from '../notice-item/notice-item.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import {AddNoticeComponent} from '../add-notice/add-notice.component';

@Component({
  selector: 'notices',
  imports: [CommonModule,AddNoticeComponent, NoticeItemComponent, HttpClientModule],
  standalone: true,
  providers: [NoticesService],
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
  public items$: Observable<any[]> = of([]);
  public loading: boolean = true;
  public error: string | null = null;

  constructor(private noticeService: NoticesService) {}

  ngOnInit() {
    this.loadNotices();
  }

  loadNotices() {
    this.noticeService.getAll().pipe(
      catchError((err) => {
        this.error = 'Wystąpił błąd podczas ładowania ogłoszeń'; // Obsługuje błąd
        this.loading = false;
        return of([]);
      })
    ).subscribe((notices) => {
      this.items$ = of(notices);
      this.loading = false;
    });
  }

  onNoticeAdded(){
    setTimeout(() => {
    this.loadNotices();
  }, 1000);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}

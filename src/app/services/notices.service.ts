import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NoticesService {

  private url = 'http://localhost:3100';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Expires': '0',
    });

    return this.http.get<any[]>(this.url + '/api/notices', { headers });
  }

  addNotice(notice:{ title: string, text: string,image: string,author: string }) {
    const newNotice = {
      title: notice.title,
      text: notice.text,
      image: notice.image,
      author: notice.author
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.url + '/api/notice/', newNotice, { headers });
  }
}

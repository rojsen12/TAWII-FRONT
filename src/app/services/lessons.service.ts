import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LessonsService {


  private url = 'http://localhost:3100';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Expires': '0',
    });

    return this.http.get<any[]>(this.url + '/api/lessons', { headers });
  }

  addLesson(lesson:{ title: string, content: string,image: string,author: string,subject: string }) {
    const newLesson = {
      title: lesson.title,
      content: lesson.content,
      image: lesson.image,
      author: lesson.author,
      subject: lesson.subject
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.url + '/api/lesson', newLesson, { headers });
  }

  getLessonById(id: string){
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Expires': '0',
    });

    return this.http.get<any>(this.url + '/api/lesson/'+id, { headers });
  }

  getLessonRating(lessonId: string): Observable<number> {
    return this.http.get<number>(`${this.url}/api/post/${lessonId}/rating`);
  }




}

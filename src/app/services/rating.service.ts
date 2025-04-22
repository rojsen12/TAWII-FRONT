import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    private apiUrl = 'http://localhost:3100/api/post';

    constructor(private http: HttpClient) {}

    submitRating(lessonId: string, userId: string | null, score: number, comment?: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/${lessonId}/rate`, { userId, score, comment });
    }

    getUserRating(lessonId: string, userId: string | null): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${lessonId}/fgdfgfdgfddfg/user/${userId}`);
    }

}

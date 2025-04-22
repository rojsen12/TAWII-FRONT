import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'notices',
    loadComponent: () => import('./components/notices_list/notices.component').then(m => m.NoticesComponent)
  },
  {
    path: 'lessons',
    loadComponent: () => import('./components/online-lessons/online-lessons.component').then(m => m.OnlineLessonsComponent)
  },
  {
    path: 'lesson/:id',
    loadComponent: () => import('./components/single-lesson/single-lesson.component').then(m => m.SingleLessonComponent)

  },
  {
    path: 'login',
    loadComponent: () => import('./components/loginpage/loginpage.component').then(m => m.LoginComponent),
    canActivate: [AuthGuard]
  }
];

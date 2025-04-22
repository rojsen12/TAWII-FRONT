import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [NgIf, RouterLink, CommonModule],
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean> =of();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getLoggedIn();
  }


  logout(): void {
    localStorage.removeItem('token');
    this.authService.setLoggedIn(false);
    this.isLoggedIn$ = this.authService.getLoggedIn();
  }
}

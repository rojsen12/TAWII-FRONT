import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './loginpage.component.html',
    imports: [
        FormsModule,
        NgIf,
        NgClass
    ],
  standalone: true,
  styleUrls: ['./loginpage.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  registerUsername: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  isLoginFormVisible: boolean = true;

  constructor(
      private userService: UserService,
      private router: Router,
      private authService: AuthService
  ) { }

    onSubmit(): void {
        this.userService.login(this.username, this.password).subscribe(
            (response: { token: string,name: string, _id: string }) => {
                console.log('Logged in successfully:', response);
                localStorage.setItem('token', response.token);
                localStorage.setItem('name',response.name);
                localStorage.setItem('userId',response._id);
                this.authService.setLoggedIn(true, response._id);
                console.log(response._id)
                this.router.navigate(['/']);
            },
            (error: any) => {
                console.error('Login error:', error);
                alert('Invalid credentials!');
            }
        );
    }

  onSubmitRegister(): void {
    this.userService.register(this.registerUsername, this.registerEmail, this.registerPassword).subscribe(
        (response: { token: string }) => {  // Typowanie odpowiedzi - oczekujemy obiektu z tokenem
          console.log('Registered successfully:', response);
          alert('Registration successful, you can now log in!');
          this.isLoginFormVisible = true;  // Pokazujemy formularz logowania po rejestracji
        },
        (error: any) => {  // Typowanie błędu
          console.error('Registration error:', error);
          alert('Registration failed!');
        }
    );
  }

  toggleForm(): void {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
}

import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
    imports: [HttpClientModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Platforma korepetytorska';
}

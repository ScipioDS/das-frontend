import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from './components/atoms/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}

import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Homes';
  isHomeApp: boolean = true;
  constructor(private router: Router) { }

  toPractice = () => {
    this.router.navigate(['/practice'], { queryParams: { page: 1, order: 'new'}});
  }

  toHome = () => {
    this.router.navigate(['/']);
  }
}

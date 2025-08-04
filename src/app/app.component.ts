import { Component } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { DetailComponent } from './detail/detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { filter } from 'rxjs/operators';
import { CommonModule, NgIf } from '@angular/common';



@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatTabsModule, SummaryComponent, DetailComponent,RouterModule,NgIf,CommonModule],
})
export class AppComponent {
  selectedIndex = 0;

  constructor(private router: Router) {
    // Sync tab index with route on load or navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        this.selectedIndex = url.includes('summary') ? 0 : 1;
      });
  }
  onTabChange(index: number) {
    const route = index === 0 ? '/summary' : '/detail';
    this.router.navigate([route]);
  }

  title = 'frontendTask';
}

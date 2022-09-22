import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.module.html'
})
export class AppComponent {
  title = 'frontend';

  onActivate(event: Event) {

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
}

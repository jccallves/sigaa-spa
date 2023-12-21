import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './core/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sigaa-spa';
  constructor(private authService: AuthenticationService) {

  }

}
